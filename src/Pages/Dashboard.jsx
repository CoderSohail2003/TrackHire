// src/Pages/Dashboard.jsx
import React, { useMemo } from 'react';
import { 
  Briefcase, User, CheckCircle2, Clock, Sparkles, Search, Pin, 
  CalendarDays, AlertCircle, ArrowUpRight, Timer, Info, ScanSearch 
} from 'lucide-react';

import heroImg from '../assets/hero_img.png'; 

export default function Dashboard({ jobs }) {
  
  // 1. Calculate General Stats
  const stats = useMemo(() => {
    return {
      total: jobs.length,
      active: jobs.filter(j => ['Applied', 'Screening', 'Interview'].includes(j.status)).length,
      interviews: jobs.filter(j => j.status === 'Interview').length,
      offers: jobs.filter(j => j.status === 'Offer').length,
      pinned: jobs.filter(j => j.isPinned).length, 
    };
  }, [jobs]);

  // 2. Calculate Action Radar Data
  const actionRadar = useMemo(() => {
    const today = new Date();

    // Get all interviews
    const upcomingInterviews = jobs.filter(j => j.status === 'Interview');

    // Get jobs stuck in "Applied" for 7+ days
    const followUpsNeeded = jobs.filter(j => {
      if (j.status !== 'Applied') return false;
      const appliedDate = new Date(j.dateApplied);
      const diffTime = Math.abs(today - appliedDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 7; 
    }).map(j => {
      // Attach the days waiting to the object so we can display it
      const appliedDate = new Date(j.dateApplied);
      const diffDays = Math.ceil(Math.abs(today - appliedDate) / (1000 * 60 * 60 * 24));
      return { ...j, daysWaiting: diffDays };
    }).sort((a, b) => b.daysWaiting - a.daysWaiting); // Sort longest waiting first

    return { upcomingInterviews, followUpsNeeded };
  }, [jobs]);

  return (
    <div className="space-y-6 animate-in slide-in-from-top-4 duration-500 pb-10">
      
      {/* --- HERO BANNER --- */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row bg-gradient-to-b md:bg-gradient-to-r from-indigo-900 to-white">
        <div className="absolute top-0 left-0 -mt-10 -ml-10 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl z-0 pointer-events-none"></div>
        <div className="md:w-7/12 p-6 md:p-8 lg:p-10 flex flex-col justify-center text-white relative z-10">
          <div className="flex flex-col gap-5 items-start">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight drop-shadow-md">
              <span className="inline-flex items-center gap-3">
                YOUR JOB HUNT 
                <ScanSearch className="h-[1em] w-[1em] text-white" strokeWidth={3} />
              </span>
              <br/>
              ORGANIZED <br />
              SIMPLIFIED
            </h1>
            <button className="bg-gray-950 hover:bg-black text-white px-6 py-3 text-sm md:text-base rounded-xl font-bold tracking-wide shadow-[0_0_15px_rgba(255,255,255,0.25)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group">
              <Sparkles size={16} className="text-pink-300 group-hover:scale-110 transition-transform" />
              GET STARTED
            </button>
          </div>
        </div>
        <div className="md:w-5/12 p-6 md:p-8 flex items-center justify-center relative z-10">
          <img 
            src={heroImg} alt="TrackHire Job Application Tracking" 
            className="w-full h-auto max-w-[350px] md:max-w-none md:max-h-[260px] lg:max-h-[310px] object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Applied</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{stats.total}</h3>
            </div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Briefcase size={20} /></div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Active</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{stats.active}</h3>
            </div>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Clock size={20} /></div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Interviews</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{stats.interviews}</h3>
            </div>
            <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg"><User size={20} /></div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Offers</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{stats.offers}</h3>
            </div>
            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><CheckCircle2 size={20} /></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Pinned</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{stats.pinned}</h3>
            </div>
            <div className="p-2 bg-pink-50 text-pink-600 rounded-lg"><Pin size={20} className="fill-pink-600 text-pink-600" /></div>
          </div>
        </div>
      </div>

      {/* --- ACTION RADAR --- */}
      <div className="mt-8">
        <div className="flex items-center gap-3 mb-6">
           <div className="h-8 w-2 bg-indigo-600 rounded-full"></div>
           <h2 className="text-2xl font-black text-gray-900 tracking-tight">Action Radar</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* LEFT PANEL: Upcoming Interviews */}
          {/* NOTE: Removed overflow-hidden so tooltips can break out! */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col relative group">
            {/* Sleek Gradient Header - Added rounded-t-2xl */}
            <div className="px-6 py-4 bg-gradient-to-r from-yellow-50 to-white border-b border-gray-100 flex justify-between items-center rounded-t-2xl">
              <div className="flex items-center gap-2">
                <CalendarDays size={18} className="text-yellow-600" />
                <h3 className="font-bold text-gray-800">Upcoming Interviews</h3>
                
                {/* Info Icon with Tooltip */}
                <div className="relative group/tooltip flex items-center ml-1">
                  <Info size={15} className="text-gray-400 hover:text-gray-600 cursor-help transition-colors" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 text-center shadow-xl font-medium">
                    Shows applications currently marked with the "Interview" status.
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>

              </div>
              <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                </span>
                {actionRadar.upcomingInterviews.length} Scheduled
              </span>
            </div>
            
            {/* List Body - Added rounded-b-2xl */}
            <div className="p-4 flex-1 bg-gray-50/50 rounded-b-2xl">
              {actionRadar.upcomingInterviews.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-gray-400 py-10">
                   <CalendarDays size={40} className="opacity-20 mb-3" />
                   <p className="text-sm font-medium">No interviews scheduled yet.</p>
                 </div>
              ) : (
                <div className="space-y-3">
                  {actionRadar.upcomingInterviews.map(job => (
                    <div key={job.id} className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md hover:border-yellow-200 transition-all duration-300 transform hover:-translate-y-0.5 cursor-default flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-gray-900 text-base">{job.company}</h4>
                        <p className="text-sm text-gray-500 mt-0.5">{job.role}</p>
                      </div>
                      <button className="h-10 w-10 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-white transition-colors">
                        <ArrowUpRight size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: Follow-Up Radar */}
          {/* NOTE: Removed overflow-hidden here as well */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col relative group">
            {/* Sleek Gradient Header - Added rounded-t-2xl */}
            <div className="px-6 py-4 bg-gradient-to-r from-rose-50 to-white border-b border-gray-100 flex justify-between items-center rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Timer size={18} className="text-rose-600" />
                <h3 className="font-bold text-gray-800">Follow-Up Radar</h3>
                
                {/* Info Icon with Tooltip */}
                <div className="relative group/tooltip flex items-center ml-1">
                  <Info size={15} className="text-gray-400 hover:text-gray-600 cursor-help transition-colors" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-[100] text-center shadow-xl font-medium">
                    Flags jobs stuck in the "Applied" status for 7 or more days so you can follow up.
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>

              </div>
              <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <AlertCircle size={14} />
                {actionRadar.followUpsNeeded.length} Pending
              </span>
            </div>

            {/* List Body - Added rounded-b-2xl */}
            <div className="p-4 flex-1 bg-gray-50/50 rounded-b-2xl">
              {actionRadar.followUpsNeeded.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-gray-400 py-10">
                   <CheckCircle2 size={40} className="opacity-20 mb-3" />
                   <p className="text-sm font-medium">You're all caught up!</p>
                 </div>
              ) : (
                <div className="space-y-3">
                  {actionRadar.followUpsNeeded.map(job => (
                    <div key={job.id} className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-300 transform hover:-translate-y-0.5 cursor-default flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-gray-900 text-base">{job.company}</h4>
                          <span className="text-[10px] uppercase tracking-wider font-bold bg-rose-50 text-rose-600 px-2 py-0.5 rounded-md border border-rose-100">
                            {job.daysWaiting} Days Ago
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">{job.role}</p>
                      </div>
                      <button className="h-10 w-10 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors">
                        <ArrowUpRight size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}