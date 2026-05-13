// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('trackhire_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const storedUser = localStorage.getItem('trackhire_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser.email === email && password.length >= 6) {
            setUser(parsedUser);
            resolve(parsedUser);
          } else {
            reject(new Error('Invalid credentials'));
          }
        } else {
          reject(new Error('User not found. Please register first.'));
        }
      }, 800);
    });
  };

  const register = (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.email && userData.password && userData.fullName) {
          const newUser = {
            email: userData.email,
            name: userData.fullName,
            userType: userData.userType, // 'fresher' or 'professional'
            // Professional fields (may be null/empty for fresher)
            company: userData.company || '',
            yearsExperience: userData.yearsExperience || '',
            currentRole: userData.currentRole || '',
          };
          localStorage.setItem('trackhire_user', JSON.stringify(newUser));
          setUser(newUser);
          resolve(newUser);
        } else {
          reject(new Error('Registration failed. Please fill all required fields.'));
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('trackhire_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};