import React, {createContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [authData, setAuthData] = useState({
        isAuth: false,
        user: null,
    });

    const navigate = useNavigate();


    function login(jwt_token) {

        const decodedToken = jwt_decode(jwt_token)
        localStorage.setItem('token', jwt_token);
        console.log(decodedToken.email);

        setAuthData({
            ...authData,
            isAuth: true,
            user: {
                email: decodedToken.email,
                username: decodedToken.username,
                id: decodedToken.sub,
            },
        })
        console.log("Gebruiker is ingelogd!");
        navigate("/profile");
    }

    function logout() {
        localStorage.removeItem('token');
        setAuthData({
            ...authData,
            isAuth: false,
            user: null
        })
        console.log("Gebruiker is uitgelogd!");
        navigate("/");
    }

    const data = {
        isAuth: authData.isAuth,
        user: authData.user,
        login: login,
        logout: logout
    }


    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;