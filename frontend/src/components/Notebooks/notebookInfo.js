import {useEffect,useState} from 'react';
import { useDispatch,useSelector } from "react-redux";

const NotebookInfo = () => {
    
    return (
        <div>
            <button>Delete Notebook</button>
            <button>Edit Notebook</button>
            <button>New Note</button>
        </div>
    )
}
export default NotebookInfo;