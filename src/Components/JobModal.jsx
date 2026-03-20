// src/Components/JobModal.jsx
import React, { useState, useEffect } from 'react';
import { XCircle, FileText } from 'lucide-react';
import Loader from './Loader'; // 1. IMPORT YOUR NEW LOADER

// 2. Accept isSaving in the props
export default function JobModal({ isOpen, onClose, onSubmit, initialData = null, isSaving }) {
  const [formData, setFormData] = useState({
    company: '', role: '', location: 'Remote', jobType: 'Full-time', 
    hrName: '', status: 'Applied', dateApplied: new Date().toISOString().split('T')[0], 
    resumeName: '', referralUsed: false, referrerName: '', referrerRole: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        company: '', role: '', location: 'Remote', jobType: 'Full-time', 
        hrName: '', status: 'Applied', dateApplied: new Date().toISOString().split('T')[0], 
        resumeName: '', referralUsed: false, referrerName: '', referrerRole: ''
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 3. Notice we DO NOT call onClose() here anymore! 
    // App.jsx controls when it closes after the database is done.
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
      // Don't let user click outside to close if it is currently saving
      onClick={!isSaving ? onClose : undefined} 
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-indigo-600 sticky top-0 z-10">
          <h3 className="text-lg font-bold text-white">
            {initialData ? 'Edit Application' : 'Log New Application'}
          </h3>
          <button 
            onClick={onClose} 
            disabled={isSaving} // Disable close button while saving
            className="text-indigo-100 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <XCircle size={24} />
          </button>
        </div>
        
        {/* Disable the entire form fieldset while saving so user can't type */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <fieldset disabled={isSaving} className="space-y-5">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Company</label>
                <input required type="text" placeholder="e.g. Google" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-50"
                  value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Role</label>
                <input required type="text" placeholder="e.g. SDE Intern" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-50"
                  value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Job Type</label>
                <select className="w-full px-3 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-50"
                  value={formData.jobType} onChange={(e) => setFormData({...formData, jobType: e.target.value})}>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Location</label>
                <select className="w-full px-3 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-50"
                  value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})}>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Onsite">Onsite</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Status</label>
                <select className="w-full px-3 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-50"
                  value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                  <option value="Applied">Applied</option>
                  <option value="Screening">Screening</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Ghosted">Ghosted</option>
                </select>
              </div>
              <div className="space-y-1">
                 <label className="text-xs font-semibold text-gray-500 uppercase">Application Date</label>
                 <input type="date" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-50"
                    value={formData.dateApplied} onChange={(e) => setFormData({...formData, dateApplied: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">HR Name</label>
                <input type="text" placeholder="e.g. John Doe" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-50"
                  value={formData.hrName} onChange={(e) => setFormData({...formData, hrName: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Resume Used</label>
                <div className="relative">
                  <FileText size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input type="text" placeholder="e.g. Resume_v2.pdf" className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-50"
                    value={formData.resumeName} onChange={(e) => setFormData({...formData, resumeName: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <label className="flex items-center gap-2 cursor-pointer mb-3">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                  checked={formData.referralUsed}
                  onChange={(e) => setFormData({...formData, referralUsed: e.target.checked})}
                />
                <span className="text-sm font-semibold text-gray-700">I used a referral for this application</span>
              </label>

              {formData.referralUsed && (
                <div className="grid grid-cols-2 gap-4 p-4 bg-indigo-50 rounded-lg animate-in fade-in slide-in-from-top-2">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-indigo-700 uppercase">Referrer Name</label>
                    <input type="text" placeholder="Name" className="w-full px-3 py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-50 disabled:border-gray-200"
                      value={formData.referrerName} onChange={(e) => setFormData({...formData, referrerName: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-indigo-700 uppercase">Referrer Role</label>
                    <input type="text" placeholder="e.g. Senior Dev" className="w-full px-3 py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-50 disabled:border-gray-200"
                      value={formData.referrerRole} onChange={(e) => setFormData({...formData, referrerRole: e.target.value})} />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button - Renders the Loader when isSaving is true */}
            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-indigo-600 text-white font-bold h-12 rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:bg-indigo-400 disabled:cursor-wait flex items-center justify-center"
              >
                {isSaving ? (
                  <Loader color="bg-white" />
                ) : (
                  initialData ? 'Update Log' : 'Add to TrackHire'
                )}
              </button>
            </div>
            
          </fieldset>
        </form>
      </div>
    </div>
  );
}