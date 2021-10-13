import React, { useState } from "react";
import { useDispatch} from "react-redux";
import * as sessionActions from "../../store/session";

const NewNotebook = (notebook) => {
    const dispatch = useDispatch();
    //const sessionUser = useSelector((state) => state.session.user);
    
    const [title,setTitle] = useState("");
    const [errors, setErrors] = useState([]);
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if(title.length){
          setErrors([]);
      return dispatch(
          sessionActions.CreateNotebook({title})
        )}
      return setErrors([
        "Pleas title your new notebook.",
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
             <button 
             type="submit" 
             
             >Create</button>
         </div>
        </fieldset>
      </form>
    </div>
    )
}

export default NewNotebook;