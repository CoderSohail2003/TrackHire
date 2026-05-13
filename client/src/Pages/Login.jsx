// src/Pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Briefcase, ShieldCheck, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/'); // redirect to dashboard after login
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white max-w-5xl w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Panel - Branding (same as Register) */}
        <div className="md:w-5/12 bg-indigo-600 p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-500 opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-indigo-700 opacity-50 blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12">
              <div className="bg-white p-2 rounded-lg text-indigo-600">
                <Briefcase size={24} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold tracking-tight">TrackHire</span>
            </div>

            <h1 className="text-4xl font-extrabold mb-6 leading-tight">
              Welcome back!
            </h1>
            <p className="text-indigo-100 text-lg mb-8">
              Log in to manage your job applications and track your progress.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-indigo-50">
                <ShieldCheck className="text-indigo-300" size={24} />
                <span>Secure access</span>
              </div>
              <div className="flex items-center gap-3 text-indigo-50">
                <User className="text-indigo-300" size={24} />
                <span>Personalized dashboard</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-12 text-sm text-indigo-200">
            © 2026 TrackHire Inc. All rights reserved.
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="md:w-7/12 p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Log in</h2>
              <p className="text-slate-500">Enter your credentials to access your account.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50 focus:bg-white transition-colors outline-none"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50 focus:bg-white transition-colors outline-none"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl flex items-center gap-2 text-sm">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-semibold ${
                  isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'
                } transition-all duration-200`}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Log In <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div className="text-center mt-6">
                <p className="text-sm text-slate-500">
                  Don't have an account?{' '}
                  <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">
                    Create one here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}