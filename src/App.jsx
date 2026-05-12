// src/App.jsx (simplified, using only auth user)
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import JobModal from './Components/JobModal';
import Dashboard from './Pages/Dashboard';
import Applications from './Pages/Application';
import Profile from './Pages/Profile';
import Trash from './Pages/Trash';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ProtectedRoute from './Components/ProtectedRoute';
import DeleteConfirmModal from './Components/DeleteConfirmModal';
import { initialJobs } from './data/mockData';
import Footer from './Components/Footer';

function AuthenticatedApp() {
  const { user, logout } = useAuth();
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem(`trackhire_jobs_${user?.email}`);
    return savedJobs ? JSON.parse(savedJobs) : initialJobs;
  });
  const [trashJobs, setTrashJobs] = useState(() => {
    const savedTrash = localStorage.getItem(`trackhire_trash_${user?.email}`);
    return savedTrash ? JSON.parse(savedTrash) : [];
  });
  const [trashRetention, setTrashRetention] = useState(() => {
    const savedRetention = localStorage.getItem(`trackhire_retention_${user?.email}`);
    return savedRetention ? JSON.parse(savedRetention) : 30;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [pinningId, setPinningId] = useState(null);
  const [deleteConfirmJobId, setDeleteConfirmJobId] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeletingConfirm, setIsDeletingConfirm] = useState(false);

  // Persist data per user
  useEffect(() => {
    if (user?.email) localStorage.setItem(`trackhire_jobs_${user.email}`, JSON.stringify(jobs));
  }, [jobs, user]);
  useEffect(() => {
    if (user?.email) localStorage.setItem(`trackhire_trash_${user.email}`, JSON.stringify(trashJobs));
  }, [trashJobs, user]);
  useEffect(() => {
    if (user?.email) localStorage.setItem(`trackhire_retention_${user.email}`, JSON.stringify(trashRetention));
  }, [trashRetention, user]);

  // Auto-clean trash
  useEffect(() => {
    const now = new Date();
    const activeTrash = trashJobs.filter(job => {
      const diffDays = Math.ceil(Math.abs(now - new Date(job.deletedAt)) / (1000 * 60 * 60 * 24));
      return diffDays <= trashRetention;
    });
    if (activeTrash.length !== trashJobs.length) setTrashJobs(activeTrash);
  }, [trashJobs, trashRetention]);

  const handleTogglePin = async (id) => {
    setPinningId(id);
    await new Promise(resolve => setTimeout(resolve, 800));
    setJobs(jobs.map(job => job.id === id ? { ...job, isPinned: !job.isPinned } : job));
    setPinningId(null);
  };
  const handleAddJob = async (jobData) => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setJobs([{ ...jobData, id: Date.now().toString() }, ...jobs]);
    setIsSaving(false);
    setIsModalOpen(false);
  };
  const handleUpdateJob = async (updatedData) => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setJobs(jobs.map(j => j.id === editingJob.id ? { ...updatedData, id: editingJob.id } : j));
    setEditingJob(null);
    setIsSaving(false);
    setIsModalOpen(false);
  };
  const openDeleteConfirm = (id) => {
    setDeleteConfirmJobId(id);
    setIsDeleteConfirmOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (!deleteConfirmJobId) return;
    setIsDeletingConfirm(true);
    setDeletingId(deleteConfirmJobId);
    await new Promise(resolve => setTimeout(resolve, 800));
    const jobToDelete = jobs.find(j => j.id === deleteConfirmJobId);
    if (jobToDelete) {
      setTrashJobs(prev => [...prev, { ...jobToDelete, deletedAt: new Date().toISOString() }]);
      setJobs(jobs.filter(j => j.id !== deleteConfirmJobId));
    }
    setDeletingId(null);
    setIsDeletingConfirm(false);
    setIsDeleteConfirmOpen(false);
    setDeleteConfirmJobId(null);
  };
  const restoreJob = (id) => {
    const jobToRestore = trashJobs.find(j => j.id === id);
    if (jobToRestore) {
      const { deletedAt, ...restored } = jobToRestore;
      setJobs(prev => [...prev, restored]);
      setTrashJobs(prev => prev.filter(j => j.id !== id));
    }
  };
  const permanentDeleteJob = (id) => {
    if (window.confirm("Permanently delete? Cannot be undone.")) {
      setTrashJobs(prev => prev.filter(j => j.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onLogout={logout} />
      <main className="md:ml-64 flex-1 flex flex-col">
        <Header totalJobs={jobs.length} onOpenModal={() => setIsModalOpen(true)} />
        <div className="p-4 md:p-8 max-w-6xl mx-auto w-full flex-1">
          <Routes>
            <Route path="/" element={<Dashboard jobs={jobs} />} />
            <Route path="/applications" element={
              <Applications 
                jobs={jobs} 
                onEdit={(job) => { setEditingJob(job); setIsModalOpen(true); }} 
                onDelete={openDeleteConfirm} 
                onTogglePin={handleTogglePin}
                deletingId={deletingId} 
                pinningId={pinningId}   
                onUpdate={async (updatedJob) => {
                  await new Promise(resolve => setTimeout(resolve, 800));
                  setJobs(jobs.map(j => j.id === updatedJob.id ? updatedJob : j));
                }}
              />
            } />
            <Route path="/profile" element={<Profile />} />
            <Route path="/trash" element={
              <Trash 
                trashJobs={trashJobs} 
                restoreJob={restoreJob} 
                permanentDeleteJob={permanentDeleteJob}
                retention={trashRetention}
                setRetention={setTrashRetention}
              />
            } />
          </Routes>
        </div>
        <Footer />
      </main>
      <JobModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingJob(null); }} onSubmit={editingJob ? handleUpdateJob : handleAddJob} initialData={editingJob} isSaving={isSaving} />
      <DeleteConfirmModal isOpen={isDeleteConfirmOpen} onClose={() => setIsDeleteConfirmOpen(false)} onConfirm={handleConfirmDelete} jobTitle={jobs.find(j => j.id === deleteConfirmJobId)?.company || 'this application'} isDeleting={isDeletingConfirm} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<ProtectedRoute><AuthenticatedApp /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}