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
     <>
     <img src="https://res.cloudinary.com/dqfmsvodq/image/upload/v1634418182/UltiNotes/Untitled_design_1_yg3rz6.svg" alt="" />
      <NavLink exact to="/home">Home</NavLink>
      <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
      <img src="https://res.cloudinary.com/dqfmsvodq/image/upload/v1634418182/UltiNotes/Untitled_design_1_yg3rz6.svg" alt="" />
          <NavLink exact to="/">Home</NavLink> 
          <NavLink exact to="/demo">Demo</NavLink>
          <LoginFormModal />
          <SignupModal />
            
      </>
    );
  }

  return (
    <div className="top">
      <ul>
        <li className={style.nav}>         
          {isLoaded && sessionLinks}
        </li>
        
      </ul>
    </div>
 
  );
}

export default Navigation;