// src/Pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, Mail, Lock, Building, Eye, EyeOff, Briefcase,
  ShieldCheck, AlertCircle, CheckCircle2, ArrowRight,
  GraduationCap, BriefcaseBusiness, CalendarDays, TrendingUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'fresher',           // 'fresher' or 'professional'
    company: '',
    yearsExperience: '',
    currentRole: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    else if (!nameRegex.test(formData.fullName)) newErrors.fullName = 'Name can only contain letters, spaces, hyphens, and apostrophes';

    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Professional specific validations
    if (formData.userType === 'professional') {
      if (!formData.company.trim()) newErrors.company = 'Current company is required';
      if (!formData.yearsExperience) newErrors.yearsExperience = 'Years of experience is required';
      else if (isNaN(formData.yearsExperience) || formData.yearsExperience < 0) {
        newErrors.yearsExperience = 'Please enter a valid number';
      }
      if (!formData.currentRole.trim()) newErrors.currentRole = 'Current role / designation is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await register(formData);
      setSubmitStatus('success');
      // Reset form
      setFormData({
        fullName: '', email: '', password: '', confirmPassword: '', userType: 'fresher',
        company: '', yearsExperience: '', currentRole: ''
      });
    } catch (err) {
      setErrors({ general: err.message || 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Registration Successful!</h2>
          <p className="text-slate-600">
            Your account has been created. You can now log in.
          </p>
          <Link
            to="/login"
            className="block w-full mt-6 bg-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Continue to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white max-w-5xl w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Panel - Branding */}
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
            <h1 className="text-4xl font-extrabold mb-6 leading-tight">Start your journey today.</h1>
            <p className="text-indigo-100 text-lg mb-8">
              Whether you're a fresh graduate or an experienced professional – we help you track every application.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-indigo-50">
                <ShieldCheck className="text-indigo-300" size={24} />
                <span>Secure & private</span>
              </div>
              <div className="flex items-center gap-3 text-indigo-50">
                <User className="text-indigo-300" size={24} />
                <span>Tailored for job seekers</span>
              </div>
            </div>
          </div>
          <div className="relative z-10 mt-12 text-sm text-indigo-200">© 2026 TrackHire Inc.</div>
        </div>

        {/* Right Panel - Form */}
        <div className="md:w-7/12 p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Create an account</h2>
              <p className="text-slate-500">Tell us about yourself.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* User Type Toggle */}
              <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'fresher' })}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                    formData.userType === 'fresher' 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <GraduationCap size={16} /> I'm a Fresher
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'professional' })}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                    formData.userType === 'professional' 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <BriefcaseBusiness size={16} /> Working Professional
                </button>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border ${errors.fullName ? 'border-red-500' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50 focus:bg-white transition-colors outline-none`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.fullName && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle size={14} /> {errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-500' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50 focus:bg-white transition-colors outline-none`}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle size={14} /> {errors.email}</p>}
              </div>

              {/* Professional extra fields (conditional) */}
              {formData.userType === 'professional' && (
                <div className="space-y-5 border-l-4 border-indigo-200 pl-4 mt-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Current Company</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Building size={18} />
                      </div>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-3 border ${errors.company ? 'border-red-500' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white outline-none`}
                        placeholder="Google / Microsoft / etc."
                      />
                    </div>
                    {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Years of Experience</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <CalendarDays size={18} />
                        </div>
                        <input
                          type="number"
                          name="yearsExperience"
                          value={formData.yearsExperience}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 border ${errors.yearsExperience ? 'border-red-500' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white outline-none`}
                          placeholder="e.g. 3"
                        />
                      </div>
                      {errors.yearsExperience && <p className="mt-1 text-sm text-red-500">{errors.yearsExperience}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Current Role</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <TrendingUp size={18} />
                        </div>
                        <input
                          type="text"
                          name="currentRole"
                          value={formData.currentRole}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 border ${errors.currentRole ? 'border-red-500' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white outline-none`}
                          placeholder="Senior Software Engineer"
                        />
                      </div>
                      {errors.currentRole && <p className="mt-1 text-sm text-red-500">{errors.currentRole}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Password & Confirm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-10 py-3 border ${errors.password ? 'border-red-500' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white outline-none`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white outline-none`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
                </div>
              </div>

              {errors.general && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl flex items-center gap-2 text-sm">
                  <AlertCircle size={16} /> {errors.general}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full mt-6 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-semibold ${
                  isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'
                } transition-all duration-200`}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>Create Account <ArrowRight size={18} /></>
                )}
              </button>

              <div className="text-center mt-6">
                <p className="text-sm text-slate-500">
                  Already have an account?{' '}
                  <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">
                    Log in here
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