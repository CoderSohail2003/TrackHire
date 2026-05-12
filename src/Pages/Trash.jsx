import React, { useState } from 'react';
import { Trash2, RotateCcw, AlertTriangle, Settings2, Building2, CalendarX2 } from 'lucide-react';
import TrashSettingsModal from '../Components/TrashSettingsModal';

const Trash = ({ trashJobs, restoreJob, permanentDeleteJob, retention, setRetention }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const getDaysRemaining = (deletedAtDate) => {
    const deleteDate = new Date(deletedAtDate);
    const now = new Date();
    const diffTime = Math.abs(now - deleteDate);
    const daysPassed = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return retention - daysPassed;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Trash2 className="text-rose-500" size={24} />
            Trash
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Items are permanently deleted after <span className="font-bold text-indigo-600">{retention} days</span>.
          </p>
        </div>
        
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Settings2 size={16} />
          Retention Settings
        </button>
      </div>

      {/* Content Section */}
      {trashJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 border-dashed">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Trash2 size={32} className="text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-700 mb-1">Your trash is empty</h3>
          <p className="text-gray-500 text-sm">No applications have been deleted recently.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {trashJobs.map(job => {
            const daysRemaining = getDaysRemaining(job.deletedAt);
            const isExpiringSoon = daysRemaining <= 3;

            return (
              <div 
                key={job.id} 
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-gray-300 transition-all group"
              >
                <div className="mb-4 sm:mb-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">{job.role}</h3>
                    {isExpiringSoon && (
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <AlertTriangle size={12} />
                        Expires in {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Building2 size={16} className="text-gray-400" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1.5 border-l border-gray-200 pl-4">
                      <CalendarX2 size={16} className="text-gray-400" />
                      Deleted: {new Date(job.deletedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <button 
                    onClick={() => restoreJob(job.id)}
                    className="flex-1 sm:flex-none px-4 py-2 text-sm font-bold bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={16} />
                    Restore
                  </button>
                  <button 
                    onClick={() => permanentDeleteJob(job.id)}
                    className="flex-1 sm:flex-none px-4 py-2 text-sm font-bold bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <TrashSettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        currentRetention={retention}
        setRetention={setRetention}
      />
    </div>
  );
};

export default Trash;