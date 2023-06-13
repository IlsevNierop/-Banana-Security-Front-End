import React, {createContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [authData, setAuthData] = useState({
        isAuth: false,
        user: null,
    });

    const navigate = useNavigate();

    async function fetchUserData(id, token) {
        try {
            const response = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            setAuthData({
                ...authData,
                isAuth: true,
                user: {
                    email: response.data.email,
                    username: response.data.username,
                    id: response.data.id,
                },
            });
        } catch (e) {
            console.error("Er gaat iets mis met het ophalen van de data", e);
        }
    }


    function login(jwt_token) {

        const decodedToken = jwt_decode(jwt_token)
        localStorage.setItem('token', jwt_token);

        void fetchUserData(decodedToken.sub, jwt_token);

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