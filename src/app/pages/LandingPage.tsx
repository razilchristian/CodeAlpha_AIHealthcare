import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, ShieldCheck, Activity, BrainCircuit, HeartPulse, 
  ChevronRight, Sparkles, CheckCircle2, TrendingUp, AlertTriangle, Loader2 
} from 'lucide-react';
import { predictDiabetes, predictBreastCancer } from '../../services/api';

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] overflow-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-400/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] rounded-full bg-blue-300/10 blur-[150px]" />
      </div>

      <HeroSection opacity={opacity} scale={scale} />
      <FeaturesSection />
      <AnalyticsPreviewSection />
      <PredictionSection />
    </div>
  );
}

function HeroSection({ opacity, scale }: any) {
  return (
    <motion.section 
      style={{ opacity, scale }}
      className="relative z-10 pt-32 pb-24 md:pt-48 md:pb-32 px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm mb-8">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-800">MediPredict AI 2.0 is live</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
              Predict health risks with <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-teal-400">
                clinical precision.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Empower your clinical decision-making with state-of-the-art machine learning. Predict early signs of Diabetes, Heart Disease, and Breast Cancer with exceptional accuracy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="#predict" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800 text-base font-semibold h-14 px-8 rounded-full transition-all shadow-xl shadow-slate-900/20 group">
                Try Prediction Engine
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#features" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-50 border border-slate-200 text-base font-semibold h-14 px-8 rounded-full transition-all shadow-sm">
                Explore Features
              </a>
            </div>
          </motion.div>
        </div>
        
        <div className="flex-1 w-full max-w-2xl lg:max-w-none relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            style={{ perspective: 1000 }}
          >
            {/* Main App Mockup */}
            <div className="relative rounded-[2rem] bg-white border border-slate-200/60 shadow-2xl overflow-hidden backdrop-blur-sm">
              <div className="h-12 border-b border-slate-100 flex items-center px-6 gap-2 bg-slate-50/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                </div>
              </div>
              <div className="p-6 md:p-8 bg-gradient-to-b from-white to-slate-50/50">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Patient Analysis</h3>
                    <p className="text-sm text-slate-500">Real-time risk assessment</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                
                {/* Mock Chart */}
                <div className="h-40 flex items-end gap-2 mb-8">
                  {[40, 65, 45, 80, 55, 90, 75, 100].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      className="flex-1 bg-gradient-to-t from-blue-600/80 to-teal-400/80 rounded-t-sm"
                    />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                    <p className="text-xs text-slate-500 font-medium mb-1">Model Accuracy</p>
                    <p className="text-2xl font-bold text-slate-900">98.4%</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                    <p className="text-xs text-slate-500 font-medium mb-1">Risk Status</p>
                    <p className="text-2xl font-bold text-teal-600">Low Risk</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-8 top-12 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Validated</p>
                <p className="text-xs text-slate-500">Clinical standards met</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: BrainCircuit,
      title: "Advanced Neural Networks",
      description: "Our core utilizes multi-layered neural networks trained on expansive, peer-reviewed clinical datasets.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Activity,
      title: "Real-time Processing",
      description: "Sub-millisecond inference times mean you get prediction results instantly during patient consultations.",
      color: "from-teal-400 to-emerald-500"
    },
    {
      icon: ShieldCheck,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security ensures all patient data is encrypted and processed with total anonymity.",
      color: "from-orange-400 to-rose-500"
    }
  ];

  return (
    <section id="features" className="relative z-10 py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            Intelligent analysis, <br />
            <span className="text-slate-500">beautifully simplified.</span>
          </h2>
          <p className="text-lg text-slate-600">
            We abstract away the complexity of machine learning, providing you with a clean, actionable interface for proactive healthcare.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-[2rem] bg-[#FAFAFA] border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br ${feature.color} shadow-lg text-white`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnalyticsPreviewSection() {
  return (
    <section id="analytics" className="relative z-10 py-24 md:py-32 bg-slate-900 text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                Deep insights into <br /> patient populations.
              </h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Track demographic trends, model confidence scores, and historical prediction accuracy all from a centralized, highly-responsive dashboard.
              </p>
              <ul className="space-y-4 mb-10">
                {['Interactive data visualization', 'Exportable clinical reports', 'Longitudinal tracking'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-400" />
                    <span className="text-slate-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-[2rem] bg-slate-800 border border-slate-700 shadow-2xl p-6"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-slate-400 text-sm font-medium">Confidence Metric</p>
                <p className="text-3xl font-bold mt-1">94.2%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { label: 'Diabetes Model', val: '98%', w: '98%' },
                { label: 'Heart Disease', val: '92%', w: '92%' },
                { label: 'Breast Cancer', val: '95%', w: '95%' }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300 font-medium">{stat.label}</span>
                    <span className="text-teal-400 font-bold">{stat.val}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: stat.w }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                      className="h-full bg-gradient-to-r from-teal-400 to-blue-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PredictionSection() {
  const [activeTab, setActiveTab] = useState<'diabetes' | 'breastCancer'>('diabetes');
  const [formData, setFormData] = useState({
    glucose: 120,
    bloodPressure: 70,
    skinThickness: 20,
    insulin: 80,
    bmi: 25.5,
    diabetesPedigreeFunction: 0.5,
    age: 33,
    // Breast Cancer fields
    meanRadius: 14.2,
    meanTexture: 19.5,
    meanPerimeter: 92.5,
    meanArea: 650.0,
    meanSmoothness: 0.09
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  const handleTabChange = (tab: 'diabetes' | 'breastCancer') => {
    setActiveTab(tab);
    setResult(null); // Clear result when switching tabs
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    
    // Simulate network delay for animation effect
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let res;
    if (activeTab === 'diabetes') {
      res = await predictDiabetes({
        glucose: formData.glucose,
        bloodPressure: formData.bloodPressure,
        skinThickness: formData.skinThickness,
        insulin: formData.insulin,
        bmi: formData.bmi,
        diabetesPedigreeFunction: formData.diabetesPedigreeFunction,
        age: formData.age
      });
    } else {
      res = await predictBreastCancer({
        meanRadius: formData.meanRadius,
        meanTexture: formData.meanTexture,
        meanPerimeter: formData.meanPerimeter,
        meanArea: formData.meanArea,
        meanSmoothness: formData.meanSmoothness
      });
    }
    
    setResult(res);
    setLoading(false);
  };

  const diabetesFields = [
    { label: 'Patient Age', name: 'age', type: 'number', step: '1' },
    { label: 'Glucose', name: 'glucose', type: 'number', step: 'any' },
    { label: 'Blood Pressure', name: 'bloodPressure', type: 'number', step: 'any' },
    { label: 'Skin Thickness', name: 'skinThickness', type: 'number', step: 'any' },
    { label: 'Insulin', name: 'insulin', type: 'number', step: 'any' },
    { label: 'BMI', name: 'bmi', type: 'number', step: 'any' },
    { label: 'Pedigree Function', name: 'diabetesPedigreeFunction', type: 'number', step: 'any' }
  ];

  const breastCancerFields = [
    { label: 'Mean Radius', name: 'meanRadius', type: 'number', step: 'any' },
    { label: 'Mean Texture', name: 'meanTexture', type: 'number', step: 'any' },
    { label: 'Mean Perimeter', name: 'meanPerimeter', type: 'number', step: 'any' },
    { label: 'Mean Area', name: 'meanArea', type: 'number', step: 'any' },
    { label: 'Mean Smoothness', name: 'meanSmoothness', type: 'number', step: 'any' }
  ];

  const activeFields = activeTab === 'diabetes' ? diabetesFields : breastCancerFields;
  const isHighRisk = result && (result.prediction === 'Diabetic' || result.prediction === 'Malignant');

  return (
    <section id="predict" className="relative z-10 py-24 md:py-32 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Try the Prediction Engine
          </h2>
          <p className="text-slate-600">
            Input patient vitals to receive a real-time risk assessment powered by our RandomForest models.
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-2 p-1 bg-slate-200/50 rounded-2xl w-fit mx-auto border border-slate-200">
            <button 
              onClick={() => handleTabChange('diabetes')}
              className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'diabetes' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Diabetes Risk
            </button>
            <button 
              onClick={() => handleTabChange('breastCancer')}
              className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'breastCancer' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Breast Cancer
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/40">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Activity className={`w-5 h-5 ${activeTab === 'diabetes' ? 'text-blue-600' : 'text-teal-600'}`} />
              Patient Metrics ({activeTab === 'diabetes' ? 'Diabetes' : 'Breast Cancer'})
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeFields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    step={field.step}
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium"
                    required
                  />
                </div>
              ))}
              
              <div className="md:col-span-2 pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed font-semibold h-14 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-slate-900/10"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing Data...
                    </>
                  ) : (
                    <>
                      Run Prediction
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 relative">
            <div className="sticky top-32">
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`p-8 rounded-[2rem] border shadow-xl ${
                      isHighRisk || result.error 
                        ? 'bg-rose-50 border-rose-200' 
                        : 'bg-teal-50 border-teal-200'
                    }`}
                  >
                    {result.error ? (
                      <div className="text-center">
                        <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Error Occurred</h3>
                        <p className="text-slate-600">{result.error}</p>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              isHighRisk ? 'bg-rose-100 text-rose-600' : 'bg-teal-100 text-teal-600'
                            }`}>
                              {isHighRisk ? <AlertTriangle className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-500">Prediction Result</p>
                              <h3 className={`text-xl font-bold ${
                                isHighRisk ? 'text-rose-700' : 'text-teal-700'
                              }`}>
                                {result.prediction}
                              </h3>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6 bg-white/60 p-6 rounded-2xl backdrop-blur-sm border border-white/40">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="font-semibold text-slate-700">Model Confidence</span>
                              <span className="font-bold text-slate-900">{result.confidence}%</span>
                            </div>
                            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${result.confidence}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className={`h-full rounded-full ${
                                  isHighRisk ? 'bg-rose-500' : 'bg-teal-500'
                                }`}
                              />
                            </div>
                          </div>
                          
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {isHighRisk
                              ? 'The model indicates a high probability of disease based on the provided metrics. Clinical follow-up is recommended.'
                              : 'The metrics fall within normal parameters. The model predicts low risk.'}
                          </p>
                        </div>
                      </>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 rounded-[2rem] border border-dashed border-slate-300 bg-slate-50/50 flex flex-col items-center justify-center text-center h-[400px]"
                  >
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                      <BrainCircuit className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700 mb-2">Awaiting Input</h3>
                    <p className="text-slate-500 max-w-xs">
                      Select a prediction model, fill out the form, and run the analysis to see the AI results here.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}