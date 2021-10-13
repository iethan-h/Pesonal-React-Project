import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

const NewNotebook = () => {
    const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
    
    const [title,setTitle] = useState("");
    const [errors, setErrors] = useState([]);
  
    if (sessionUser) return <Redirect to="/" />;
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if(!title){
          setErrors([]);
      }
      
      return setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }

    return(
        <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Make a new Notebook</legend>
          <div>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
         <div>
             <input
             type="text"
             value={title}
             onChange={(e) => setTitle(e.target.value)}
             />
         </div>
         <div>
             <button type="submit">Create</button>
         </div>
        </fieldset>
      </form>
    </div>
    )
}

export default NewNotebook;