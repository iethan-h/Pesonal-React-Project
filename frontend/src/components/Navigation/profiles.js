/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

export const ProfileLinks = () => {
  return (
    <div>
      <NavLink to="/notebooks">
        Notebooks
      </NavLink>
      <NavLink to="/notes">
        Notes
      </NavLink>
    </div>
  );
};

export default ProfileLinks;