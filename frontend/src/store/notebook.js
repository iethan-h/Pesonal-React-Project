/* eslint-disable no-unused-vars */
import { csrfFetch } from "./csrf";
const LOAD_NOTEBOOK = "notebooks/load";
const CREATE_NOTEBOOK = "notebooks/add";
const EDIT_NOTEBOOK = "notebooks/update";
const DELETE_NOTEBOOK = "notebooks/remove";


export const loadNotebook = (notebook) => {
  return {
    type: LOAD_NOTEBOOK,
    notebook,
  };
};

export const addNotebook = (notebook) =>{
  return {
    type:CREATE_NOTEBOOK,
    notebook,
  }
}

export const CreateNotebook = (title, user_id) => async(dispatch) => {
  console.log("####")
  const response = await csrfFetch("/api/notebooks", {
      method:"POST",
      header:{"Content-Type":"application/json"},  
      body: JSON.stringify({
          title,
          user_id,         
      }),
  });
console.log("$$$$$",response);
  const data = await response.json();
  dispatch(addNotebook(data));
  return response;
}


export const DeleteNotebook = (notebook_id) => async(dispatch) => {
  console.log("$$$$",notebook_id);
    const  response = await csrfFetch(`/api/notebook/${notebook_id}`,{
      method:"DELETE",
      header:{"Content-Type":"application/json"}      
    })
    return response;
  }
//Edit a notebook

export const editNotebook = (notebookId) => {
  return {
    type: EDIT_NOTEBOOK,
    notebookId,
  };
};

//Delete a notebook.

export const deleteNotebook = (notebookId) => {
  return {
    type: DELETE_NOTEBOOK,
    notebookId,
  };
};

//Load notebooks

export const loadNotebooks = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/notebooks/${id}`);
  const notebooks = await res.json();
  dispatch(loadNotebook(notebooks));
  return res;
};


const initialState = {};

//Reducer for Notebook

const notebookReducer = (state = initialState, action) => {
  switch (action.type) {
    
      case DELETE_NOTEBOOK:{
        const newState = { ...state };
        delete newState[action.itemId];
        return newState;
      
    }
    
    
    case LOAD_NOTEBOOK: {
      const notebookList = {};
      action.notebook.forEach((notebook) => {
        notebookList[notebook.id] = notebook;
      });
      return {
        ...state,
        ...notebookList,
      };
    }
    default:
      return state;
      
      case CREATE_NOTEBOOK:
        return {
            ...state,
            [action.notebook.id]: action.notebook
        }
        
    
  }
};

export default notebookReducer;