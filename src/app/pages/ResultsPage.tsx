import React from 'react';
import { Card, Button } from '../components/ui';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { 
  Download, Share2, AlertTriangle, CheckCircle2, 
  Activity, ArrowRight, BrainCircuit, HeartPulse
} from 'lucide-react';

const pieData = [
  { name: 'Heart Disease Risk', value: 78, color: '#F97316' }, // Orange for risk
  { name: 'Healthy Factors', value: 22, color: '#14B8A6' } // Teal for healthy
];

const timelineData = [
  { month: 'Jan', value: 120 },
  { month: 'Feb', value: 125 },
  { month: 'Mar', value: 130 },
  { month: 'Apr', value: 135 },
  { month: 'May', value: 145 },
  { month: 'Jun', value: 160 }, // Spike
];

export default function ResultsPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Prediction Results</h1>
            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-orange-50 text-orange-700 border border-orange-100 shadow-sm">
              High Risk Alert
            </span>
          </div>
          <p className="text-slate-500 font-medium text-sm">Patient: John Doe • ID: PR-1042 • Scanned: Today, 10:45 AM</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 font-semibold shadow-sm h-10">
            <Share2 className="w-4 h-4" /> Share
          </Button>
          <Button className="gap-2 font-semibold shadow-md h-10">
            <Download className="w-4 h-4" /> Download Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Risk Score */}
        <Card className="lg:col-span-1 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden bg-gradient-to-b from-white to-orange-50/30 border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-[1.5rem]">
          <div className="relative z-10 w-52 h-52 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={75}
                  outerRadius={95}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-slate-900 tracking-tighter">78<span className="text-2xl text-slate-500">%</span></span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Probability</span>
            </div>
          </div>
          
          <h2 className="text-2xl font-extrabold mb-3 text-slate-900 tracking-tight">Heart Disease</h2>
          <p className="text-slate-600 text-sm mb-8 font-medium leading-relaxed">
            The AI model indicates a significant probability of developing cardiovascular complications based on the provided metrics.
          </p>
          
          <div className="w-full flex items-center justify-between p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-slate-700">Model Confidence</span>
            </div>
            <span className="text-sm font-black text-blue-600">96.4%</span>
          </div>
        </Card>

        {/* Analytics & Timeline */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8 border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-[1.5rem]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Key Metric Timeline: Blood Pressure
              </h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData} margin={{ left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis domain={['dataMin - 10', 'dataMax + 10']} stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#E2E8F0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', color: '#0F172A', fontWeight: 600 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#2563EB" 
                    strokeWidth={3}
                    dot={{ fill: '#ffffff', stroke: '#2563EB', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#2563EB', stroke: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-[1.5rem]">
              <h3 className="text-base font-extrabold mb-5 text-slate-900">Risky Indicators</h3>
              <ul className="space-y-5">
                {[
                  { label: "Blood Pressure", val: "160/95", desc: "Elevated significantly" },
                  { label: "Cholesterol", val: "240 mg/dL", desc: "High LDL levels detected" },
                  { label: "Age Factor", val: "62 yrs", desc: "Higher bracket risk" }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="p-1.5 rounded-full bg-orange-50 text-orange-600 mt-0.5">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold text-slate-900">{item.label}</span>
                        <span className="text-orange-600 font-extrabold">{item.val}</span>
                      </div>
                      <p className="text-xs font-medium text-slate-500">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-[1.5rem]">
              <h3 className="text-base font-extrabold mb-5 text-slate-900">Healthy Indicators</h3>
              <ul className="space-y-5">
                {[
                  { label: "Glucose", val: "95 mg/dL", desc: "Within normal range" },
                  { label: "BMI", val: "24.5", desc: "Healthy weight range" },
                  { label: "Heart Rate", val: "72 bpm", desc: "Stable resting rate" }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="p-1.5 rounded-full bg-teal-50 text-teal-600 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold text-slate-900">{item.label}</span>
                        <span className="text-teal-600 font-extrabold">{item.val}</span>
                      </div>
                      <p className="text-xs font-medium text-slate-500">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <Card className="p-8 border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-[1.5rem]">
        <div className="flex items-center gap-3 mb-8">
          <HeartPulse className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">AI Personalized Recommendations</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              title: "Immediate Action", 
              desc: "Schedule an urgent cardiology consultation to review elevated blood pressure and prescribe necessary antihypertensive medication.",
              color: "bg-orange-50 border-orange-100 text-orange-800"
            },
            { 
              title: "Lifestyle Modification", 
              desc: "Implement a low-sodium diet and initiate a guided, moderate cardiovascular exercise program (150 mins/week).",
              color: "bg-blue-50 border-blue-100 text-blue-800"
            },
            { 
              title: "Follow-up Monitoring", 
              desc: "Assign a continuous blood pressure monitor for 48 hours and re-evaluate lipid panel in 4 weeks.",
              color: "bg-teal-50 border-teal-100 text-teal-800"
            }
          ].map((rec, i) => (
            <div key={i} className={`p-6 rounded-[1.25rem] border ${rec.color} flex flex-col h-full shadow-sm`}>
              <h3 className="font-extrabold mb-3 text-slate-900 tracking-tight">{rec.title}</h3>
              <p className="text-sm font-medium leading-relaxed mb-6 flex-1 opacity-90">{rec.desc}</p>
              <button className="flex items-center gap-2 text-sm font-bold hover:opacity-70 transition-opacity mt-auto">
                Add to treatment plan <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}