import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { BrainCircuit, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function RootLayout() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use the layout purely for landing page if we don't want it to show on auth pages.
  // Assuming /login is handled by this root but we might hide header/footer.
  const isAuthPage = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans">
      {!isAuthPage && (
        <header 
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled 
              ? 'bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-sm py-3' 
              : 'bg-transparent py-5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group z-50">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 shadow-lg shadow-blue-500/20 overflow-hidden">
                <div className="absolute inset-0 bg-white/20 transform rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center">
                MediPredict<span className="text-blue-600">.</span>
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
              <a href="#analytics" className="hover:text-slate-900 transition-colors">Analytics</a>
              <a href="#predict" className="hover:text-slate-900 transition-colors">Predict</a>
            </nav>
            
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                Sign In
              </Link>
              <Link 
                to="/login" 
                className="bg-slate-900 text-white hover:bg-slate-800 text-sm font-semibold py-2 px-4 rounded-full transition-all shadow-md shadow-slate-900/10 flex items-center gap-1 group"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <button 
              className="md:hidden z-50 p-2 text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl p-6 flex flex-col gap-6 md:hidden"
              >
                <nav className="flex flex-col gap-4 text-lg font-medium text-slate-700">
                  <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
                  <a href="#analytics" onClick={() => setMobileMenuOpen(false)}>Analytics</a>
                  <a href="#predict" onClick={() => setMobileMenuOpen(false)}>Predict</a>
                </nav>
                <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                  <Link to="/login" className="text-center font-semibold text-slate-600 py-3" onClick={() => setMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                  <Link to="/login" className="bg-blue-600 text-white text-center font-semibold py-3 rounded-xl" onClick={() => setMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      )}
      
      <main className="flex-1 flex flex-col relative z-10 w-full overflow-hidden">
        <Outlet />
      </main>
      
      {!isAuthPage && (
        <footer className="bg-white border-t border-slate-200/60 pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-2">
                <Link to="/" className="flex items-center gap-2 mb-6 group inline-flex">
                  <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 shadow-md">
                    <BrainCircuit className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xl font-bold tracking-tight text-slate-900">
                    MediPredict<span className="text-blue-600">.</span>
                  </span>
                </Link>
                <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                  Next-generation AI healthcare platform. Predict risks with clinically-validated machine learning models and empower better patient outcomes.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
                <ul className="flex flex-col gap-3 text-sm text-slate-500">
                  <li><a href="#features" className="hover:text-blue-600 transition-colors">Features</a></li>
                  <li><a href="#analytics" className="hover:text-blue-600 transition-colors">Analytics</a></li>
                  <li><a href="#predict" className="hover:text-blue-600 transition-colors">Prediction Engine</a></li>
                  <li><Link to="/login" className="hover:text-blue-600 transition-colors">Pricing</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
                <ul className="flex flex-col gap-3 text-sm text-slate-500">
                  <li><Link to="/" className="hover:text-blue-600 transition-colors">About</Link></li>
                  <li><Link to="/" className="hover:text-blue-600 transition-colors">Blog</Link></li>
                  <li><Link to="/" className="hover:text-blue-600 transition-colors">Careers</Link></li>
                  <li><Link to="/" className="hover:text-blue-600 transition-colors">Contact</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-slate-400 text-sm">
                © {new Date().getFullYear()} MediPredict AI Inc. All rights reserved.
              </p>
              <div className="flex gap-6 text-slate-400 text-sm font-medium">
                <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}