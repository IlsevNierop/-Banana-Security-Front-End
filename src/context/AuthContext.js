import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {checkTokenValidity} from "../helper/checkTokenValidity";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [authData, setAuthData] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken && checkTokenValidity(storedToken)) {
            void login(storedToken);
        } else {
            void logout();
        }

    }, [])

    async function fetchUserData(userid, token) {
        try {
            const {data: {email, id, username}} = await axios.get(`http://localhost:3000/600/users/${userid}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            setAuthData({
                ...authData,
                isAuth: true,
                user: {
                    email: email,
                    username: username,
                    id: id,
                },
                status: "done",
            });
        } catch (e) {
            console.error("Er gaat iets mis met het ophalen van de data", e);
        }
    }


    function login(jwt_token, redirect) {

        const decodedToken = jwt_decode(jwt_token)
        localStorage.setItem('token', jwt_token);

        void fetchUserData(decodedToken.sub, jwt_token);

        console.log("Gebruiker is ingelogd!");
        if (redirect) navigate(redirect);
    }

    function logout() {
        localStorage.removeItem('token');
        setAuthData({
            ...authData,
            isAuth: false,
            user: null,
            status: "done",
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
            {authData.status === "done"? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;