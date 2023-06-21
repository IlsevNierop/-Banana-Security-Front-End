import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import {useForm} from 'react-hook-form';
import axios from "axios";

function SignIn() {
    const {login} = useContext(AuthContext);

    const {register, formState: {errors}, handleSubmit} = useForm();
    const controller = new AbortController();


    useEffect(() => {

        return function cleanup() {
            console.log("cleanup sign in aangeroepen")
            controller.abort();
        }
    }, []);


    const handleFormSubmit = async (data) => {

        try {
            const response = await axios.post("http://localhost:3000/login", {
                email: data.email,
                password: data.password
            }, {signal: controller.signal,});
            login(response.data.accessToken, "/profile");
        } catch (data) {
            console.error("Onjuist email en wachtwoord combinatie", data);
        }
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <label htmlFor="email-field">
                    Email:
                    <input
                        type="text"
                        id="email-field"
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Dit veld is verplicht',
                            },
                            validate: (value) => value.includes('@') || 'Email moet een @ bevatten',
                        })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </label>
                <label htmlFor="password-field">
                    Wachtwoord:
                    <input
                        type="password"
                        id="password-field"
                        {...register("password", {
                            required: {
                                value: true,
                                message: 'Dit veld is verplicht',
                            }
                        })}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </label>

                <button type="submit">Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;