import axios from 'axios';

const API_URL = 'http://localhost:5000';

export interface DiabetesPredictionData {
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  diabetesPedigreeFunction: number;
  age: number;
}

export interface BreastCancerPredictionData {
  meanRadius: number;
  meanTexture: number;
  meanPerimeter: number;
  meanArea: number;
  meanSmoothness: number;
}

export interface PredictionResponse {
  prediction: string;
  confidence: number;
  error?: string;
}

export const predictDiabetes = async (data: DiabetesPredictionData): Promise<PredictionResponse> => {
  try {
    const response = await axios.post(`${API_URL}/predict/diabetes`, data);
    return response.data;
  } catch (error: any) {
    console.error("Prediction error:", error);
    return {
      prediction: "Error",
      confidence: 0,
      error: error.response?.data?.error || error.message || "An unexpected error occurred."
    };
  }
};

export const predictBreastCancer = async (data: BreastCancerPredictionData): Promise<PredictionResponse> => {
  try {
    const response = await axios.post(`${API_URL}/predict/breast-cancer`, data);
    return response.data;
  } catch (error: any) {
    console.error("Prediction error:", error);
    return {
      prediction: "Error",
      confidence: 0,
      error: error.response?.data?.error || error.message || "An unexpected error occurred."
    };
  }
};
