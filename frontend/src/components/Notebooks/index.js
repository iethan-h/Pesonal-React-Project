/* eslint-disable no-unused-vars */
import style from './notebooks.module.css';
import React, { useState ,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import NewNotebook from "./newNotebook"
import NotebookNav from "./notebookNav";
import { useHistory } from "react-router-dom";



const Notebook = () => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(store => store.session.user);
    
    if (sessionUser === undefined) {
      history.push("/");
      return null
  }
    
    return(
        <>
    <div>
   
      <div className={style.newNotebook}>   
      <p>Make a new notebook</p>    
          <button
            onClick={() => setShowModal(true)}>New Notebook</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <NewNotebook />
          </Modal>
        )}
      </div>
      {user ?
       (<NotebookNav id={user.id} />) : null}
      
      <div>
        
      </div>
    </div>   
            
        </>
    )
}

export default Notebook;