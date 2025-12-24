import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, ArrowRight, ShieldCheck, Sparkles, ShieldAlert } from 'lucide-react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await register(username, password);
            toast.success('Account created successfully!');
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.details || err.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden px-4 py-12">
            {/* Ultra-Premium Background Elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[160px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[160px] rounded-full animate-pulse opacity-70" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-600/5 blur-[120px] rounded-full animate-bounce duration-[10s]"></div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[520px] z-10"
            >
                <div className="bg-slate-900/30 backdrop-blur-[32px] border border-white/5 rounded-[48px] p-8 md:p-14 shadow-[0_32px_120px_-15px_rgba(0,0,0,0.5)] overflow-hidden relative group">
                    {/* Animated Mesh Gradient Border Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                    <div className="text-center mb-12 relative">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20 text-blue-400 mb-8 border border-white/10 shadow-2xl"
                        >
                            <ShieldCheck size={40} strokeWidth={1.5} />
                        </motion.div>
                        <h1 className="text-5xl font-black text-white mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">Join the Vault</h1>
                        <p className="text-slate-400 text-lg font-medium">Elevate your digital security standards.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 relative">
                        <div className="group/input relative">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2 mb-3 block group-focus-within/input:text-blue-400 transition-all">Identity / Username</label>
                            <div className="relative">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-blue-400 transition-all" size={20} strokeWidth={1.5} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-slate-950/40 border border-white/5 text-white pl-14 pr-6 py-5 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all placeholder:text-slate-700 font-medium text-lg"
                                    placeholder="Enter username"
                                    required
                                />
                            </div>
                        </div>

                        <div className="group/input relative">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2 mb-3 block group-focus-within/input:text-blue-400 transition-all">Secret / Password</label>
                            <div className="relative">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-blue-400 transition-all" size={20} strokeWidth={1.5} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-950/40 border border-white/5 text-white pl-14 pr-6 py-5 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all placeholder:text-slate-700 font-medium text-lg"
                                    placeholder="Choose strong password"
                                    required
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ y: -4, scale: 1.01, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)" }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] hover:bg-[right_center] text-white font-black py-6 rounded-[24px] transition-all duration-700 flex items-center justify-center gap-3 shadow-2xl shadow-blue-900/40 group/btn border border-white/10 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span className="text-lg">Initialize Account</span>
                                    <ArrowRight size={24} className="group-hover/btn:translate-x-2 transition-transform duration-500" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-12 pt-10 border-t border-white/5 text-center relative">
                        <p className="text-slate-500 font-bold text-base">
                            Returning user?{' '}
                            <Link to="/login" className="text-white hover:text-blue-400 font-black ml-2 transition-all group/link">
                                Sign In <Sparkles size={16} className="inline ml-1 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                            </Link>
                        </p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-center mt-10 space-y-2"
                >
                    <p className="text-slate-600 text-xs font-black uppercase tracking-[0.4em]">Military Grade Encryption Standard</p>
                    <div className="flex justify-center gap-4 text-slate-700">
                        <ShieldAlert size={14} />
                        <ShieldAlert size={14} />
                        <ShieldAlert size={14} />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Register;
