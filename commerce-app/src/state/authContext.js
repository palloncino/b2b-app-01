import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        // Implement your login logic here
        // Set user state if login is successful
        console.log('login attempt 120382347');
    };

    const logout = () => {
        // Clear user state and any stored tokens
        console.log('logout attempt 120382347');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
