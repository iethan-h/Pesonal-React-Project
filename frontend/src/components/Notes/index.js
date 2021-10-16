import {useDispatch,useSelector} from 'react-redux';
import {useEffect} from 'react';
import {loadAllNotes} from '../../store/note';
import { useHistory } from "react-router-dom";


const Notes = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const note = useSelector((state) => state.notesReducer);
    console.log("*****",note);
    
    
    useEffect(() => {
       const test = dispatch(loadAllNotes);
       console.log("*****",test);
    },[dispatch]);
    
    
    return(
        <>
        <div>{console.log("TEST", note)}</div>
        
        <h1>Hello from Notes!</h1>
        <div>
        {Object.values(note).map((notes) => (                          
                    <p>{notes[2].content}</p>
        ))}    
        </div>
        </>
    )
    
}
export default Notes