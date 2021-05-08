import React, { useContext } from 'react';
import './Application.scss';
import { Router } from '@reach/router';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import { UserContext } from '../../providers/UserProvider';
import PasswordReset from '../PasswordReset/PasswordReset';
import Search from '../Search/Search';
import ProfilePage from "../ProfilePage/ProfilePage";

export const Application = () => {
  const user = useContext(UserContext);
  return (
        user ?
            <section className="main">
                <ProfilePage />
                <div className="main--content">
                    <h1 className="main--header">The Shoppies</h1>
                    <Search />
                </div>
            </section>
      :
        <Router>
          <SignUp path='signUp' />
          <SignIn path='/' />
          <PasswordReset path = 'passwordReset' />
        </Router>

  );
}
export default Application;
