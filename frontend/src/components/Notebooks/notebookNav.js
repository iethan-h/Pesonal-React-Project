/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as notebookActions from "../../store/notebook";
import { useDispatch,useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {loadNotebooks,DeleteNotebook} from "../../store/notebook"
import {useEffect,useState} from 'react';
import { useHistory } from "react-router-dom";
import style from "./notebooks.module.css";

const NotebookNav =({id}) => {
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const notebooks = useSelector(state => state.notebookReducer);

   useEffect(() => {
       dispatch(loadNotebooks(id))
   },[dispatch]);
 
   if (sessionUser === undefined) {
    history.push("/");
    return null
}
    return(
        <>
         <div className={style.notebook}>
              <p className={style.selected} >Select a notebook...</p>
            </div>
        <div className={style.notebooks}>                  
                {notebooks ? Object.values(notebooks).map((notebook) =>       
                            
                    <button className={style.notebookButtons}onClick={() =>history.push(`/notebook/${notebook.id}`)}>{notebook.title}</button>
                
                    ): null}         
        </div>
        </>
    )
    
};

export default NotebookNav;