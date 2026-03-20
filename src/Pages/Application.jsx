// src/Pages/Application.jsx
import React, { useState, useEffect } from 'react';
import { Search, Calendar, MoreVertical, Trash2, Edit, Pin } from 'lucide-react'; // Added Edit & Pin icons
import StatusBadge from '../Components/StatusBadge';

export default function Applications({ jobs, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // NEW: State to track which dropdown menu is currently open
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // NEW: Close the dropdown if the user clicks anywhere else on the screen
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by company or role..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* --- MODERN DATA TABLE --- */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-visible">
        <div className="overflow-visible">
          <table className="w-full text-left border-collapse">
            
            {/* BRANDED HEADER */}
            <thead>
              <tr className="bg-indigo-50/80 border-b border-indigo-100 text-xs uppercase tracking-wider text-indigo-700 font-bold">
                <th className="px-4 py-4 w-12 text-center">#</th>
                <th className="px-6 py-4">Company & Role</th>
                <th className="px-6 py-4">Job Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date Applied</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            
            {/* TABLE BODY */}
            <tbody className="divide-y divide-gray-100">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-400">No applications found.</td>
                </tr>
              ) : (
                filteredJobs.map((job, index) => (
                  <tr 
                    key={job.id} 
                    className="even:bg-slate-50/70 hover:bg-indigo-50/40 transition-colors group divide-x divide-gray-50"
                  >
                    
                    {/* Index */}
                    <td className="px-4 py-4 text-center text-sm font-semibold text-gray-500">
                      {index + 1}
                    </td>

                    {/* Company & Role */}
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{job.company}</p>
                      <p className="text-sm text-gray-500">{job.role}</p>
                    </td>

                    {/* Job Type */}
                    <td className="px-6 py-4">
                      <span className="bg-white text-gray-600 px-2.5 py-1 rounded-md text-xs font-medium border border-gray-200 shadow-sm">
                        {job.jobType || 'N/A'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4"><StatusBadge status={job.status} /></td>
                    
                    {/* Date Applied */}
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" />
                        {job.dateApplied}
                      </div>
                    </td>
                    
                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      {/* Added 'relative' to the container so the dropdown positions correctly */}
                      <div className="flex items-center justify-end gap-2 relative">
                        
                        {/* 3 Dots Menu Button */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); // Stop the window click listener from immediately closing it
                            setOpenDropdownId(openDropdownId === job.id ? null : job.id);
                          }} 
                          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-white hover:shadow-sm rounded-md transition-all focus:outline-none"
                        >
                          <MoreVertical size={16} />
                        </button>

                        {/* NEW: Dropdown Menu */}
                        {openDropdownId === job.id && (
                          <div 
                            className="absolute right-10 top-0 mt-1 w-48 bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 z-50 overflow-hidden"
                            onClick={(e) => e.stopPropagation()} // Keep menu open if clicking inside it
                          >
                            <button 
                              onClick={() => {
                                onEdit(job);
                                setOpenDropdownId(null); // Close menu after opening modal
                              }} 
                              className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2 transition-colors font-medium"
                            >
                              <Edit size={16} />
                              Edit Application
                            </button>
                            <button 
                              onClick={() => {
                                console.log(`Pin feature coming soon for job ID: ${job.id}`);
                                setOpenDropdownId(null);
                              }} 
                              className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2 transition-colors border-t border-gray-50 font-medium"
                            >
                              <Pin size={16} />
                              Pin Application
                            </button>
                            <button 
                              onClick={() => {
                                console.log(`Pin feature coming soon for job ID: ${job.id}`);
                                setOpenDropdownId(null);
                              }} 
                              className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2 transition-colors border-t border-gray-50 font-medium"
                            >
                              <Pin size={16} />
                              Share Application
                            </button>
                          </div>
                        )}

                        {/* Trash Button */}
                        <button onClick={() => onDelete(job.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-white hover:shadow-sm rounded-md transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}