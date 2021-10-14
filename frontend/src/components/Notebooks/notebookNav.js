import * as notebookActions from "../../store/notebook";
import { useDispatch,useSelector,useState } from "react-redux";
import { NavLink } from "react-router-dom";


const NotebookNav =() => {
   const notebooks=useSelector(state => state.notebookList);
    return(
        <>
        <div>
            {notebooks ? notebooks.map(notebook =>(
                <NavLink to ={`/notebooks`} />
            )): "No Notes yet..."}
            
        </div>
        </>
    )
    
};

export default NotebookNav;