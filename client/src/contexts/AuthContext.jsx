import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({id: null});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    useEffect(() => {
        const id = localStorage.getItem('id');
        if(id) {
            auth.id = id
        } else {
            auth.id = null;
        }
    }, [])
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;