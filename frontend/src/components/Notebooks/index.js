/* eslint-disable no-unused-vars */
import style from './notebooks.module.css';
import React, { useState ,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import NewNotebook from "./newNotebook"
import * as notebookActions from "../../store/notebook";
import NotebookNav from "./notebookNav";

const Notebook = () => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    
    return(
        <>
    <div>
        
      <div>
      </div>
      <div>       
          <button
            onClick={() => setShowModal(true)}>New Notebook</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <NewNotebook />
          </Modal>
        )}
      </div>
      <NotebookNav />
      <div>
        {/* TODO: Map through the notebooks and display them in the dropdown */}
        
      </div>
    </div>   
            
        </>
    )
}

export default Notebook;