// src/Components/Sidebar.jsx
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, ListFilter } from 'lucide-react';

// IMPORT YOUR PROFILE ICON HERE
import profileIcon from '../assets/profile_icon.png';

export default function Sidebar({ userProfile }) {
  
  // A helper function to apply active styles to our navigation links
  const navLinkClass = ({ isActive }) => 
    `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
      isActive 
      ? 'bg-indigo-50 text-indigo-600' 
      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
    }`;

  return (
    <nav className="fixed left-0 top-0 h-full w-16 md:w-64 bg-white border-r border-gray-200 hidden md:flex flex-col z-10">
      
      {/* App Logo */}
      <Link to="/" className="h-16 flex items-center px-6 border-b border-gray-100 hover:bg-gray-50 transition-colors">
        <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
          T
        </div>
        <span className="ml-3 font-bold text-xl text-gray-800 hidden md:block">TrackHire</span>
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
           {/* Profile Image Rendered Here */}
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