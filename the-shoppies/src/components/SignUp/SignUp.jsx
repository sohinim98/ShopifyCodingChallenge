import React, { useState } from 'react';
import { Link } from '@reach/router';
import { auth, signInWithGoogle, generateUserDocument } from '../../firebase';

import './SignUp.scss';
import logo from '../../assets/shopify-logo.png'

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, {displayName});
    }
    catch(error){
      setError(error.message);
    }

    setEmail('');
    setPassword('');
    setDisplayName('');
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    } else if (name === 'userPassword') {
      setPassword(value);
    } else if (name === 'displayName') {
      setDisplayName(value);
    }
  };

  return (
    <div className="sign-up">
      <img className="sign-up--logo" src={logo} alt="Shopify logo" />
      <h1>Sign Up</h1>
        {error !== null && (
        <div className="sign-up--error">
          {error}
        </div>
      )}
      <form>
        <div className="sign-up--option">
          <label htmlFor="displayName" className="block">
            Display Name: &nbsp;
          </label>
          <input
            type="text"
            className="sign-up--input"
            name="displayName"
            value={displayName}
            placeholder="E.g: Jane"
            id="displayName"
            onChange={event => onChangeHandler(event)}
          />
        </div>
        <div className="sign-up--option">
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            className="sign-up--input"
            name="userEmail"
            value={email}
            placeholder="E.g: jane.doe@gmail.com"
            id="userEmail"
            onChange={event => onChangeHandler(event)}
          />
        </div>
        <div className="sign-up--option">
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            className="sign-up--input"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          <button
            className="sign-up--secondary"
            onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign up
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
        className="sign-up--primary"
      >
        Sign In with Google
      </button>
      <p className="text-center my-3">
        Already have an account?{" "}
        <Link to="/" className="text-blue-500 hover:text-blue-600">
          Sign in here
        </Link>{" "}
      </p>
    </div>
  );
};

export default SignUp
