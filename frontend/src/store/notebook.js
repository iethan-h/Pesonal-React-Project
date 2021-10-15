/* eslint-disable no-unused-vars */
import { csrfFetch } from "./csrf";
const LOAD_NOTEBOOK = "notebooks/load";
const CREATE_NOTEBOOK = "notebooks/add";
const EDIT_NOTEBOOK = "notebooks/update";
const DELETE_NOTEBOOK = "notebooks/remove";

//Actions
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

export const deleteNotebook = (notebook_id) => {
  return {
    type: DELETE_NOTEBOOK,
    notebook_id,
  };
};

export const editNotebook = (notebookId) => {
  return {
    type: EDIT_NOTEBOOK,
    notebookId,
  };
};

//Thunks
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

  const data = await response.json();
  dispatch(addNotebook(data));
  return response;
}

export const DeleteNotebook = (notebook_id) => async(dispatch) => {

    const  response = await csrfFetch(`/api/notebook/${notebook_id}`,{
      method:"DELETE",
      header:{"Content-Type":"application/json"}      
    })
    if (response.ok){
      const notebook_id = await response.json();
      dispatch(deleteNotebook(notebook_id));
    }
  };

export const loadNotebooks = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/notebooks/${id}`);
  const notebooks = await res.json();
  dispatch(loadNotebook(notebooks));
  return res;
};

export const EditNotebook = (payload,id) => async (dispatch) => {
  const response = await csrfFetch(`/api/notebooks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const notebook = await response.json();
    dispatch(editNotebook(notebook));
  }
};



const initialState = {};

//Reducer for Notebook

const notebookReducer = (state = initialState, action) => {
  switch (action.type) {

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
      
    case CREATE_NOTEBOOK:{
        return {
            ...state,
            [action.notebook.id]: action.notebook
    }
  }
  
    case EDIT_NOTEBOOK:{
      return {
        ...state,
        [action.notebook.id]: action.notebook,
      };
    }
    
      case DELETE_NOTEBOOK:{
        const newState = { ...state };
        delete newState[action.id];
        return newState;     
    }
    
    default:
      return state;
    
  }
};

export default notebookReducer;