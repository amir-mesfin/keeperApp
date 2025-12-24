import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

axios.defaults.withCredentials = true;
const API_URL = 'http://localhost:5000/api/auth';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(`${API_URL}/me`);
                setUser(res.data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (username, password) => {
        const res = await axios.post(`${API_URL}/login`, { username, password });
        setUser(res.data.user);
        return res.data;
    };

    const register = async (username, password) => {
        try {
            console.log('Sending register request for:', username);
            const res = await axios.post(`${API_URL}/register`, { username, password });
            console.log('Register response:', res.data);
            return res.data;
        } catch (err) {
            console.error('Register error in AuthContext:', err.response?.data || err.message);
            throw err;
        }
    };

    const logout = async () => {
        await axios.post(`${API_URL}/logout`);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
