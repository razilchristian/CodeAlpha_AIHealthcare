import React from 'react';
import { Card, Button, Input } from '../components/ui';
import { 
  User, Mail, Phone, MapPin, Shield, 
  Bell, Smartphone, Moon, Sun, Monitor
} from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Profile & Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="md:col-span-1 p-8 flex flex-col items-center text-center border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-[1.5rem]">
          <div className="relative mb-6">
            <img 
              src="https://images.unsplash.com/photo-1673865641073-4479f93a7776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMHByb2Zlc3Npb25hbCUyMGZlbWFsZSUyMGRvY3RvciUyMHNtaWxpbmclMjBicmlnaHR8ZW58MXx8fHwxNzc4NDM0ODc0fDA&ixlib=rb-4.1.0&q=80&w=200&utm_source=figma&utm_medium=referral" 
              alt="Dr. Sarah Jenkins" 
              className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="absolute bottom-3 right-3 w-5 h-5 bg-teal-500 border-[3px] border-white rounded-full shadow-sm"></div>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mb-1">Dr. Sarah Jenkins</h2>
          <p className="text-blue-600 text-sm font-bold mb-6">Chief Oncologist</p>
          <div className="w-full flex flex-col gap-3 mt-2 text-sm text-slate-600 text-left">
            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl font-medium">
              <Mail className="w-4 h-4 text-slate-400" /> sarah.j@hospital.com
            </div>
            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl font-medium">
              <Phone className="w-4 h-4 text-slate-400" /> +1 (555) 123-4567
            </div>
            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl font-medium">
              <MapPin className="w-4 h-4 text-slate-400" /> MedTech General, NY
            </div>
          </div>
        </Card>

        {/* Settings Tabs/Forms */}
        <div className="md:col-span-2 space-y-8">
          <Card className="p-8 border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-[1.5rem]">
            <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Personal Information</h3>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">First Name</label>
                  <Input defaultValue="Sarah" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Last Name</label>
                  <Input defaultValue="Jenkins" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Specialization</label>
                <Input defaultValue="Oncology & Machine Learning Research" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Bio</label>
                <textarea 
                  className="flex min-h-[100px] w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:bg-white resize-none transition-all"
                  defaultValue="Leading research in AI-driven predictive models for early cancer detection."
                />
              </div>
              <div className="pt-2">
                <Button className="font-semibold shadow-sm">Save Changes</Button>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-[1.5rem]">
            <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Preferences</h3>
            
            <div className="space-y-8">
              {/* Theme Settings */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-blue-600" /> Interface Theme
                </h4>
                <div className="flex gap-4">
                  <button className="flex-1 py-3 rounded-2xl border border-slate-200 bg-white flex items-center justify-center gap-2 text-slate-600 hover:bg-slate-50 font-semibold transition-colors">
                    <Moon className="w-4 h-4" /> Dark
                  </button>
                  <button className="flex-1 py-3 rounded-2xl border-2 border-blue-500 bg-blue-50/30 flex items-center justify-center gap-2 text-blue-700 font-bold transition-colors">
                    <Sun className="w-4 h-4" /> Light
                  </button>
                </div>
              </div>

              {/* Notification Settings */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-blue-600" /> Notifications
                </h4>
                <div className="space-y-3">
                  {[
                    "New High-Risk Prediction Alerts",
                    "Daily Patient Summary Reports",
                    "System & Model Updates"
                  ].map((item, i) => (
                    <label key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
                      <span className="text-sm font-semibold text-slate-700">{item}</span>
                      <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                        <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white transition shadow-sm" />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Connected Devices */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-blue-600" /> Connected Devices
                </h4>
                <div className="p-4 rounded-2xl border border-slate-100 bg-white flex items-center justify-between premium-shadow">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-slate-50">
                      <Smartphone className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">iPhone 14 Pro</p>
                      <p className="text-xs font-medium text-slate-500">Last active: 2 hours ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 font-bold">Revoke</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}