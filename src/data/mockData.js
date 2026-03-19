// src/data/mockData.js

// This is temporary mock data so your UI isn't empty. 
// When you add a database later, you will delete this file and fetch from your API.
export const initialJobs = [
  {
    id: '1',
    company: 'Microsoft',
    role: 'SDE Intern',
    hrName: 'Jane Smith',
    hrContact: 'jane@microsoft.com',
    status: 'Interview',
    dateApplied: '2026-03-01',
    resumeName: 'Sohail_Resume_v2.pdf',
    notes: '',
    location: 'Remote',
    jobType: 'Internship',
    referralUsed: true,
    referrerName: 'John Doe',
    referrerRole: 'Senior Eng'
  },
  {
    id: '2',
    company: 'Amazon',
    role: 'Frontend Developer',
    hrName: '',
    hrContact: '',
    status: 'Applied',
    dateApplied: '2026-03-15',
    resumeName: 'Sohail_Resume_v1.pdf',
    notes: '',
    location: 'Onsite',
    jobType: 'Full-time',
    referralUsed: false,
    referrerName: '',
    referrerRole: '',
  }
];