/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as notebookActions from "../../store/notebook";
import { useDispatch,useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {loadNotebooks,DeleteNotebook} from "../../store/notebook"
import {useEffect,useState} from 'react';

const NotebookNav =({id}) => {
    const dispatch = useDispatch();
   //const notebooks=useSelector(state => state.notebookList);
   const notebooks = useSelector(state => state.notebookReducer);
   const [deleteANotebook,setDeleteANotebook] = useState(false);
   const [currentNotebook, setCurrentNotebook] = useState()
   
   const test = {};
    if(notebooks !== undefined){
        Object.values(notebooks).map((notebook) => test[notebook.id]=notebook);       
    }
    console.log(test[5]);
    
   
   useEffect((notebooks)=>{
       if(deleteANotebook){
           dispatch(DeleteNotebook())
       }
   })
    
    
   useEffect(() => {
       dispatch(loadNotebooks(id))
   },[dispatch]);
   
    return(
        <>
        <div>
            <select>
                {notebooks ? Object.values(notebooks).map((notebook) =>
                <option value = {notebook.title}>{notebook.title}</option>
                ): null}                
            </select>
            <button onClick={()=>dispatch(DeleteNotebook(test.id))} >Delete Notebook</button>
            <button>Edit Notebook</button>           
        </div>
        </>
    )
    
};

export default NotebookNav;