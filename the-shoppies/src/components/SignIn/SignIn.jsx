import React, { useState } from 'react';
import { Link } from '@reach/router';
import { signInWithGoogle } from '../../firebase';
import { auth } from '../../firebase';

import './SignIn.scss';
import logo from '../../assets/shopify-logo.png'

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signInWithEmailAndPasswordHandler = (event,email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch(error => {
    setError(error.message);
      console.error('Error signing in with password and email', error);
    });
  };

      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;

          if(name === 'userEmail') {
              setEmail(value);
          }
          else if(name === 'userPassword'){
            setPassword(value);
          }
      };

  return (
    <div className="sign-in">
      <img className="sign-in--logo" src={logo} alt="Shopify logo" />
      <h1>The Shoppies</h1>
      <h2>Sign In</h2>
      {error !== null && <div className = "sign-in--error">{error}</div>}
      <form>
        <div className="sign-in--option">
          <label htmlFor="userEmail" className="block">
            Email: &nbsp;
          </label>
          <input
            type="email"
            className="sign-in--input"
            name="userEmail"
            value = {email}
            placeholder="E.g: jane.doe@gmail.com"
            id="userEmail"
            onChange = {(event) => onChangeHandler(event)}
          />
        </div>
        <div className="sign-in--option">
          <label htmlFor="userPassword" className="block">
            Password: &nbsp;
          </label>
          <input
            type="password"
            className="sign-in--input"
            name="userPassword"
            value = {password}
            placeholder="Your Password"
            id="userPassword"
            onChange = {(event) => onChangeHandler(event)}
          />
          <button className="sign-in--secondary" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
            Sign in
          </button>
        </div>
      </form>
      <p>or</p>
      <button
        onClick={() => {
          try {
            signInWithGoogle();
          } catch (error) {
            console.error("Error signing in with Google", error);
          }
        }}
        className="sign-in--primary">
        Sign in with Google
      </button>
      <p>
        Don't have an account? &nbsp;
        <Link to="signUp" className="text-blue-500 hover:text-blue-600">
          Sign up here
        </Link> &nbsp;
        <br /> &nbsp;
        <Link to = "passwordReset">
          Forgot Password?
        </Link>
      </p>
    </div>
  );
};
export default SignIn;
