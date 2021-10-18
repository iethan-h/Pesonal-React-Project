import {useDispatch,useSelector} from 'react-redux';
import {useEffect} from 'react';
import {loadAllNotes} from '../../store/note';
import { useHistory } from "react-router-dom";
import style from "./notes.module.css"


const Notes = ({setNoteId,setContent}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const notes = useSelector((state) => Object.keys(state.notesReducer));
    const myNote=useSelector((state) =>state.notesReducer);
    
    
    
    useEffect(() => {
      dispatch(loadAllNotes);
    },[dispatch]);
    
    
    return(
        <>
        <div className={style.message}>  
        {notes.map((note) =>{
            return(
                <>
                {setNoteId(myNote[note].id)}
                {/* {setContent(myNote[note].content)} */}
                
                
                </>
            )
        }
        
        )}
            <h1>Learning starts now!{notes.id}</h1>
        </div>
        </>
    )
    
}
export default Notes