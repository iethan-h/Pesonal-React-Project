/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as notebookActions from "../../store/notebook";
import { useDispatch,useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {loadNotebooks} from "../../store/notebook"
import {useEffect,useState} from 'react';

const NotebookNav =({id}) => {
    const dispatch = useDispatch();
   //const notebooks=useSelector(state => state.notebookList);
   const notebooks = useSelector(state => state.notebookReducer);
   
   const deleteNotebook = useSelector(state => state.notebook)
   
  
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
            <button>Delete Notebook</button>
            <button>Edit Notebook</button>           
        </div>
        </>
    )
    
};

export default NotebookNav;