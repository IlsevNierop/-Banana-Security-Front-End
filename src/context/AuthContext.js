import React, {createContext, useState} from 'react';
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState(false);

    const navigate = useNavigate();

    console.log(isAuth);

    function login() {
        toggleIsAuth(true);
        console.log("Gebruiker is ingelogd!");
        navigate("/profile");
    }

    function logout() {
        toggleIsAuth(false);
        console.log("Gebruiker is uitgelogd!");
        navigate("/");
    }

    const data = {isAuth, login, logout}


    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;