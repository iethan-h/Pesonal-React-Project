import React, { useState} from "react";
import { useDispatch,useSelector} from "react-redux";
import * as notebookActions from "../../store/notebook";



const NewNotebook = (notebook) => {
    const dispatch = useDispatch();
    const userId=useSelector((state)=>state?.session?.user?.id)
    //const [showModal, setShowModal] = useState(false);
    
    const [title,setTitle] = useState("");
    const [errors, setErrors] = useState([]);
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      //setShowModal(false)
      if(title.length){
          setErrors([]);
          
      dispatch(
          notebookActions.CreateNotebook(title, userId)          
        )}else{
          setErrors([
        "Pleas title your new notebook.",
      ]);
        }
       
    };
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
             onClick={handleSubmit}
             
             >Create</button>
         </div>
        </fieldset>
      </form>
    </div>
    )
}

export default NewNotebook;