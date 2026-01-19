import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { ok, error } = await login({ email, password });
      if (ok) {
        nav('/admin/dashboard');
      } else {
        alert(error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      alert('An error occurred during login.');
    } finally {
      setIsSubmitting(false);
    }
  }

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    nav('/admin/dashboard', { replace: true });
    return null;
  }

  return (
    // 1. Full screen container to center the card perfectly
    <div className="min-h-[80vh] w-full flex items-center justify-center px-6">
      
      {/* 2. The Card Surface */}
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-10 rounded-2xl shadow-2xl backdrop-blur-sm">
        
        {/* Header */}
        <h2 className="text-4xl font-serif font-bold mb-10 text-center text-[#b88f42]">
          Admin Login
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-white/90 ml-1" htmlFor="email">
              Email
            </label>
            <input 
              id="email"
              className="w-full bg-transparent border-b border-[#b88f42]/30 focus:border-[#b88f42] focus:ring-0 px-3 py-3 transition-colors outline-none text-white placeholder-slate-600" 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required
              placeholder="admin@poetryhub.com"
            />
          </div>
          
          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-white/90 ml-1" htmlFor="password">
              Password
            </label>
            <input 
              id="password"
              className="w-full bg-transparent border-b border-[#b88f42]/30 focus:border-[#b88f42] focus:ring-0 px-3 py-3 transition-colors outline-none text-white placeholder-slate-600" 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required
              placeholder="••••••••"
            />
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full mt-6 px-6 py-4 rounded-full text-lg font-bold bg-[#b88f42] text-[#1a1f23] shadow-lg shadow-[#b88f42]/20 hover:scale-[1.02] hover:bg-[#d4a753] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? 'Verifying...' : 'Log In'}
          </button>
        </form>
        
        <p className="mt-8 text-center text-xs text-slate-500 uppercase tracking-widest font-medium">
          This portal is for administrators only.
        </p>
      </div>
    </div>
  );
}