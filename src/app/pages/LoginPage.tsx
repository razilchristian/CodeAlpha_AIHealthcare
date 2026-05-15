import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { Button, Input, Card } from '../components/ui';
import { BrainCircuit, Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="flex-1 flex min-h-screen bg-slate-50">
      {/* Left side - Image */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-teal-500/10 z-10 mix-blend-overlay" />
        <img 
          src="https://images.unsplash.com/photo-1761798981573-a972f5cef7f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodCUyMG1vZGVybiUyMGFic3RyYWN0JTIwZ3JhZGllbnQlMjBibHVlJTIwdGVhbHxlbnwxfHx8fDE3Nzg0MzQ4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
          alt="Abstract Data" 
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="relative z-20 flex flex-col p-16 h-full bg-gradient-to-t from-white via-white/80 to-transparent justify-end">
          <div className="max-w-lg mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/50 text-blue-700 text-sm font-bold mb-6 shadow-sm">
              Clinical Intelligence Platform
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">Empowering Clinical Decisions with AI.</h2>
            <p className="text-lg text-slate-600 font-medium leading-relaxed">Access advanced predictive models and comprehensive patient health analytics in one unified, elegant workspace.</p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[440px] relative z-10"
        >
          <Link to="/" className="flex items-center gap-2 mb-12 justify-center lg:justify-start">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 shadow-md shadow-blue-600/20">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              MediPredict <span className="text-blue-600">AI</span>
            </span>
          </Link>

          <Card className="border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04),_0_1px_3px_rgb(0,0,0,0.02)] p-8 sm:p-10 rounded-[2rem]">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h1>
              <p className="text-slate-500 font-medium">Enter your credentials to access your workspace</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input 
                    type="email" 
                    placeholder="doctor@hospital.com" 
                    className="pl-11"
                    defaultValue="demo@medipredict.ai"
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-bold text-slate-700">Password</label>
                  <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-11"
                    defaultValue="password123"
                    required 
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full mt-6 gap-2 rounded-2xl h-12 text-base font-semibold" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                    Authenticating...
                  </span>
                ) : (
                  <>
                    Sign In <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 relative flex items-center justify-center">
              <div className="absolute w-full h-px bg-slate-100"></div>
              <span className="relative bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Or continue with
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full font-semibold rounded-xl h-11 text-slate-600">
                Google
              </Button>
              <Button variant="outline" className="w-full font-semibold rounded-xl h-11 text-slate-600">
                Microsoft
              </Button>
            </div>
            
            <p className="mt-8 text-center text-sm font-medium text-slate-500">
              Don't have an account? <a href="#" className="text-blue-600 hover:text-blue-700 font-bold ml-1">Request Access</a>
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}