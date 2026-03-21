// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import JobModal from './Components/JobModal';
import Dashboard from './Pages/Dashboard';
import Applications from './Pages/Application';
import Profile from './Pages/Profile';
import { initialJobs } from './data/mockData';
import Footer from './Components/Footer';

export default function App() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('trackhire_jobs');
    return savedJobs ? JSON.parse(savedJobs) : initialJobs;
  });

  const [userProfile, setUserProfile] = useState(() => {
    const savedProfile = localStorage.getItem('trackhire_profile');
    return savedProfile ? JSON.parse(savedProfile) : {
      name: 'Unknown', title: 'Unknown', email: '', location: ''
    };
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  // --- GLOBAL LOADING STATES ---
  const [isSaving, setIsSaving] = useState(false); // For Job Modal
  const [deletingId, setDeletingId] = useState(null); // For Trash Icon
  const [pinningId, setPinningId] = useState(null); // For Pin Icon

  useEffect(() => { localStorage.setItem('trackhire_jobs', JSON.stringify(jobs)); }, [jobs]);
  useEffect(() => { localStorage.setItem('trackhire_profile', JSON.stringify(userProfile)); }, [userProfile]);

  // --- ASYNC CRUD OPERATIONS ---
  const handleTogglePin = async (id) => {
    setPinningId(id);
    await new Promise(resolve => setTimeout(resolve, 800)); // Fake DB Delay
    setJobs(jobs.map(job => job.id === id ? { ...job, isPinned: !job.isPinned } : job));
    setPinningId(null);
  };

  const handleAddJob = async (jobData) => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800)); 
    const newJob = { ...jobData, id: Date.now().toString() };
    setJobs([newJob, ...jobs]);
    setIsSaving(false);
    setIsModalOpen(false);
  };

  const handleUpdateJob = async (updatedData) => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setJobs(jobs.map(job => (job.id === editingJob.id ? { ...updatedData, id: editingJob.id } : job)));
    setEditingJob(null);
    setIsSaving(false);
    setIsModalOpen(false);
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm("Delete this log?")) {
      setDeletingId(id);
      await new Promise(resolve => setTimeout(resolve, 800));
      setJobs(jobs.filter(job => job.id !== id));
      setDeletingId(null);
    }
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Sidebar userProfile={userProfile} />
        <main className="md:ml-64 min-h-screen flex flex-col">
          <Header totalJobs={jobs.length} onOpenModal={() => setIsModalOpen(true)} />
          <div className="p-4 md:p-8 max-w-6xl mx-auto w-full flex-1">
            <Routes>
              <Route path="/" element={<Dashboard jobs={jobs} />} />
<Route path="/applications" element={
                <Applications 
                  jobs={jobs} 
                  onEdit={(job) => { setEditingJob(job); setIsModalOpen(true); }} 
                  onDelete={handleDeleteJob} 
                  onTogglePin={handleTogglePin}
                  deletingId={deletingId} 
                  pinningId={pinningId}   
                  
                  /* NEW: Handles the status update from the Progress Modal */
                  onUpdate={async (updatedJob) => {
                    // Turn on a global loading state if you want, or just wait 800ms
                    await new Promise(resolve => setTimeout(resolve, 800));
                    setJobs(jobs.map(j => j.id === updatedJob.id ? updatedJob : j));
                  }}
                />
              } />
              <Route path="/profile" element={<Profile userProfile={userProfile} setUserProfile={setUserProfile} />} />
            </Routes>
          </div>
          <Footer/>
        </main>
        <JobModal 
          isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingJob(null); }}
          onSubmit={editingJob ? handleUpdateJob : handleAddJob} initialData={editingJob} isSaving={isSaving} 
        />
      </div>
    </BrowserRouter>
  );
}