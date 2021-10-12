/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from "react";
import { useDispatch,useSelector} from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/home-page";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/home">
          {!sessionUser }
          <Home>Home</Home>
        </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
      <div id='line'>
       <hr></hr>   
        <div className="footer">                   
          <h3>How to contact me: </h3>
            <div className="links">
              <a id='github' href='https://github.com/iethan-h/Ulti-Notes.git' target="_blank">GitHub</a>
              <a id='linkedin' href='https://linkedin.com/in/ethan-harwell-895587193' target="_blank">LinkedIn</a>
            </div>
        </div>
        </div>
    </>
  );
}

export default App;