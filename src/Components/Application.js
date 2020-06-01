import React, { useContext } from 'react';
import { Router } from '@reach/router';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ProfilePage from './ProfilePage';
import PasswordReset from './PasswordReset';
import { UserContext } from '../Providers/UserProvider';

function Application() {
  const user = useContext(UserContext);
  return user ? (
    <ProfilePage />
  ) : (
    <Router>
      <SignUp path="signUp" />
      <SignIn path="/" />
      <PasswordReset path="passwordReset" />
    </Router>
  );
}

export default Application;
