import {useEffect} from 'react';
import { useDispatch,useSelector } from "react-redux";
import {DeleteNotebook} from "../../store/notebook"
import { useParams } from 'react-router-dom';
import {loadNotebook} from "../../store/notebook"

const NotebookInfo = ({id}) => {
    const {notebook_id} = useParams();
    const dispatch = useDispatch();
    const currentNotebook = useSelector((state) => state.notebookReducer.currentNotebook);
    // const sessionUser = useSelector((state) => state.session.user);
    
    useEffect(() => {
        dispatch(loadNotebook(id,notebook_id))
    },[dispatch])
    
    console.log("*****",notebook_id)
    
    return (
        <div>
            {/* <button onClick={() =>dispatch(DeleteNotebook(notebook_id))}>Delete Notebook</button> */}
            <button>Edit Notebook</button>
            <button>New Note</button>
        </div>
    )
}
export default NotebookInfo;