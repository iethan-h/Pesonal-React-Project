import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";



function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  
 

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    history.push('/home');
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };
 
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
            <legend >Log in!</legend>
                <div>
                  <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                  </ul>
                </div>
              <div>
                <label>Username or Email</label>
                  <div>
                    <input
                      type="text"
                      value={credential}
                      onChange={(e) => setCredential(e.target.value)}
                      required
                    />
                  </div>
                </div>
              <div>
                <label>Password</label>
                  <div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  />
                </div>
              </div>
              <div>
            <button type="submit">Log In</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default LoginForm;