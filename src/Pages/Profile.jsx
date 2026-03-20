// src/Pages/Profile.jsx
import React, { useState } from 'react';
import { User, Briefcase, Mail, MapPin, Save } from 'lucide-react';
import profileIcon from '../assets/profile_icon.png';
import Loader from '../Components/Loader'; // IMPORT LOADER

export default function Profile({ userProfile, setUserProfile }) {
  const [formData, setFormData] = useState({
    name: userProfile.name === 'Unknown' ? '' : userProfile.name,
    title: userProfile.title === 'Unknown' ? '' : userProfile.title,
    email: userProfile.email,
    location: userProfile.location
  });

  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // NEW STATE

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Fake database network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    setUserProfile({
      name: formData.name || 'Unknown',
      title: formData.title || 'Unknown',
      email: formData.email,
      location: formData.location
    });
    
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000); 
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex items-center gap-6">
        <img src={profileIcon} alt="Profile" className="h-24 w-24 rounded-full bg-indigo-50 p-2 object-cover shadow-sm border border-indigo-100" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{userProfile.name !== 'Unknown' ? userProfile.name : 'Unknown User'}</h1>
          <p className="text-gray-500 text-lg mt-1">{userProfile.title !== 'Unknown' ? userProfile.title : 'Setup your profile below'}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-8 py-5 border-b border-gray-50 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
          <p className="text-sm text-gray-500">Update your details. These will be used for AI email drafting later.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <fieldset disabled={isSaving} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-3 text-gray-400" />
                <input type="text" placeholder="e.g. Sohail" className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-50" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Headline / Role</label>
              <div className="relative">
                <Briefcase size={18} className="absolute left-3 top-3 text-gray-400" />
                <input type="text" placeholder="e.g. MCA Student" className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-50" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                <input type="email" placeholder="e.g. hello@example.com" className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-50" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Location</label>
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-3 text-gray-400" />
                <input type="text" placeholder="e.g. Mumbai" className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-50" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
              </div>
            </div>
          </fieldset>

          <div className="pt-4 flex items-center justify-between border-t border-gray-100 mt-6">
            <span className="text-sm font-medium text-green-600 transition-opacity duration-300" style={{ opacity: saved ? 1 : 0 }}>
              Profile updated successfully!
            </span>
            <button 
              type="submit" 
              disabled={isSaving}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-12 rounded-xl font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 min-w-[160px] disabled:bg-indigo-400 disabled:cursor-wait"
            >
              {isSaving ? <Loader color="bg-white" /> : <><Save size={18} /> Save Profile</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}