// src/Pages/Application.jsx
import React, { useState } from 'react';
import { Search, Calendar, MoreVertical, Trash2 } from 'lucide-react';
import StatusBadge from '../Components/StatusBadge';

export default function Applications({ jobs, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');

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

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                <th className="px-6 py-4 font-semibold">Company & Role</th>
                {/* NEW COLUMN HEADER */}
                <th className="px-6 py-4 font-semibold">Job Type</th> 
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Date Applied</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-400">No applications found.</td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50/80 transition-colors group">
                    
                    {/* Company & Role */}
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{job.company}</p>
                      <p className="text-sm text-gray-500">{job.role}</p>
                    </td>

                    {/* NEW COLUMN DATA: Job Type (with a small badge style) */}
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-medium border border-gray-200">
                        {job.jobType || 'N/A'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4"><StatusBadge status={job.status} /></td>
                    
                    {/* Date Applied */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" />
                        {job.dateApplied}
                      </div>
                    </td>
                    
                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => onEdit(job)} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
                          <MoreVertical size={16} />
                        </button>
                        <button onClick={() => onDelete(job.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
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