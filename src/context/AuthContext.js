import React, {createContext, useState} from 'react';
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [authData, setAuthData] = useState({isAuth: false, user: ''});

    const navigate = useNavigate();

    console.log(authData);

    function login(email) {
        setAuthData({isAuth: true, user:`${email}`});
        console.log("Gebruiker is ingelogd!");
        navigate("/profile");
    }

    function logout() {
        setAuthData({isAuth: false, user:''});
        console.log("Gebruiker is uitgelogd!");
        navigate("/");
    }

    const data = {
        isAuth: authData.isAuth,
        user: authData.user,
        login,
        logout}


    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;