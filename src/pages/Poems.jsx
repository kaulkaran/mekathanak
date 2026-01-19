import React, { useEffect, useState } from 'react';
import api from '../services/api';
import PoemCard from '../components/PoemCard'; 
import PoemModal from '../components/PoemModal'; 

export default function Poems() {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get('/poems?limit=100&page=1')
      .then(r => setPoems(r.data.poems))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1f23] text-[#e6e6e6] pt-10 pb-20 w-full">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 mb-16 text-center">
         <span className="text-[#b88f42] uppercase tracking-widest text-xs font-bold mb-4 block">The Collection</span>
         <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
            Complete Archive
         </h1>
         <p className="text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
            Wander through the thoughts of others. Click any card to expand the manuscript.
         </p>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6">
        
        {loading && (
          <div className="flex justify-center py-20">
             <div className="animate-pulse text-[#b88f42] font-serif text-xl">Loading library...</div>
          </div>
        )}

        {!loading && poems.length === 0 && (
          <div className="text-center py-20 border border-dashed border-[#b88f42]/20 rounded-xl">
            <p className="text-slate-500">The archive is currently empty.</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {poems.map(p => 
             <PoemCard key={p._id} poem={p} onOpen={() => setSelected(p)} />
          )}
        </div>
      </section>

      {selected && <PoemModal poem={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}