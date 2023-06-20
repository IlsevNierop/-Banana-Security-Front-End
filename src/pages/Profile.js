import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

function Profile() {

    const [privateContent, setPrivateContent ] = useState({});
    const {user: {email, username}} = useContext(AuthContext);

    const token = localStorage.getItem('token');

    const controller = new AbortController();

    useEffect(() => {
        async function fetchPrivateContent() {
            try {
                const response = await axios.get("http://localhost:3000/660/private-content", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    signal: controller.signal,
                });
                setPrivateContent(response.data);
            } catch (e) {
                console.log(e);
            }
        }

        void fetchPrivateContent();

        return function cleanup() {
            console.log("cleanup profile aangeroepen")
            controller.abort();
        }

    }, [])


    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikersnaam:</strong> {username} </p>
                <p><strong>Email:</strong> {email}</p>
            </section>
            <section>
                <h2>{privateContent.title}</h2>
                <p>{privateContent.content}</p>
            </section>
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Profile;