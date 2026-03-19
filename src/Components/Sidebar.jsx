// src/components/Sidebar.jsx
import React from 'react';
import { LayoutDashboard, ListFilter } from 'lucide-react';

// Controls the left navigation and switches between 'dashboard' and 'applications' views
export default function Sidebar({ activeView, setActiveView }) {
  return (
    <nav className="fixed left-0 top-0 h-full w-16 md:w-64 bg-white border-r border-gray-200 hidden md:flex flex-col z-10">
      {/* App Logo/Branding */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
          T
        </div>
        <span className="ml-3 font-bold text-xl text-gray-800 hidden md:block">TrackHire</span>
      </div>
      
      {/* Navigation Links */}
      <div className="p-4 space-y-1">
        <button 
          onClick={() => setActiveView('dashboard')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${activeView === 'dashboard' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
        >
          <LayoutDashboard size={20} />
          <span className="hidden md:block">Dashboard</span>
        </button>
        <button 
           onClick={() => setActiveView('applications')}
           className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${activeView === 'applications' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
        >
          <ListFilter size={20} />
          <span className="hidden md:block">Applications</span>
        </button>
      </div>

      {/* User Profile Area (Bottom) */}
      <div className="mt-auto p-6 border-t border-gray-100">
         <div className="flex items-center gap-3">
           <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
              Me
           </div>
           <div className="hidden md:block">
             <p className="text-sm font-medium">My Profile</p>
             <p className="text-xs text-gray-400">Intern Hopeful</p>
           </div>
         </div>
      </div>
    </nav>
  );
}