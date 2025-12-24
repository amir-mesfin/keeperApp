import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, Trash2, Edit3, Shield, ExternalLink, Copy, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = 'http://localhost:5000/api/records';

const Dashboard = () => {
    const [records, setRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [showPassword, setShowPassword] = useState({});
    const [formData, setFormData] = useState({
        appName: '',
        username: '',
        password: '',
        notes: '',
        category: 'General'
    });

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const res = await axios.get(API_URL);
            setRecords(res.data);
        } catch (err) {
            toast.error('Failed to fetch records');
        }
    };

    const handleOpenModal = (record = null) => {
        if (record) {
            setEditingRecord(record);
            setFormData({ ...record });
        } else {
            setEditingRecord(null);
            setFormData({ appName: '', username: '', password: '', notes: '', category: 'General' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingRecord) {
                await axios.put(`${API_URL}/${editingRecord._id}`, formData);
                toast.success('Record updated');
            } else {
                await axios.post(API_URL, formData);
                toast.success('Record added');
            }
            setIsModalOpen(false);
            fetchRecords();
        } catch (err) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                toast.success('Record deleted');
                fetchRecords();
            } catch (err) {
                toast.error('Deletion failed');
            }
        }
    };

    const togglePassword = (id) => {
        setShowPassword(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard');
    };

    const filteredRecords = records.filter(r =>
        r.appName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto p-6 lg:p-12 min-h-screen">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-blue-400 font-black uppercase tracking-[0.3em] text-xs">
                        <Shield size={16} strokeWidth={3} />
                        <span>Security Command Center</span>
                    </div>
                    <h2 className="text-6xl font-black text-white tracking-tighter">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Vault</span></h2>
                    <p className="text-slate-400 text-lg font-medium max-w-md leading-relaxed">Your encrypted sensitive data, secured with state-of-the-art zero-knowledge architecture.</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOpenModal()}
                    className="flex items-center justify-center gap-3 bg-white text-slate-950 font-black py-4 px-8 rounded-[24px] transition-all duration-300 shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] active:scale-95 group"
                >
                    <Plus size={24} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-500" />
                    <span>Generate New Entry</span>
                </motion.button>
            </motion.div>

            {/* Search Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative mb-12 group"
            >
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={24} />
                <input
                    type="text"
                    placeholder="Search through your encrypted database..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-900/40 backdrop-blur-xl border border-white/5 text-white pl-16 pr-6 py-6 rounded-[30px] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all placeholder:text-slate-600 font-medium text-lg shadow-2xl"
                />
            </motion.div>

            {/* Records Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence mode="popLayout">
                    {filteredRecords.map((record, index) => (
                        <motion.div
                            key={record._id}
                            layout
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.05,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-8 rounded-[32px] hover:border-blue-500/30 transition-all group relative overflow-hidden shadow-2xl"
                        >
                            {/* Card Accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[40px] rounded-full group-hover:bg-blue-500/10 transition-colors"></div>

                            <div className="flex items-start justify-between mb-8 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="bg-gradient-to-br from-blue-500/20 to-indigo-600/20 p-4 rounded-2xl text-blue-400 shadow-xl border border-white/5">
                                        <Shield size={28} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-xl text-white group-hover:text-blue-400 transition-colors tracking-tight">{record.appName}</h3>
                                        <span className="text-[10px] font-black px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 uppercase tracking-widest border border-blue-500/20">{record.category}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                    <button onClick={() => handleOpenModal(record)} className="p-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                                        <Edit3 size={20} />
                                    </button>
                                    <button onClick={() => handleDelete(record._id)} className="p-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-6 relative z-10">
                                <div className="bg-slate-950/60 backdrop-blur-md p-6 rounded-2xl space-y-4 border border-white/5 shadow-inner">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Identifer</span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-base font-bold text-white tracking-tight">{record.username}</span>
                                            <button onClick={() => copyToClipboard(record.username)} className="text-slate-600 hover:text-blue-400 transition-colors">
                                                <Copy size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="h-px bg-white/5"></div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Secure Key</span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg font-mono text-white tracking-[0.3em] font-black">
                                                {showPassword[record._id] ? record.password : '••••••••'}
                                            </span>
                                            <div className="flex gap-2">
                                                <button onClick={() => togglePassword(record._id)} className="p-1.5 text-slate-600 hover:text-blue-400 transition-colors bg-white/5 rounded-lg">
                                                    {showPassword[record._id] ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </button>
                                                <button onClick={() => copyToClipboard(record.password)} className="p-1.5 text-slate-600 hover:text-blue-400 transition-colors bg-white/5 rounded-lg">
                                                    <Copy size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {record.notes && (
                                    <div className="flex gap-2 items-start px-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                                        <p className="text-sm text-slate-400 font-medium leading-relaxed line-clamp-2 italic">"{record.notes}"</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Modal - Ultra Glassmorphism */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
                            onClick={() => setIsModalOpen(false)}
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-slate-900 border border-white/10 w-full max-w-xl rounded-[40px] relative z-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-50"></div>
                            <form onSubmit={handleSubmit} className="p-10 md:p-14">
                                <h3 className="text-4xl font-black text-white mb-10 tracking-tighter">{editingRecord ? 'Update Entry' : 'Create Entry'}</h3>
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Application Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.appName}
                                                onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
                                                className="w-full bg-slate-950/50 border border-white/5 text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all font-bold"
                                                placeholder="Service name..."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Classification</label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full bg-slate-950/50 border border-white/5 text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all font-bold appearance-none cursor-pointer"
                                            >
                                                <option className="bg-slate-900">General</option>
                                                <option className="bg-slate-900">Social</option>
                                                <option className="bg-slate-900">Work</option>
                                                <option className="bg-slate-900">Banking</option>
                                                <option className="bg-slate-900">Streaming</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Identity Signature (Username)</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            className="w-full bg-slate-950/50 border border-white/5 text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Secure Key (Password)</label>
                                        <input
                                            type="password"
                                            required
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full bg-slate-950/50 border border-white/5 text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Auxiliary Intel (Notes)</label>
                                        <textarea
                                            rows="3"
                                            value={formData.notes}
                                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                            className="w-full bg-slate-950/50 border border-white/5 text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all font-bold resize-none"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="flex gap-6 mt-14">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-black py-5 rounded-[20px] transition-all border border-white/5"
                                    >
                                        Dismiss
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-[20px] shadow-2xl shadow-blue-900/40 transition-all active:scale-95"
                                    >
                                        {editingRecord ? 'Commit Changes' : 'Initialize Entry'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
