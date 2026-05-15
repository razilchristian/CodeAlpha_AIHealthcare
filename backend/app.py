from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os
from PIL import Image
import io
import warnings

# Suppress sklearn warnings about feature names
warnings.filterwarnings("ignore", message="X does not have valid feature names")

app = Flask(__name__)
CORS(app)

model_path = 'diabetes_model.pkl'
bc_model_path = 'breast_cancer_model.pkl'
bc_image_model_path = 'breast_cancer_image_model.pkl'

model = None
bc_model = None
bc_image_model = None

if os.path.exists(model_path):
    model = joblib.load(model_path)
    print("Diabetes model loaded successfully.")
    
if os.path.exists(bc_model_path):
    bc_model = joblib.load(bc_model_path)
    print("Breast Cancer model loaded successfully.")

if os.path.exists(bc_image_model_path):
    bc_image_model = joblib.load(bc_image_model_path)
    print("Breast Cancer Image model loaded successfully.")

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
        # Expected features: mean radius, mean texture, mean perimeter, mean area, mean smoothness
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

        # UCI target: 0 is malignant, 1 is benign
        result = "Malignant" if prediction[0] == 0 else "Benign"

        return jsonify({
            'prediction': result,
            'confidence': round(confidence, 2)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/predict/breast-cancer-image', methods=['POST'])
def predict_breast_cancer_image():
    if not bc_image_model:
        return jsonify({'error': 'Breast Cancer Image model not loaded on server.'}), 500
        
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image uploaded.'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No image selected.'}), 400

        image_bytes = file.read()
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        img = img.resize((32, 32))
        img_array = np.array(img).flatten().reshape(1, -1)
        
        prediction = bc_image_model.predict(img_array)
        probabilities = bc_image_model.predict_proba(img_array)
        confidence = float(np.max(probabilities[0])) * 100
        
        # 0 = Benign, 1 = Malignant
        result = "Malignant" if prediction[0] == 1 else "Benign"

        return jsonify({
            'prediction': result,
            'confidence': round(confidence, 2)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
