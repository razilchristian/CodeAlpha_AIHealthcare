import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { 
  LayoutDashboard, 
  Stethoscope, 
  LineChart, 
  Settings, 
  LogOut,
  Menu,
  Bell,
  Search,
  BrainCircuit,
  ChevronLeft
} from 'lucide-react';
import { cn } from '../components/ui';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { icon: Stethoscope, label: 'Predict Disease', path: '/dashboard/predict' },
  { icon: LineChart, label: 'Results & Analytics', path: '/dashboard/results' },
  { icon: Settings, label: 'Profile & Settings', path: '/dashboard/profile' },
];

export function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden text-slate-900">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed md:relative z-40 h-screen bg-white border-r border-slate-200 transition-all duration-300 flex flex-col shadow-sm",
          isSidebarOpen ? "w-64 translate-x-0" : "w-20 -translate-x-full md:translate-x-0"
        )}
      >
        <div className="h-20 flex items-center justify-between px-4 border-b border-slate-100">
          <Link to="/dashboard" className="flex items-center gap-3 overflow-hidden">
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-md shadow-blue-500/20">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span className={cn("text-lg font-bold tracking-tight whitespace-nowrap transition-opacity duration-300 text-slate-900", !isSidebarOpen && "md:opacity-0 md:hidden")}>
              MediPredict <span className="text-blue-600">AI</span>
            </span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-slate-50 hidden md:block text-slate-400"
          >
            <ChevronLeft className={cn("w-5 h-5 transition-transform", !isSidebarOpen && "rotate-180")} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
          <div className={cn("px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider", !isSidebarOpen && "md:hidden")}>Main Menu</div>
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative",
                  isActive 
                    ? "bg-blue-50 text-blue-700 font-semibold" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"
                )}
                title={!isSidebarOpen ? item.label : undefined}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full" />
                )}
                <item.icon className={cn("w-5 h-5 flex-shrink-0 transition-colors", isActive ? "text-blue-600" : "group-hover:text-slate-700")} />
                <span className={cn("whitespace-nowrap transition-opacity duration-300", !isSidebarOpen && "md:opacity-0 md:hidden")}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-3 py-3 w-full rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 font-medium transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className={cn("whitespace-nowrap", !isSidebarOpen && "md:hidden")}>
              Log out
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-20 flex items-center justify-between px-6 bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-50 text-slate-600"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="hidden lg:flex items-center relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search patients, records, insights..." 
                className="bg-slate-50/50 border border-slate-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-72 text-slate-900 placeholder:text-slate-400 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-slate-50 text-slate-500 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500 ring-2 ring-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block"></div>
            <div className="flex items-center gap-3 cursor-pointer p-1.5 rounded-full hover:bg-slate-50 transition-colors pr-3">
              <img 
                src="https://images.unsplash.com/photo-1673865641073-4479f93a7776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMHByb2Zlc3Npb25hbCUyMGZlbWFsZSUyMGRvY3RvciUyMHNtaWxpbmclMjBicmlnaHR8ZW58MXx8fHwxNzc4NDM0ODc0fDA&ixlib=rb-4.1.0&q=80&w=100&utm_source=figma&utm_medium=referral" 
                alt="Profile" 
                className="w-9 h-9 rounded-full object-cover"
              />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold text-slate-900 leading-tight">Dr. Sarah J.</p>
                <p className="text-xs text-blue-600 font-medium">Chief Oncologist</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}