import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector,useDispatch} from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import style from './Navigation.module.css';
import SignupModal from '../SignupFormPage'
import * as sessionActions from '../../store/session'
import {useHistory} from 'react-router-dom';

function Navigation({ isLoaded }){
  const history=useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  
  const demoUser = async () => {
    history.push("/home")
    return dispatch(sessionActions.login({credential: "Demo-lition", password: 'password'}))
  }

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
          <button onClick={ () => demoUser()} path>Demo</button>
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