import React from "react";
import style from "./home.module.css";
import { useHistory } from "react-router-dom";

 

const Home = () => {

  return (
    <div className={style.header} >
      <h1>Welcome to your notes!</h1>
    </div>
  );
};

export default Home;
