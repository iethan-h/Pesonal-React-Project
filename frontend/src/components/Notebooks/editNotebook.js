import React, { useState} from "react";
import { useDispatch,useSelector} from "react-redux";
import { useParams } from 'react-router-dom';
import {EditNotebook} from "../../store/notebook";
const EditMyNotebook = () => {
    //const [errors, setErrors] = useState([]);
    const {notebook_id} = useParams();
    const dispatch = useDispatch();
    const[title,setTitle] = useState("");
    
    
    
    const handleEditNotebook = (e) =>{
        e.preventDefault();       
        const payload ={
            title
        }
        dispatch(EditNotebook(payload,notebook_id))
    }
        
        
        return (
            <div>
            <form onSubmit={handleEditNotebook}>
              <fieldset>
                <legend>Change the Name of your notebook</legend>
                
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
                   onClick={handleEditNotebook}                  
                   >Change</button>
               </div>
              </fieldset>
            </form>
          </div>
        )
};

export default EditMyNotebook;