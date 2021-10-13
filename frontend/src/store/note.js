import { csrfFetch } from "./csrf";
const LOAD_NOTES = "note/load";
const CREATE_NOTE = "note/add";
const UPDATE_NOTE = "note/update";
const DELETE_NOTE = "note/remove";

const loadNote = (notes) => {
  return {
    type: LOAD_NOTES,
    notes,
  };
};

const createNote = (note) => {
  return {
    type: CREATE_NOTE,
    note,
  };
};

const update = (noteId) => {
  return {
    type: UPDATE_NOTE,
    noteId,
  };
};

const deleteNote = (noteId) => {
  return {
    type: DELETE_NOTE,
    noteId,
  };
};

export const loadNotes = () => async (dispatch) => {
  const response = await csrfFetch("/api/notes");
  const notes = await response.json();
  dispatch(loadNote(notes));
  return response;
};

const initialState = {};
const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NOTES: {
      const notebookNotes = {};
      action.notes.forEach((note) => {
        notebookNotes[note.id] = note;
      });
      return {
        ...state,
        ...notebookNotes,
      };
    }
    default:
      return state;
  }
};

export default notesReducer;
