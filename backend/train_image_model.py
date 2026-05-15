import os
import glob
import numpy as np
from PIL import Image
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

ARCHIVE_PATH = r"C:\Users\riyac\Downloads\archive"
MODEL_SAVE_PATH = "breast_cancer_image_model.pkl"
IMAGE_SIZE = (32, 32)

def load_images_from_folder(base_folder):
    X = []
    y = []
    
    # We look for all .png files inside the folder structure
    # e.g., archive/10253/0/*.png
    search_pattern = os.path.join(base_folder, "*", "*", "*.png")
    all_files = glob.glob(search_pattern)
    
    print(f"Found {len(all_files)} images. Loading and resizing...")
    
    # Let's cap at 4000 images to ensure it runs fast
    for idx, filepath in enumerate(all_files[:4000]):
        if idx % 1000 == 0:
            print(f"Processed {idx} images...")
            
        # The folder name immediately containing the image is '0' or '1'
        label_str = os.path.basename(os.path.dirname(filepath))
        
        try:
            label = int(label_str)
            
            # Load and resize image to be extremely small (32x32)
            # Convert to RGB (in case of grayscale or RGBA)
            img = Image.open(filepath).convert("RGB")
            img = img.resize(IMAGE_SIZE)
            
            # Convert to numpy array and flatten it
            img_array = np.array(img).flatten()
            
            X.append(img_array)
            y.append(label)
        except Exception as e:
            print(f"Error loading {filepath}: {e}")
            
    return np.array(X), np.array(y)

if __name__ == "__main__":
    X, y = load_images_from_folder(ARCHIVE_PATH)
    
    print(f"Dataset shape: {X.shape}")
    print(f"Labels shape: {y.shape}")
    
    if len(X) == 0:
        print("No images found. Exiting.")
        exit(1)
        
    print("Splitting data...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training RandomForest model on flattened images (this is a fast baseline)...")
    model = RandomForestClassifier(n_estimators=50, random_state=42, n_jobs=-1)
    model.fit(X_train, y_train)
    
    train_acc = accuracy_score(y_train, model.predict(X_train))
    test_acc = accuracy_score(y_test, model.predict(X_test))
    
    print(f"Training Accuracy: {train_acc * 100:.2f}%")
    print(f"Testing Accuracy: {test_acc * 100:.2f}%")
    
    joblib.dump(model, MODEL_SAVE_PATH)
    print(f"Model saved to {MODEL_SAVE_PATH}")
