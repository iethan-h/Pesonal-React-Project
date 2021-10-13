/* eslint-disable no-unused-vars */
import style from './notebooks.module.css';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import NewNotebook from "./newNotebook"

const Notebook = () => {
    const [showModal, setShowModal] = useState(false);
   
    return(
        <>
    <div>
        <p>test</p>
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
    </div>   
            
        </>
    )
}

export default Notebook;