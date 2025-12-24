import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, Fingerprint, LogIn, Sparkles, Shield } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(username, password);
            toast.success('Access Granted. Welcome back.');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.details || err.response?.data?.message || 'Unauthorized Access');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden px-4">
            {/* Ultra-Premium Background Elements */}
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[160px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[160px] rounded-full animate-pulse opacity-70" style={{ animationDelay: '1s' }}></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[480px] z-10"
            >
                <div className="bg-slate-900/30 backdrop-blur-[40px] border border-white/5 rounded-[48px] p-8 md:p-14 shadow-[0_32px_120px_-15px_rgba(0,0,0,0.6)] overflow-hidden relative group">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 opacity-40"></div>

                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-blue-600/20 text-blue-400 mb-8 border border-white/10 shadow-inner"
                        >
                            <Fingerprint size={40} strokeWidth={1.5} />
                        </motion.div>
                        <h1 className="text-5xl font-black text-white mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">Access Key</h1>
                        <p className="text-slate-400 text-lg font-medium">Verify credentials to unlock vault items.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="group/input relative">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2 mb-3 block group-focus-within/input:text-blue-400 transition-all">Identity Signature</label>
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
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2 mb-3 block group-focus-within/input:text-blue-400 transition-all">Encrypted Password</label>
                            <div className="relative">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-blue-400 transition-all" size={20} strokeWidth={1.5} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-950/40 border border-white/5 text-white pl-14 pr-6 py-5 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all placeholder:text-slate-700 font-medium text-lg"
                                    placeholder="Enter secure password"
                                    required
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ y: -4, scale: 1.01, boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.5)" }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-[length:200%_auto] hover:bg-[right_center] text-white font-black py-6 rounded-[24px] transition-all duration-700 flex items-center justify-center gap-3 shadow-2xl shadow-indigo-900/40 group/btn border border-white/10 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span className="text-lg tracking-wide">Authenticate</span>
                                    <LogIn size={24} className="group-hover/btn:translate-x-2 transition-transform duration-500" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-12 pt-10 border-t border-white/5 text-center">
                        <p className="text-slate-500 font-bold">
                            Missing from the network?{' '}
                            <Link to="/register" className="text-white hover:text-blue-400 font-black ml-2 transition-all">
                                Initialize Account <ArrowRight size={16} className="inline ml-1" />
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="text-center mt-10">
                    <p className="text-slate-600 text-xs font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3">
                        <Shield size={14} /> Zero Knowledge Architecture <Shield size={14} />
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
