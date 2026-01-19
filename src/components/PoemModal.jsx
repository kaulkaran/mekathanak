import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function PoemModal({ poem: initial, onClose }) {
  const [poem, setPoem] = useState(initial);

  useEffect(() => {
    api.get(`/poems/${initial._id}`).then(r => setPoem(r.data.poem)).catch(console.error);
  }, [initial._id]);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-[100] p-4" 
      style={{
        background:'rgba(26, 31, 35, 0.95)', // Matches background-dark with opacity
        backdropFilter: 'blur(8px)'
      }}
      onClick={onClose}
    >
      <div 
        className="bg-[#1a1f23] border border-[#b88f42]/20 rounded-xl md:rounded-2xl p-8 md:p-12 shadow-2xl relative w-full max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-slate-500 hover:text-[#b88f42] transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <header className="mb-10 text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#e6e6e6] leading-tight">
            {poem.title}
          </h2>
          <div className="inline-block border-b-2 border-[#b88f42] pb-1">
             <p className="text-[#b88f42] text-lg italic font-serif">
                by {poem.author}
             </p>
          </div>
        </header>
        
        <div 
          className="text-lg md:text-xl text-slate-300 leading-loose max-w-xl mx-auto font-serif text-center"
          style={{ whiteSpace:'pre-wrap' }}
        >
          {poem.body}
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/5 text-center text-xs text-slate-500 uppercase tracking-widest font-bold">
            PoetryHub Collection • {poem.views || 0} Reads
        </div>
      </div>
    </div>
  );
}