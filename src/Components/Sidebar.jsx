// src/Components/Sidebar.jsx
import React, { useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, ListFilter } from 'lucide-react';

import profileIcon from '../assets/profile_icon.png';
import logoVideo from '../assets/TrackHire_Logo.mp4'; 

export default function Sidebar({ userProfile }) {
  // 1. Create refs to control the video player and count the loops
  const videoRef = useRef(null);
  const playCount = useRef(0);

  // 2. The custom function that runs every time the video reaches the end
  const handleVideoEnded = () => {
    playCount.current += 1; // Increase the count by 1
    
    // If it has played less than 3 times, tell it to play again!
    if (playCount.current < 2) {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }
    // If it hits 3, it does nothing and naturally stays frozen on the last frame.
  };
  
  const navLinkClass = ({ isActive }) => 
    `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
      isActive 
      ? 'bg-indigo-50 text-indigo-600' 
      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
    }`;

  return (
    <nav className="fixed left-0 top-0 h-full w-16 md:w-64 bg-white border-r border-gray-200 hidden md:flex flex-col z-10">
      
{/* App Logo */}
      <Link to="/" className="h-16 flex items-center pl-2 pr-4 border-b border-gray-100 hover:bg-gray-50 transition-colors overflow-hidden">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          playsInline 
          onEnded={handleVideoEnded}
          // Changed ml-2 to -ml-4 to pull the video to the left
          // scale-125 still keeps it nice and big
          className="h-16 w-auto object-contain scale-125 mix-blend-multiply origin-left -ml-4"
        >
          <source src={logoVideo} type="video/mp4" />
        </video>
      </Link>
      
      {/* Navigation Links using NavLink */}
      <div className="p-4 space-y-1">
        <NavLink to="/" end className={navLinkClass}>
          <LayoutDashboard size={20} />
          <span className="hidden md:block">Dashboard</span>
        </NavLink>
        
        <NavLink to="/applications" className={navLinkClass}>
          <ListFilter size={20} />
          <span className="hidden md:block">Applications</span>
        </NavLink>
      </div>

      {/* Bottom Profile Section using Link */}
      <Link to="/profile" className="mt-auto p-6 border-t border-gray-100 hover:bg-gray-50 transition-colors block group">
         <div className="flex items-center gap-3">
           <img 
             src={profileIcon} 
             alt="Profile" 
             className="h-10 w-10 rounded-full bg-gray-100 object-cover p-1 group-hover:ring-2 ring-indigo-200 transition-all" 
           />
           <div className="hidden md:block overflow-hidden">
             <p className="text-md font-bold text-gray-900 truncate">
               {userProfile.name !== 'Unknown' ? userProfile.name : 'Unknown User'}
             </p>
             <p className="text-md text-gray-500 truncate mt-0.3">
               {userProfile.title !== 'Unknown' ? userProfile.title : 'Update Profile'}
             </p>
           </div>
         </div>
      </Link>
    </nav>
  );
}