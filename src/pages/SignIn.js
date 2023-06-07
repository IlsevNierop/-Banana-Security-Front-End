import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import { useForm } from 'react-hook-form';

function SignIn() {
    const {login} = useContext(AuthContext);

    const {register, formState: { errors }, handleSubmit} = useForm();

    function handleFormSubmit(data){
        console.log(data.email);
        login(data.email);

    }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

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

        <button>Inloggen</button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;