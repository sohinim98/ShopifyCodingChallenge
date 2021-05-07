import React, { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';
import avatar from '../../assets/avatar.png'
import {auth} from '../../firebase';

import './ProfilePage.scss';

const ProfilePage = () => {
  const user = useContext(UserContext);
  const {photoURL, displayName, email} = user;
  return (
    <>
      <div className="profile">
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
