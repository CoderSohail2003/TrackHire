// src/Pages/Dashboard.jsx
import React, { useMemo } from 'react';
import { Briefcase, User, CheckCircle2, Clock, Sparkles } from 'lucide-react';

import heroImg from '../assets/hero_img.png'; 

export default function Dashboard({ jobs }) {
  
  const stats = useMemo(() => {
    return {
      total: jobs.length,
      active: jobs.filter(j => ['Applied', 'Screening', 'Interview'].includes(j.status)).length,
      interviews: jobs.filter(j => j.status === 'Interview').length,
      offers: jobs.filter(j => j.status === 'Offer').length,
    };
  }, [jobs]);

  return (
    <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
      
      {/* --- COMPACT SEAMLESS GRADIENT HERO BANNER --- */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row bg-gradient-to-b md:bg-gradient-to-r from-indigo-900 via-indigo-800 to-white">
        
        {/* Adjusted subtle glowing orb */}
        <div className="absolute top-0 left-0 -mt-10 -ml-10 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl z-0 pointer-events-none"></div>
        
        {/* LEFT PANEL: Tighter padding (p-6 to p-10) */}
        <div className="md:w-7/12 p-6 md:p-8 lg:p-10 flex flex-col justify-center text-white relative z-10">
          
          {/* Reduced gap between text and button (gap-5) */}
          <div className="flex flex-col gap-5 items-start">
            
            {/* Smaller Text (text-3xl to 5xl instead of 4xl to 6xl) */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight drop-shadow-md">
              YOUR JOB HUNT <br />
              ORGANIZED <br />
              SIMPLIFIED
            </h1>
            
            {/* Smaller Button (px-6 py-3 instead of px-8 py-4) */}
            <button className="bg-gray-950 hover:bg-black text-white px-6 py-3 text-sm md:text-base rounded-xl font-bold tracking-wide shadow-[0_0_15px_rgba(255,255,255,0.25)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group">
              <Sparkles size={16} className="text-pink-300 group-hover:scale-110 transition-transform" />
              GET STARTED
            </button>
          </div>
        </div>
        
        {/* RIGHT PANEL: Tighter padding and shorter image */}
        <div className="md:w-5/12 p-6 md:p-8 flex items-center justify-center relative z-10">
          <img 
            src={heroImg} 
            alt="TrackHire Job Application Tracking" 
            
            className="w-full h-auto max-w-87.5 md:max-w-none md:max-h-65 lg:max-h-77.5 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"          />
        </div>
        
      </div>
      {/* ------------------------------------------- */}

      {/* STATS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Card */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Applied</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{stats.total}</h3>
            </div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Briefcase size={20} />
            </div>
          </div>
        </div>
        
        {/* Active Card */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Active</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{stats.active}</h3>
            </div>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <Clock size={20} />
            </div>
          </div>
        </div>
        
        {/* Interviews Card */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Interviews</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{stats.interviews}</h3>
            </div>
            <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
              <User size={20} />
            </div>
          </div>
        </div>
        
        {/* Offers Card */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Offers</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{stats.offers}</h3>
            </div>
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <CheckCircle2 size={20} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}