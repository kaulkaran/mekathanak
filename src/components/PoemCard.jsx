import React from 'react';

// Environment variable for image loading base URL
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export default function PoemCard({ poem, onOpen }) {
    const imgSrc = poem.imageFileId ? `${API_BASE}/uploads/${poem.imageFileId}` : null;
    const bodySnippet = poem.body ? poem.body.slice(0, 120) : '';

    return (
        <div 
            onClick={onOpen}
            className="group cursor-pointer bg-white/5 border border-white/10 p-8 rounded-xl hover:border-[#b88f42]/40 transition-all hover:-translate-y-2 h-full flex flex-col"
        >
            <div className="aspect-square w-full rounded-lg mb-6 overflow-hidden bg-slate-800 relative">
                {imgSrc ? (
                    <img 
                        src={imgSrc} 
                        alt={poem.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                ) : (
                    <div className="w-full h-full bg-[#15191e] flex items-center justify-center">
                        <span className="text-[#b88f42] opacity-20 text-4xl font-serif italic">Ph.</span>
                    </div>
                )}
            </div>

            <h3 className="font-serif text-2xl font-bold mb-2 text-[#e6e6e6] group-hover:text-[#b88f42] transition-colors">
                {poem.title}
            </h3>
            
            <p className="text-[#b88f42]/80 text-sm font-medium mb-4 italic">
                by {poem.author}
            </p>
            
            <p className="text-slate-400 font-light leading-relaxed line-clamp-3" style={{ whiteSpace: 'pre-wrap' }}>
                {bodySnippet}...
            </p>
        </div>
    );
}