import React, { useEffect, useState } from 'react';
import api from '../services/api';
import PoemModal from '../components/PoemModal';
import PoemCard from '../components/PoemCard';
import { motion } from 'framer-motion'; // 1. Import Framer Motion

// Background pattern for Hero
const manuscriptStyle = {
    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(184, 143, 66, 0.05) 1px, transparent 0)',
    backgroundSize: '40px 40px',
};

// --- ANIMATION UTILITIES ---

// 1. Text Animation Component (Splits text into letters)
const StaggeredText = ({ text, className, delay = 0 }) => {
    // Split text into characters, preserving spaces
    const letters = Array.from(text);

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: delay * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20, // Letters slide up
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            style={{ display: "inline-block", overflow: "hidden" }} // Ensures text wraps correctly
            variants={container}
            initial="hidden"
            animate="visible"
            className={className}
        >
            {letters.map((letter, index) => (
                <motion.span variants={child} key={index} style={{ display: "inline-block" }}>
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.div>
    );
};

// 2. Scroll Reveal Component (Fades in elements when scrolled into view)
const RevealOnScroll = ({ children, delay = 0, width = "100%" }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 75 },
                visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }} // Triggers when 100px into view
            transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
            style={{ width }}
        >
            {children}
        </motion.div>
    );
};


