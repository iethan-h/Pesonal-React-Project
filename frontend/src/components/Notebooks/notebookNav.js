/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as notebookActions from "../../store/notebook";
import { useDispatch,useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {loadNotebooks,DeleteNotebook} from "../../store/notebook"
import {useEffect,useState} from 'react';
import { useHistory } from "react-router-dom";

const NotebookNav =({id}) => {
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
   //const notebooks=useSelector(state => state.notebookList);
   const notebooks = useSelector(state => state.notebookReducer);
   const [deleteANotebook,setDeleteANotebook] = useState(false);
   const [currentNotebook, setCurrentNotebook] = useState()
   
//    const test = {};
//     if(notebooks !== undefined){
//         Object.values(notebooks).map((notebook) => test[notebook.id]=notebook);       
//     }
//     console.log("@@@@@@",test[2]);



const notebook_id = Object.values(notebooks).forEach( notebook =>console.log("%%%%%",notebook.id))
// console.log("$$$$$$$$$$", notebook_id[0]); 
    
   useEffect(()=>{
       if(deleteANotebook){
           dispatch(DeleteNotebook())
       }
   })
      
   useEffect(() => {
       dispatch(loadNotebooks(id))
   },[dispatch]);
   
   if (sessionUser === undefined) {
    history.push("/");
    return null
}
   
    return(
        <>
        <div>
           
                {notebooks ? Object.values(notebooks).map((notebook) =>
                <>
                 <select>
                    <option value = {notebook.title}>{notebook.title}</option>
                </select>    
                    <div>
                        <button onClick={()=>dispatch(DeleteNotebook(notebook.id))} >Delete Notebook</button>
                    </div>
                
                </>
                ): null}                
            
           
            <button>Edit Notebook</button>           
        </div>
        </>
    )
    
};

export default NotebookNav;