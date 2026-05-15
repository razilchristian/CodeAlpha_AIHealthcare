# MediPredict AI Healthcare Platform

MediPredict AI is a premium, full-stack healthcare SaaS application that utilizes Machine Learning to provide real-time diagnostic risk assessments. Built with a modern React frontend and a Python Flask backend, it supports multi-modal diagnostic engines including clinical tabular data analysis and histopathological image classification.

## Features
- **Modern UI/UX**: Built with React, Tailwind CSS v4, and Framer Motion for a stunning, glassmorphic, responsive medical dashboard.
- **Diabetes Diagnostic Engine**: A clinical data analyzer that processes 7 patient vitals (Age, Glucose, BMI, etc.) through a custom-trained Scikit-Learn `RandomForestClassifier`.
- **Breast Cancer Diagnostic Engine**: A dual-purpose engine supporting both tabular clinical data (Mean Radius, Texture, etc.) and deep image analysis via a high-accuracy Convolutional/Tree-based Image Classifier (achieving >90% accuracy on IDC tissue patches).
- **RESTful API Architecture**: The Flask Python server securely parses incoming patient datasets and seamlessly serves predictions in real-time.

## Technology Stack
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS v4, Lucide Icons, Framer Motion
- **Backend**: Python 3, Flask, Flask-CORS, Pandas, NumPy
- **Machine Learning**: Scikit-Learn, Joblib, Pillow (PIL)

## Installation & Setup

### 1. Start the Machine Learning Backend
Open a terminal and navigate to the `backend` folder.
```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install flask flask-cors pandas numpy scikit-learn openpyxl joblib pillow

# (Optional) Retrain the models if needed
python train_model.py
python train_image_model.py

# Start the Flask API Server
python app.py
```
*The backend will run on `http://127.0.0.1:5000`.*

### 2. Start the React Frontend
Open a **new** terminal tab in the root directory.
```bash
# Install Node.js dependencies
npm install

# Start the Vite development server
npm run dev
```
*The frontend will run on `http://localhost:5173/` (or similar port).*

## Usage
Navigate to the web application in your browser. Click on **Predict Disease** in the dashboard sidebar to access the AI engines. You can toggle between submitting numerical clinical data for Diabetes or dragging-and-dropping tissue scan images for Breast Cancer analysis.

## Attributions
Developed as part of the CodeAlpha AI Healthcare Initiative.