export default function Home() {
    const [featured, setFeatured] = useState([]);
    const [selectedPoem, setSelectedPoem] = useState(null);

    // Contact State
    const [contact, setContact] = useState({ name: '', email: '', message: '' });
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        api.get('/featured?limit=3').then(r => setFeatured(r.data.poems)).catch(() => setFeatured([]));
    }, []);

    async function handleContact(e) {
        e.preventDefault();
        setSending(true);
        setStatus(null);
        try {
            await api.post('/contact', contact).catch(() => { });
            setStatus({ ok: true, msg: 'Message sent.' });
            setContact({ name: '', email: '', message: '' });
        } catch (err) {
            setStatus({ ok: false, msg: 'Failed to send.' });
        } finally {
            setSending(false);
        }
    }

    return (
        <div className="bg-[#1a1f23] text-[#e6e6e6] font-sans selection:bg-[#b88f42]/30">

            {/* --- HERO SECTION --- */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-6 w-full" style={manuscriptStyle}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1f23]/20 to-[#1a1f23] pointer-events-none"></div>

                <div className="relative z-10 max-w-4xl text-center space-y-8">
                    {/* Animated Header */}
                    <div className="flex flex-col items-center">
                        <StaggeredText
                            text="PoetryHub —"
                            className="font-serif text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight text-white block mb-2"
                            delay={0.1}
                        />
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 1.5 }} // Fades in smoothly after letters are done
                            className="italic text-[#b88f42] font-serif text-4xl md:text-5xl lg:text-6xl"
                        >
                            where words breathe
                        </motion.span>
                    </div>

                    {/* Subtext Fade In */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2, duration: 0.8 }}
                        className="max-w-2xl mx-auto text-lg md:text-xl font-light text-slate-400 leading-relaxed"
                    >
                        A sanctuary for digital verse, where every syllable finds its home in a distraction-free environment. Rediscover the art of reading.
                    </motion.p>

                    {/* Button Fade In */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2.5, duration: 0.5 }}
                        className="pt-6"
                    >
                        <a href="/poems" className="inline-block bg-[#b88f42] text-[#1a1f23] px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-[#b88f42]/10">
                            Explore Collected Poems
                        </a>
                    </motion.div>
                </div>

                {/* Decorative Blurred Blobs (Floating Animation) */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute -top-24 -left-24 size-96 bg-[#b88f42]/5 blur-[120px] rounded-full"
                ></motion.div>
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-24 -right-24 size-96 bg-[#b88f42]/5 blur-[120px] rounded-full"
                ></motion.div>
            </section>

            {/* --- FEATURED SECTION --- */}
            <section id="featured" className="py-32 w-full">
                <div className="max-w-7xl mx-auto px-6">
                    <RevealOnScroll>
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                            <div className="space-y-4">
                                <span className="text-[#b88f42] font-bold tracking-[0.2em] uppercase text-xs">Curated Selection</span>
                                <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">Featured Poems</h2>
                            </div>
                            <a href="/poems" className="text-[#b88f42] hover:underline flex items-center gap-2 group">
                                View full archive <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featured.length === 0 && <div className="text-slate-500 italic col-span-full">Loading selections...</div>}
                        {featured.map((p, index) => (
                            // Staggered Cards Reveal
                            <RevealOnScroll key={p._id} delay={index * 0.2}>
                                <PoemCard poem={p} onOpen={() => setSelectedPoem(p)} />
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- VISION SECTION --- */}
            <section id="vision" className="bg-white/[0.02] py-32 w-full">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="order-2 lg:order-1">
                        <RevealOnScroll>
                            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8 leading-tight text-white">
                                Our vision for the <span className="italic text-[#b88f42]">digital manuscript</span>
                            </h2>
                            <div className="space-y-6 text-lg text-slate-300 font-light leading-relaxed">
                                <p>We believe that poetry deserves more than a social media feed. It deserves stillness, focus, and a space that respects the weight of every word.</p>
                                <p>PoetryHub was founded on the principle of minimal intervention. Our interface is designed to disappear, leaving only the rhythm of the text and the connection between author and reader.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-8 mt-12 border-t border-[#b88f42]/20 pt-12">
                                <div>
                                    <span className="block text-3xl font-bold text-[#b88f42] mb-1 font-serif">24k+</span>
                                    <span className="text-sm uppercase tracking-widest opacity-60 text-slate-400">Published Verses</span>
                                </div>
                                <div>
                                    <span className="block text-3xl font-bold text-[#b88f42] mb-1 font-serif">180</span>
                                    <span className="text-sm uppercase tracking-widest opacity-60 text-slate-400">Global Authors</span>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                    <div className="order-1 lg:order-2">
                        <RevealOnScroll delay={0.2}>
                            <div className="relative">
                                <motion.div
                                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute inset-0 bg-[#b88f42]/20 blur-3xl rounded-full scale-75"
                                ></motion.div>
                                <img
                                    alt="Vision"
                                    className="relative z-10 rounded-2xl grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl"
                                    src="https://images.unsplash.com/photo-1695544939051-9f28a1f9eb6c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                />
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>

            {/* --- CONTACT SECTION --- */}
            <section id="contact" className="py-32 bg-[#1a1f23] w-full">
                <div className="max-w-3xl mx-auto px-6">
                    <RevealOnScroll>
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="font-serif text-4xl font-bold text-white">Get In Touch</h2>
                            <p className="text-slate-500 font-light">Inquiries for collaborations, readings, or technical support.</p>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.2}>
                        <form onSubmit={handleContact} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest font-bold opacity-60 text-[#b88f42]">Full Name</label>
                                    <input
                                        className="w-full bg-transparent border-b border-[#b88f42]/30 focus:border-[#b88f42] focus:ring-0 px-0 py-3 transition-colors outline-none text-white placeholder-slate-600"
                                        placeholder="John Keats"
                                        value={contact.name}
                                        onChange={e => setContact({ ...contact, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest font-bold opacity-60 text-[#b88f42]">Email Address</label>
                                    <input
                                        className="w-full bg-transparent border-b border-[#b88f42]/30 focus:border-[#b88f42] focus:ring-0 px-0 py-3 transition-colors outline-none text-white placeholder-slate-600"
                                        placeholder="john@keats.com"
                                        type="email"
                                        value={contact.email}
                                        onChange={e => setContact({ ...contact, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest font-bold opacity-60 text-[#b88f42]">Message</label>
                                <textarea
                                    className="w-full bg-transparent border-b border-[#b88f42]/30 focus:border-[#b88f42] focus:ring-0 px-0 py-3 transition-colors outline-none resize-none text-white placeholder-slate-600"
                                    placeholder="The words I seek to share..."
                                    rows="4"
                                    value={contact.message}
                                    onChange={e => setContact({ ...contact, message: e.target.value })}
                                    required
                                ></textarea>
                            </div>
                            <div className="pt-6 text-center">
                                <button
                                    className="bg-[#b88f42] text-[#1a1f23] px-12 py-4 rounded-lg font-bold hover:shadow-lg hover:shadow-[#b88f42]/20 transition-all disabled:opacity-50"
                                    disabled={sending}
                                >
                                    {sending ? 'Sending...' : 'Send Message'}
                                </button>
                                {status && (
                                    <div className={`mt-4 text-sm font-medium ${status.ok ? 'text-green-400' : 'text-red-400'}`}>{status.msg}</div>
                                )}
                            </div>
                        </form>
                    </RevealOnScroll>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="py-20 border-t border-white/5 bg-[#1a1f23] w-full">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-2 text-[#b88f42]">
                        <div className="size-5">
                            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
                            </svg>
                        </div>
                        <span className="font-serif font-bold text-lg">PoetryHub</span>
                    </div>
                    <div className="flex gap-8 text-sm font-medium opacity-60 text-[#e6e6e6]">
                        <a className="hover:text-[#b88f42] transition-colors" href="#">Twitter</a>
                        <a className="hover:text-[#b88f42] transition-colors" href="#">Instagram</a>
                        <a className="hover:text-[#b88f42] transition-colors" href="#">Privacy</a>
                        <a className="hover:text-[#b88f42] transition-colors" href="#">Terms</a>
                    </div>
                    <p className="text-sm opacity-40 font-light text-[#e6e6e6]">© {new Date().getFullYear()} PoetryHub. All verses belong to their respective authors.</p>
                </div>
            </footer>

            {selectedPoem && (
                <PoemModal poem={selectedPoem} onClose={() => setSelectedPoem(null)} />
            )}
        </div>
    );
}