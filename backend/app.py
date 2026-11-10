import os
import io
import warnings
import joblib
import numpy as np
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torch.nn as nn
from torchvision import transforms

# Suppress sklearn warnings about feature names
warnings.filterwarnings("ignore", message="X does not have valid feature names")

app = Flask(__name__)
CORS(app)

# -------------------------------------------------------------
# CNN Architecture Definition
# -------------------------------------------------------------
class BreastCancerCNN(nn.Module):
    def __init__(self):
        super(BreastCancerCNN, self).__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),
            
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),
            
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),
        )
        self.adaptive_pool = nn.AdaptiveAvgPool2d((4, 4))
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(128 * 4 * 4, 128),
            nn.ReLU(inplace=True),
            nn.Dropout(p=0.4),
            nn.Linear(128, 2)
        )
        
    def forward(self, x):
        x = self.features(x)
        x = self.adaptive_pool(x)
        x = self.classifier(x)
        return x

# Image preprocessing transform for CNN
cnn_transform = transforms.Compose([
    transforms.Resize((50, 50)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# -------------------------------------------------------------
# Load Pretrained Models
# -------------------------------------------------------------
model_path = 'diabetes_model.pkl'
bc_model_path = 'breast_cancer_model.pkl'
cnn_model_path = 'breast_cancer_cnn.pth'
bc_image_model_path = 'breast_cancer_image_model.pkl'

model = None
bc_model = None
cnn_model = None
bc_image_model = None

if os.path.exists(model_path):
    model = joblib.load(model_path)
    print("[INIT] Diabetes model loaded successfully.")
    
if os.path.exists(bc_model_path):
    bc_model = joblib.load(bc_model_path)
    print("[INIT] Breast Cancer clinical model loaded successfully.")

if os.path.exists(cnn_model_path):
    cnn_model = BreastCancerCNN()
    cnn_model.load_state_dict(torch.load(cnn_model_path, map_location=torch.device('cpu')))
    cnn_model.eval()
    print("[INIT] Breast Cancer CNN (Convolutional Neural Network) loaded successfully.")
elif os.path.exists(bc_image_model_path):
    bc_image_model = joblib.load(bc_image_model_path)
    print("[INIT] Fallback Breast Cancer Image model loaded successfully.")

@app.route('/', methods=['GET'])
def index():
    return "MediPredict AI Backend is running! The React frontend should be opened on port 5173/5176."

@app.route('/predict/diabetes', methods=['POST'])
def predict_diabetes():
    if not model:
        return jsonify({'error': 'Model not loaded on server.'}), 500

    try:
        data = request.json
        features = [
            float(data.get('glucose', 0)),
            float(data.get('bloodPressure', 0)),
            float(data.get('skinThickness', 0)),
            float(data.get('insulin', 0)),
            float(data.get('bmi', 0)),
            float(data.get('diabetesPedigreeFunction', 0)),
            float(data.get('age', 0))
        ]

        features_array = np.array([features])
        prediction = model.predict(features_array)
        probabilities = model.predict_proba(features_array)
        confidence = float(np.max(probabilities[0])) * 100

        result = "Diabetic" if prediction[0] == 1 else "Not Diabetic"

        return jsonify({
            'prediction': result,
            'confidence': round(confidence, 2)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/predict/breast-cancer', methods=['POST'])
def predict_breast_cancer():
    if not bc_model:
        return jsonify({'error': 'Breast Cancer model not loaded on server.'}), 500

    try:
        data = request.json
        features = [
            float(data.get('meanRadius', 0)),
            float(data.get('meanTexture', 0)),
            float(data.get('meanPerimeter', 0)),
            float(data.get('meanArea', 0)),
            float(data.get('meanSmoothness', 0))
        ]

        features_array = np.array([features])
        prediction = bc_model.predict(features_array)
        probabilities = bc_model.predict_proba(features_array)
        confidence = float(np.max(probabilities[0])) * 100

        result = "Malignant" if prediction[0] == 0 else "Benign"

        return jsonify({
            'prediction': result,
            'confidence': round(confidence, 2)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/predict/breast-cancer-image', methods=['POST'])
def predict_breast_cancer_image():
    if not cnn_model and not bc_image_model:
        return jsonify({'error': 'No image model loaded on server.'}), 500
        
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image uploaded.'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No image selected.'}), 400

        image_bytes = file.read()
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB")

        # Prioritize Deep Learning CNN inference
        if cnn_model is not None:
            img_tensor = cnn_transform(img).unsqueeze(0)  # Shape: (1, 3, 50, 50)
            
            with torch.no_grad():
                outputs = cnn_model(img_tensor)
                probabilities = torch.softmax(outputs, dim=1)[0]
                predicted_class = int(torch.argmax(probabilities))
                confidence = float(probabilities[predicted_class]) * 100
                
            # Class 0 = Benign, Class 1 = Malignant
            result = "Malignant" if predicted_class == 1 else "Benign"
            
            return jsonify({
                'prediction': result,
                'confidence': round(confidence, 2),
                'architecture': 'Convolutional Neural Network (CNN)'
            })

        # Fallback to Random Forest model
        img_resized = img.resize((32, 32))
        img_array = np.array(img_resized).flatten().reshape(1, -1)
        prediction = bc_image_model.predict(img_array)
        probabilities = bc_image_model.predict_proba(img_array)
        confidence = float(np.max(probabilities[0])) * 100
        
        result = "Malignant" if prediction[0] == 1 else "Benign"

        return jsonify({
            'prediction': result,
            'confidence': round(confidence, 2),
            'architecture': 'Random Forest Classifier'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
