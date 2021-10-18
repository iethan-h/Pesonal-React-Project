import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import style from "./Navigation.module.css";


const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector((state) => state.session.user);
  
    let sessionLinks;
    if (sessionUser) {
      sessionLinks = (
        <>
          <ProfileButton className={style.ProfileButton} user={sessionUser} />         
        </>
      );
    } else {
      sessionLinks = (
        <div>
          <span className={style.loginModal}>
            <LoginFormModal />
          </span>
        </div>
      );
    }
    return (
      <nav className={style.container}>
        <NavLink activeClassName={style.activeNav} exact to="/">
        </NavLink>
        {isLoaded && sessionLinks}
      </nav>
    );
  };
  export default Navigation;
  