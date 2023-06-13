import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

function SignUp() {
    const {register, formState: { errors }, handleSubmit} = useForm();
    const {login} = useContext(AuthContext);

    async function handleFormSubmit(data){
        try {
            const response = await axios.post("http://localhost:3000/register", {email: data.email, password: data.password, username: data.username});
            // hierboven mag ook email, password (ipv email: email etc) omdat de waarde die je doorgeeft dezelfde naam heeft.

            console.log(response);
            login(response.data.accessToken);
        } catch (data) {
            console.error("Registratie mislukt", data);
            //eindopdraacht ook een error doen in de UI, zodat de melding ook voor gebruiker zichtbaar is.
        }
    }

  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
              <label htmlFor="username-field">
                  Gebruikersnaam:
                  <input
                      type="text"
                      id="username-field"
                      {...register("username", {
                          required: {
                              value: true,
                              message: 'Dit veld is verplicht',
                          },
                      })}
                  />
                  {errors.username && <p>{errors.username.message}</p>}
              </label>

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
              <button
                  type="submit"
              >
                  Verzenden
              </button>
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;