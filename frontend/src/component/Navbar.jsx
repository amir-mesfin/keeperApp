import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Key, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
            <Link to="/" className="flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-lg">
                    <Key className="text-white" size={24} />
                </div>
                <h1 className="text-xl font-bold text-white tracking-tight">KEEPER<span className="text-blue-400">APP</span></h1>
            </Link>

            {user && (
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-slate-300">
                        <User size={18} />
                        <span className="font-medium">{user.username}</span>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 bg-slate-700 hover:bg-red-600/20 hover:text-red-400 text-slate-300 px-4 py-2 rounded-lg transition-all duration-300 group"
                    >
                        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
