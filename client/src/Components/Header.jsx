// src/Components/Header.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';
import logoVideo from '../assets/TrackHire_Logo.mp4'; // <-- Add this import!


export default function Header({ totalJobs, onOpenModal }) {
  const location = useLocation();

  // Determine the header text based on the current URL
  let headerText = "";
  if (location.pathname === "/") {
    headerText = <span>Welcome back! You've applied to <strong className="text-gray-900">{totalJobs} jobs</strong>.</span>;
  } else if (location.pathname === "/applications") {
    headerText = <span>Manage your application history.</span>;
  } else if (location.pathname === "/profile") {
    headerText = <span>Manage your personal settings.</span>;
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-20">
      
      {/* Updated Dynamic Video Logo */}
      <div className="md:hidden flex items-center">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="h-10 w-auto rounded-md object-cover"
        >
          <source src={logoVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="hidden md:block text-sm text-gray-500">
        {headerText}
      </div>

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