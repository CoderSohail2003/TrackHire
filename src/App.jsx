// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import JobModal from './Components/JobModal';
import Dashboard from './Pages/Dashboard';
import Applications from './Pages/Application';
import { initialJobs } from './data/mockData';

export default function App() {
  // --- GLOBAL STATE ---
  // 1. Manage our list of jobs (Replacing the Database for now)
  const [jobs, setJobs] = useState(initialJobs);
  
  // 2. Navigation State ('dashboard' or 'applications')
  const [activeView, setActiveView] = useState('dashboard');
  
  // 3. Modal State (For adding/editing jobs)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  // --- CRUD OPERATIONS (Local State only) ---
  
  // ADD: Creates a new job with a random ID
  const handleAddJob = (jobData) => {
    const newJob = { ...jobData, id: Date.now().toString() };
    setJobs([newJob, ...jobs]);
  };

  // UPDATE: Finds the job by ID and replaces its data
  const handleUpdateJob = (updatedData) => {
    setJobs(jobs.map(job => (job.id === editingJob.id ? { ...updatedData, id: editingJob.id } : job)));
    setEditingJob(null);
  };

  // DELETE: Removes a job from the array
  const handleDeleteJob = (id) => {
    if (window.confirm("Delete this log?")) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* 1. Left Sidebar Navigation */}
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Right-Side Content Area */}
      <main className="md:ml-64 min-h-screen flex flex-col">
        
        {/* 2. Top Header */}
        <Header 
          activeView={activeView} 
          totalJobs={jobs.length} 
          onOpenModal={() => setIsModalOpen(true)} 
        />

        {/* 3. Dynamic Page Content based on 'activeView' */}
        <div className="p-4 md:p-8 max-w-6xl mx-auto w-full flex-1">
          {activeView === 'dashboard' ? (
            <Dashboard jobs={jobs} />
          ) : (
            <Applications 
              jobs={jobs} 
              onEdit={(job) => { setEditingJob(job); setIsModalOpen(true); }}
              onDelete={handleDeleteJob}
            />
          )}
        </div>
      </main>

      {/* 4. Hidden Modal - only shows when isModalOpen is true */}
      <JobModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingJob(null); }}
        onSubmit={editingJob ? handleUpdateJob : handleAddJob}
        initialData={editingJob}
      />

    </div>
  );
}