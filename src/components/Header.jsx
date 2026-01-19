import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';

export default function Header() {
  const nav = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  async function handleLogout() {
    try {
      await logout();
      nav('/admin/login');
    } catch (err) {
      console.warn(err);
      nav('/admin/login');
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#b88f42]/10 bg-[#1a1f23]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex h-20 items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 text-[#b88f42]">
          <div className="size-6">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-tight italic font-serif">PoetryHub</h2>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          <Link to="/" className="text-sm font-medium text-[#e6e6e6] hover:text-[#b88f42] transition-colors">Home</Link>
          <Link to="/poems" className="text-sm font-medium text-[#e6e6e6] hover:text-[#b88f42] transition-colors">Featured</Link>
          <a href="/#vision" className="text-sm font-medium text-[#e6e6e6] hover:text-[#b88f42] transition-colors">Vision</a>
          <a href="/#contact" className="text-sm font-medium text-[#e6e6e6] hover:text-[#b88f42] transition-colors">Contact</a>
        </nav>

        {/* Auth / Mobile Toggle */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-4">
               <span className="text-sm text-[#b88f42] italic">{user?.username}</span>
               <button onClick={handleLogout} className="text-sm font-bold text-[#b88f42] hover:text-white transition-colors">Logout</button>
            </div>
          ) : (
             <Link to="/admin/login" className="hidden md:flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-10 px-6 border border-[#b88f42]/50 hover:bg-[#b88f42] hover:text-[#1a1f23] transition-all text-[#b88f42] text-sm font-bold">
               Admin Login
             </Link>
          )}

          <button 
            className="md:hidden text-[#b88f42]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <IoCloseOutline size={28} /> : <IoMenuOutline size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#1a1f23] border-b border-[#b88f42]/10 p-6 flex flex-col gap-6 shadow-2xl">
          <Link to="/" className="text-lg font-medium text-[#e6e6e6]" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/poems" className="text-lg font-medium text-[#e6e6e6]" onClick={() => setIsMobileMenuOpen(false)}>Featured</Link>
          <a href="/#vision" className="text-lg font-medium text-[#e6e6e6]" onClick={() => setIsMobileMenuOpen(false)}>Vision</a>
          <a href="/#contact" className="text-lg font-medium text-[#e6e6e6]" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
          <div className="border-t border-[#b88f42]/10 pt-4">
            {isAuthenticated ? (
               <button onClick={handleLogout} className="text-[#b88f42] font-bold">Logout</button>
            ) : (
               <Link to="/admin/login" className="text-[#b88f42] font-bold">Admin Login</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}