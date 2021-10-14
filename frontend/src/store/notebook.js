/* eslint-disable no-unused-vars */
import { csrfFetch } from "./csrf";
const LOAD_NOTEBOOKS = "notebook/load";
const CREATE_NOTEBOOK = "notebook/add";
const EDIT_NOTEBOOK = "notebook/update";
const DELETE_NOTEBOOK = "notebook/remove";


const loadNotebook = (notebook) => {
  return {
    type: LOAD_NOTEBOOKS,
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

//Edit a notebook

const editNotebook = (notebookId) => {
  return {
    type: EDIT_NOTEBOOK,
    notebookId,
  };
};

//Delete a notebook.

const deleteNotebook = (notebookId) => {
  return {
    type: DELETE_NOTEBOOK,
    notebookId,
  };
};

//Load notebooks

export const loadNotebooks = () => async (dispatch) => {
  const res = await csrfFetch("/api/notebooks");
  const notebooks = await res.json();
  dispatch(loadNotebook(notebooks));
  return res;
};


const initialState = {};

//Reducer for Notebook

const notebookReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NOTEBOOKS: {
      const notebookList = {};
      action.notebooks.forEach((notebook) => {
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