import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, Button, Input } from '../components/ui';
import { BrainCircuit, ScanLine, CheckCircle2, Activity, UploadCloud, AlertTriangle, ShieldCheck } from 'lucide-react';
import { predictDiabetes } from '../../services/api';
import axios from 'axios';

export default function PredictionPage() {
  const [activeTab, setActiveTab] = useState<'diabetes' | 'breastCancer'>('diabetes');
  
  // Diabetes State
  const [formData, setFormData] = useState({
    glucose: 120,
    bloodPressure: 70,
    skinThickness: 20,
    insulin: 80,
    bmi: 25.5,
    diabetesPedigreeFunction: 0.5,
    age: 33
  });

  // Breast Cancer State
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  const handleTabChange = (tab: 'diabetes' | 'breastCancer') => {
    setActiveTab(tab);
    setResult(null);
    setIsScanning(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'breastCancer' && !selectedImage) return;

    setIsScanning(true);
    setResult(null);
    
    try {
      if (activeTab === 'diabetes') {
        const res = await predictDiabetes(formData);
        setResult(res);
      } else {
        // Upload image to backend
        const formDataUpload = new FormData();
        formDataUpload.append('image', selectedImage as File);
        
        const response = await axios.post('http://localhost:5000/predict/breast-cancer-image', formDataUpload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setResult(response.data);
      }
    } catch (error: any) {
      setResult({
        prediction: "Error",
        confidence: 0,
        error: error.response?.data?.error || "Failed to process prediction."
      });
    }
    
    setIsScanning(false);
  };

  const isHighRisk = result && (result.prediction === 'Diabetic' || result.prediction === 'Malignant');

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Disease Prediction Analysis</h1>
        <p className="text-slate-500 font-medium mt-2">Enter patient vitals or upload medical scans to run AI models.</p>
      </div>

      <div className="flex items-center gap-2 p-1 bg-slate-200/50 rounded-2xl w-fit border border-slate-200">
        <button 
          onClick={() => handleTabChange('diabetes')}
          className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            activeTab === 'diabetes' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Diabetes Risk (Clinical Data)
        </button>
        <button 
          onClick={() => handleTabChange('breastCancer')}
          className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            activeTab === 'breastCancer' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Breast Cancer (Image Scan)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-8 border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-[1.5rem]">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Activity className={`w-5 h-5 ${activeTab === 'diabetes' ? 'text-blue-600' : 'text-teal-600'}`} />
            {activeTab === 'diabetes' ? 'Patient Metrics' : 'Upload Histopathological Image'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-8">
            {activeTab === 'diabetes' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Patient Age', name: 'age', type: 'number', step: '1' },
                  { label: 'Glucose Level (mg/dL)', name: 'glucose', type: 'number', step: 'any' },
                  { label: 'Blood Pressure (mmHg)', name: 'bloodPressure', type: 'number', step: 'any' },
                  { label: 'Skin Thickness', name: 'skinThickness', type: 'number', step: 'any' },
                  { label: 'Insulin (mu U/ml)', name: 'insulin', type: 'number', step: 'any' },
                  { label: 'BMI', name: 'bmi', type: 'number', step: 'any' },
                  { label: 'Pedigree Function', name: 'diabetesPedigreeFunction', type: 'number', step: 'any' }
                ].map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">{field.label}</label>
                    <Input
                      type={field.type}
                      name={field.name}
                      step={field.step}
                      value={(formData as any)[field.name]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div 
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    imagePreview ? 'border-teal-500 bg-teal-50/30' : 'border-slate-300 hover:border-blue-500 hover:bg-blue-50/50'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleImageChange}
                  />
                  
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img src={imagePreview} alt="Scan preview" className="max-h-[250px] mx-auto rounded-xl shadow-md" />
                      <p className="text-sm font-medium text-teal-600">Click to change image</p>
                    </div>
                  ) : (
                    <div className="space-y-4 py-8">
                      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto text-blue-600">
                        <UploadCloud className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-700 text-lg">Click to upload tissue scan</p>
                        <p className="text-sm text-slate-500 mt-1">Supports PNG, JPG (Max 5MB)</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-slate-100">
              <Button 
                type="submit" 
                size="lg" 
                className={`w-full h-14 text-base font-bold relative overflow-hidden group rounded-2xl ${
                  activeTab === 'diabetes' ? 'shadow-blue-600/20 bg-slate-900 hover:bg-slate-800' : 'shadow-teal-600/20 bg-teal-600 hover:bg-teal-700'
                }`}
                disabled={isScanning || (activeTab === 'breastCancer' && !selectedImage)}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_2s_infinite]" />
                {isScanning ? 'Processing via Neural Network...' : 'Run AI Prediction Analysis'}
              </Button>
            </div>
          </form>
        </Card>

        {/* AI Scanning Status Area */}
        <div className="lg:col-span-1">
          <Card className={`h-full p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-[1.5rem] bg-gradient-to-b ${
            isHighRisk ? 'from-rose-50/80 to-white' : 'from-blue-50/50 to-white'
          }`}>
            
            <AnimatePresence mode="wait">
              {!isScanning && !result && (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center z-10"
                >
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-md border border-slate-100">
                    <BrainCircuit className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Awaiting Data</h3>
                  <p className="text-sm font-medium text-slate-500 max-w-[220px] mx-auto">
                    {activeTab === 'diabetes' ? 'Fill out the patient metrics to initialize the scan.' : 'Upload a medical image to run the Convolutional Neural Network.'}
                  </p>
                </motion.div>
              )}

              {isScanning && (
                <motion.div 
                  key="scanning"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="text-center z-10 w-full"
                >
                  <div className="relative w-36 h-36 mx-auto mb-10">
                    <div className="absolute inset-0 rounded-full border-2 border-teal-500/20 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                    <div className="absolute inset-0 rounded-full bg-white flex items-center justify-center shadow-lg border border-blue-100">
                      <ScanLine className="w-14 h-14 text-blue-600 animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-extrabold text-blue-600 mb-3 tracking-tight">Analyzing Data</h3>
                  <p className="text-sm font-semibold text-slate-500 animate-pulse">Running inference...</p>
                </motion.div>
              )}

              {result && !isScanning && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center z-10 w-full"
                >
                  {result.error ? (
                    <div>
                      <AlertTriangle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Error Occurred</h3>
                      <p className="text-slate-600 text-sm">{result.error}</p>
                    </div>
                  ) : (
                    <>
                      <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border ${
                        isHighRisk ? 'bg-rose-50 border-rose-200 shadow-rose-500/20 text-rose-600' : 'bg-teal-50 border-teal-200 shadow-teal-500/20 text-teal-600'
                      }`}>
                        {isHighRisk ? <AlertTriangle className="w-10 h-10" /> : <ShieldCheck className="w-10 h-10" />}
                      </div>
                      
                      <p className="text-sm font-bold text-slate-500 mb-1">Prediction Result</p>
                      <h3 className={`text-3xl font-extrabold mb-8 ${isHighRisk ? 'text-rose-600' : 'text-teal-600'}`}>
                        {result.prediction}
                      </h3>

                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        {result.architecture && (
                          <div className="mb-4 pb-3 border-b border-slate-100 flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-500">Model Engine</span>
                            <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                              {result.architecture}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm mb-3">
                          <span className="font-bold text-slate-700">Confidence</span>
                          <span className="font-black text-slate-900">{result.confidence}%</span>
                        </div>
                        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${result.confidence}%` }}
                            transition={{ duration: 1 }}
                            className={`h-full rounded-full ${isHighRisk ? 'bg-rose-500' : 'bg-teal-500'}`}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </div>
  );
}