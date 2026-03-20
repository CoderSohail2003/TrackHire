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
  // 1. LAZY INITIALIZE STATE FROM LOCAL STORAGE
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('trackhire_jobs');
    return savedJobs ? JSON.parse(savedJobs) : initialJobs;
  });

  const [userProfile, setUserProfile] = useState(() => {
    const savedProfile = localStorage.getItem('trackhire_profile');
    return savedProfile ? JSON.parse(savedProfile) : {
      name: 'Unknown',
      title: 'Unknown',
      email: '',
      location: ''
    };
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  // 2. SAVE TO LOCAL STORAGE WHENEVER STATE CHANGES
  useEffect(() => {
    localStorage.setItem('trackhire_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('trackhire_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // --- CRUD OPERATIONS ---
  const handleAddJob = (jobData) => {
    const newJob = { ...jobData, id: Date.now().toString() };
    setJobs([newJob, ...jobs]);
  };

  const handleUpdateJob = (updatedData) => {
    setJobs(jobs.map(job => (job.id === editingJob.id ? { ...updatedData, id: editingJob.id } : job)));
    setEditingJob(null);
  };

  const handleDeleteJob = (id) => {
    if (window.confirm("Delete this log?")) {
      setJobs(jobs.filter(job => job.id !== id));
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
                <Applications jobs={jobs} onEdit={(job) => { setEditingJob(job); setIsModalOpen(true); }} onDelete={handleDeleteJob} />
              } />
              
              <Route path="/profile" element={
                <Profile userProfile={userProfile} setUserProfile={setUserProfile} />
              } />
            </Routes>
          </div>
          <Footer/>
        </main>

        <JobModal 
          isOpen={isModalOpen} 
          onClose={() => { setIsModalOpen(false); setEditingJob(null); }}
          onSubmit={editingJob ? handleUpdateJob : handleAddJob}
          initialData={editingJob}
        />

      </div>
    </BrowserRouter>
  );
}