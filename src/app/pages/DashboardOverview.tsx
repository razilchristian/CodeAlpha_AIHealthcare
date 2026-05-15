import React from 'react';
import { motion } from 'motion/react';
import { Card } from '../components/ui';
import { 
  Users, Activity, BrainCircuit, AlertTriangle, 
  ArrowUpRight, ArrowDownRight, Clock
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const areaData = [
  { name: 'Mon', highRisk: 4, lowRisk: 12 },
  { name: 'Tue', highRisk: 3, lowRisk: 15 },
  { name: 'Wed', highRisk: 7, lowRisk: 10 },
  { name: 'Thu', highRisk: 5, lowRisk: 14 },
  { name: 'Fri', highRisk: 8, lowRisk: 9 },
  { name: 'Sat', highRisk: 2, lowRisk: 8 },
  { name: 'Sun', highRisk: 3, lowRisk: 11 },
];

const RECENT_PREDICTIONS = [
  { id: 'PR-1042', patient: 'Emma Watson', age: 45, type: 'Heart Disease', risk: 'High', date: '2 hours ago', confidence: 92 },
  { id: 'PR-1043', patient: 'James Smith', age: 62, type: 'Diabetes', risk: 'Low', date: '4 hours ago', confidence: 98 },
  { id: 'PR-1044', patient: 'Robert Chen', age: 51, type: 'Breast Cancer', risk: 'Medium', date: '5 hours ago', confidence: 85 },
  { id: 'PR-1045', patient: 'Sarah Johnson', age: 39, type: 'Heart Disease', risk: 'Low', date: '1 day ago', confidence: 95 },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 font-medium mt-1.5">Welcome back, Dr. Jenkins. Here is your daily summary.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="flex items-center gap-2 text-teal-700 bg-teal-50 px-4 py-2 rounded-xl border border-teal-100">
            <div className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
            System Status: Optimal
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Patients Scanned", value: "1,248", change: "+12%", trend: "up", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { title: "High Risk Predictions", value: "84", change: "-5%", trend: "down", icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50" },
          { title: "Avg. AI Confidence", value: "94.2%", change: "+1.2%", trend: "up", icon: BrainCircuit, color: "text-teal-600", bg: "bg-teal-50" },
          { title: "Active Monitoring", value: "342", change: "+18%", trend: "up", icon: Activity, color: "text-slate-700", bg: "bg-slate-100" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }}>
            <Card className="p-6 flex flex-col justify-between h-full border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-white rounded-[1.5rem]">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-2xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-full ${stat.trend === 'up' && stat.color !== 'text-orange-600' ? 'text-teal-700 bg-teal-50' : stat.trend === 'down' && stat.color === 'text-orange-600' ? 'text-teal-700 bg-teal-50' : 'text-orange-700 bg-orange-50'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {stat.change}
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-extrabold mb-1.5 text-slate-900">{stat.value}</h3>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-[1.5rem]">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg text-slate-900">Prediction Activity Trends</h3>
              <p className="text-sm font-medium text-slate-500 mt-1">Weekly breakdown of risk assessments</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHighRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLowRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#14B8A6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#E2E8F0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', color: '#0F172A', fontWeight: 600 }}
                  itemStyle={{ color: '#0F172A' }}
                />
                <Area type="monotone" dataKey="highRisk" name="High Risk" stroke="#F97316" strokeWidth={3} fillOpacity={1} fill="url(#colorHighRisk)" />
                <Area type="monotone" dataKey="lowRisk" name="Low Risk" stroke="#14B8A6" strokeWidth={3} fillOpacity={1} fill="url(#colorLowRisk)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-[1.5rem]">
          <h3 className="font-bold text-lg mb-8 text-slate-900">AI Confidence Distribution</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: '>95%', value: 65 },
                { name: '90-95%', value: 25 },
                { name: '85-90%', value: 8 },
                { name: '<85%', value: 2 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <Tooltip 
                  cursor={{ fill: '#F1F5F9' }}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#E2E8F0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', color: '#0F172A', fontWeight: 600 }}
                />
                <Bar dataKey="value" fill="#2563EB" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-slate-500">Average Confidence</span>
              <span className="text-blue-600 font-extrabold">94.2%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Predictions Table */}
      <Card className="p-0 overflow-hidden border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-[1.5rem]">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
          <h3 className="font-bold text-lg text-slate-900">Recent Predictions</h3>
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">View All Reports</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 font-bold uppercase bg-slate-50 border-b border-slate-100 tracking-wider">
              <tr>
                <th className="px-6 py-4">Patient / ID</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Risk Level</th>
                <th className="px-6 py-4">AI Confidence</th>
                <th className="px-6 py-4">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {RECENT_PREDICTIONS.map((pred, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{pred.patient}</div>
                    <div className="text-xs font-medium text-slate-500 mt-0.5">{pred.id} • Age {pred.age}</div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-700">{pred.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${
                      pred.risk === 'High' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                      pred.risk === 'Medium' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                      'bg-teal-50 text-teal-700 border border-teal-100'
                    }`}>
                      {pred.risk === 'High' && <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                      {pred.risk === 'Medium' && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                      {pred.risk === 'Low' && <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />}
                      {pred.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full" 
                          style={{ width: `${pred.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{pred.confidence}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {pred.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}