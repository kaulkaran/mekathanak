import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Poems from './pages/Poems';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  return (
    // 1. Wrapper: Ensures the dark background covers the whole screen height & width
    <div className="w-full min-h-screen bg-[#1a1f23] text-[#e6e6e6]">
      
      <Header />
      
      {/* 2. Main: REMOVED maxWidth, margin, and padding. 
             We allow the individual pages (Home, Poems) to handle their own layout. 
             Since Header is 'sticky', it sits in the flow, so we don't need manual padding top. */}
      <main className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/poems" element={<Poems />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
    </div>
  );
}