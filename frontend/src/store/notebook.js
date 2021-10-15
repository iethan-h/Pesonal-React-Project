/* eslint-disable no-unused-vars */
import { csrfFetch } from "./csrf";
const LOAD_NOTEBOOK = "notebook/load";
const CREATE_NOTEBOOK = "notebook/add";
const EDIT_NOTEBOOK = "notebook/update";
const DELETE_NOTEBOOK = "notebook/remove";


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

export const CreateNotebook = (title, userId) => async(dispatch) => {
  const response = await csrfFetch("/api/notebook", {
      method:"POST",
      body: JSON.stringify({
          userId,
          title,          
      }),
  });

  const data = await response.json();
  dispatch(addNotebook(data));
  return response;
}
export const DeleteNotebook = (id) => async(dispatch) => {
  console.log("$$$$",id);
    const  response = await csrfFetch(`/api/notebook/${id}`,{
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