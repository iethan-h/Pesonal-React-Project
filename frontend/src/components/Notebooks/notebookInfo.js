/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect,useState} from 'react';
import { useDispatch,useSelector } from "react-redux";
import {DeleteNotebook} from "../../store/notebook"
import { useParams } from 'react-router-dom';
import {loadNotebook, EditNotebook} from "../../store/notebook"
import {loadAllNotes} from "../../store/note"
import style from "./notebooks.module.css"
import Notes from "../Notes"
import { UpdateNote } from '../../store/note';
import { Modal } from "../../context/Modal";
import  EditMyNotebook  from './editNotebook';
import { useHistory } from "react-router-dom";



const NotebookInfo = ({id}) => {
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const[content,setContent]=useState("");
    const {notebook_id} = useParams();
    const dispatch = useDispatch();
    // const currentNotebook = useSelector((state) => state.notebookReducer.currentNotebook);
    // const notes = useSelector((state) => Object.keys(state.notesReducer));
    const myNote=useSelector((state) =>state.notesReducer);
    const newMyNote = Object.values(myNote)[0];    
    const[noteId,setNoteId]=useState(0);
    const[oldText,setOldText]=useState(newMyNote?.content);
    const[newText,setNewText]=useState("");
    const[title,setTitle] = useState("");
    
    
    
    useEffect(() => {
        dispatch(loadNotebook(id,notebook_id))
        dispatch(loadAllNotes(notebook_id))
    },[dispatch])
    
   const handleSaveNote= (e) =>{
       e.preventDefault();
       const contents = {
           id: newMyNote?.id,
           user_id: newMyNote?.user_id,
           notebook_id: newMyNote?.notebook_id,
           content: newText,
       }
       dispatch(
           UpdateNote(contents,newMyNote?.notebook_id)
       )
}
const handleEditNotebook = (e) =>{
    e.preventDefault();
    const payload ={
        title
    }
    dispatch(EditNotebook(payload,notebook_id))
}  
const handleDelete = (e) => {
    history.push("/home")
    dispatch(DeleteNotebook(notebook_id))
}
    return (
        <>
        <div className={style.optionsDiv}>  
            <p>You have a few options... </p>   
            <button 
            className={style.notebookOptions}
            onClick={handleDelete} >Delete Notebook</button> 
            <button
            className={style.notebookOptions}
                onClick={() => setShowModal(true)}>
                Edit Notebook
            </button>
            {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditMyNotebook />
          </Modal>
        )}
        </div>
        <div>

        <div className={style.notesDiv}>
            <form onSubmit={handleSaveNote}>
                <textarea 
                onChange={(e) => setNewText(e.target.value)}
                defaultValue={oldText} 
                className={style.notes} 
                />
                <div className={style.submit}>
                 <button type="submit" >Save Note</button>
                 </div>
             </form>
        </div>
        </div>
        </>
    )
}
export default NotebookInfo;