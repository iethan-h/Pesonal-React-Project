/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect,useState} from 'react';
import { useDispatch,useSelector } from "react-redux";
import {DeleteNotebook} from "../../store/notebook"
import { useParams } from 'react-router-dom';
import {loadNotebook} from "../../store/notebook"
import {loadAllNotes} from "../../store/note"
import style from "./notebooks.module.css"
import Notes from "../Notes"
import { UpdateNote } from '../../store/note';


const NotebookInfo = ({id}) => {
    const[content,setContent]=useState("");
    const {notebook_id} = useParams();
    const dispatch = useDispatch();
    // const currentNotebook = useSelector((state) => state.notebookReducer.currentNotebook);
    const notes = useSelector((state) => Object.keys(state.notesReducer));
    const myNote=useSelector((state) =>state.notesReducer);
    
    const[noteId,setNoteId]=useState(0);
    
    useEffect(() => {
        dispatch(loadNotebook(id,notebook_id))
        dispatch(loadAllNotes(notebook_id))
    },[dispatch])
    
   const handleSave= (e) =>{
       e.preventDefault();
       dispatch(
           UpdateNote(content,noteId)
       )
       
   }
    
    return (
        <>
        <div>
            <button onClick={() =>dispatch(DeleteNotebook(notebook_id))}>Delete Notebook</button>
            <button>Edit Notebook</button>
            <button onClick={handleSave}>Save Note</button>
        </div>
        <div>
            <div>
              <Notes setNoteId={setNoteId} setContent={setContent}/> 
            </div>
        </div>
        </>
    )
}
export default NotebookInfo;