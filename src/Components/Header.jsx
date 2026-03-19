// src/components/Header.jsx
import React from 'react';
import { Plus } from 'lucide-react';

// Top bar containing the global "Log Application" button
export default function Header({ activeView, totalJobs, onOpenModal }) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Mobile Logo */}
      <div className="md:hidden flex items-center gap-2">
         <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">T</div>
         <span className="font-bold text-lg">TrackHire</span>
      </div>

      {/* Dynamic Title based on active page */}
      <div className="hidden md:block text-sm text-gray-500">
        {activeView === 'dashboard' 
          ? <span>Welcome back! You've applied to <strong className="text-gray-900">{totalJobs} jobs</strong> total.</span>
          : <span>Manage your application history.</span>
        }
      </div>

      {/* Global Action Button */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Log Application</span>
        </button>
      </div>
    </header>
  );
}