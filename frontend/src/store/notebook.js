import { csrfFetch } from "./csrf";
const LOAD_NOTEBOOKS = "notebook/load";
const CREATE_NOTEBOOK = "notebook/add";
const EDIT_NOTEBOOK = "notebook/update";
const DELETE_NOTEBOOK = "notebook/remove";


const loadNotebook = (notebooks) => {
  return {
    type: LOAD_NOTEBOOKS,
    notebooks,
  };
};

const createNotebook = (notebook) => {
  return {
    type: CREATE_NOTEBOOK,
    notebook,
  };
};

const editNotebook = (notebookId) => {
  return {
    type: EDIT_NOTEBOOK,
    notebookId,
  };
};

const deleteNotebook = (notebookId) => {
  return {
    type: DELETE_NOTEBOOK,
    notebookId,
  };
};

export const loadNotebooks = () => async (dispatch) => {
  const res = await csrfFetch("/api/notebooks");
  const notebooks = await res.json();
  dispatch(loadNotebook(notebooks));
  return res;
};

export const addNotebook = () => async (dispatch) => {
  const response = await csrfFetch("/api/notebooks", {
    method: "POST",
  });
};


const initialState = {};

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
  }
};

export default notebookReducer;