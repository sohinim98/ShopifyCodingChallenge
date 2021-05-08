import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../providers/UserProvider';
import avatar from '../../assets/avatar.png'
import {auth} from '../../firebase';
import DarkModeToggle from 'react-dark-mode-toggle';

import './ProfilePage.scss';
import clsx from "clsx";

const ProfilePage = (props) => {
  const user = useContext(UserContext);
  const {photoURL, displayName, email} = user;
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
      setDarkMode(props.darkMode);
    }, [props.darkMode]);

  return (
    <>
      <div className={clsx("profile", darkMode && 'profile--dark-mode')}>
          <DarkModeToggle
              onChange={() => props.setDarkMode(!props.darkMode)}
              checked={darkMode}
              className="profile--toggle"
              size={50}
          />
          <img
            className="profile--avatar"
            alt="user avatar"
            src={photoURL ? photoURL : avatar }
          />
        <div className="profile--content">
          <h2>{displayName}</h2>
          <h3>{email}</h3>
          <button className="profile--sign-out" onClick = {() => {auth.signOut()}}>Sign out</button>
        </div>
      </div>
    </>
  )
};
export default ProfilePage;
