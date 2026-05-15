import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.datasets import load_breast_cancer
import joblib
import os

def train_diabetes():
    dataset_path = '../diabetes.xlsx'
    if not os.path.exists(dataset_path):
        print(f"Error: dataset not found at {dataset_path}")
        return
    
    print("\n--- Training Diabetes Model ---")
    df = pd.read_excel(dataset_path)
    
    target_col = None
    for col in ['Outcome', 'class', 'target', 'Diabetes']:
        if col in df.columns or col.lower() in [c.lower() for c in df.columns]:
            target_col = next(c for c in df.columns if c.lower() == col.lower())
            break
            
    if not target_col:
        print("Could not find target column!")
        return

    X = df.drop(target_col, axis=1)
    if 'Pregnancies' in X.columns:
        X = X.drop('Pregnancies', axis=1)
    y = df[target_col]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    train_pred = model.predict(X_train)
    train_accuracy = accuracy_score(y_train, train_pred)
    print(f"Training Accuracy: {train_accuracy * 100:.2f}%")

    test_pred = model.predict(X_test)
    test_accuracy = accuracy_score(y_test, test_pred)
    print(f"Testing Accuracy: {test_accuracy * 100:.2f}%")

    model_path = 'diabetes_model.pkl'
    joblib.dump(model, model_path)
    print(f"Model saved as {model_path}")

def train_breast_cancer():
    print("\n--- Training Breast Cancer Model ---")
    data = load_breast_cancer()
    X = pd.DataFrame(data.data, columns=data.feature_names)
    y = data.target

    # We will select the 5 most important features for a cleaner UI, otherwise the form is 30 inputs long!
    # Common top features for breast cancer: 'mean radius', 'mean texture', 'mean perimeter', 'mean area', 'mean smoothness'
    selected_features = ['mean radius', 'mean texture', 'mean perimeter', 'mean area', 'mean smoothness']
    X = X[selected_features]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    train_pred = model.predict(X_train)
    train_accuracy = accuracy_score(y_train, train_pred)
    print(f"Training Accuracy: {train_accuracy * 100:.2f}%")

    test_pred = model.predict(X_test)
    test_accuracy = accuracy_score(y_test, test_pred)
    print(f"Testing Accuracy: {test_accuracy * 100:.2f}%")

    model_path = 'breast_cancer_model.pkl'
    joblib.dump(model, model_path)
    print(f"Model saved as {model_path}")

if __name__ == '__main__':
    train_diabetes()
    train_breast_cancer()
