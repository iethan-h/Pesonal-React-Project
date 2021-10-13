import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import style from './Navigation.module.css';
import SignupModal from '../SignupFormPage'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
     
      <ProfileButton user={sessionUser} />
      
    );
  } else {
    sessionLinks = (
      <>
          <LoginFormModal />
          <SignupModal />     
      </>
    );
  }

  return (
    <div className="top">
      <ul>
        <li className={style.nav}>
          <NavLink exact to="/">Home</NavLink>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
 
  );
}

export default Navigation;