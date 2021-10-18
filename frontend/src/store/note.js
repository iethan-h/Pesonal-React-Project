/* eslint-disable no-unused-vars */
import { csrfFetch } from "./csrf";
const LOAD_NOTES = "note/load";
const LOAD_NOTE = "note/load"
const CREATE_NOTE = "note/add";
const UPDATE_NOTE = "note/update";
const DELETE_NOTE = "note/remove";

//Actions
const loadNotes = (notes) => {
  return {
    type: LOAD_NOTES,
    notes,
  };
};

const loadNote = (note) => {
  return {
    type: LOAD_NOTE,
    note,
  };
};

const createNote = (note) => {
  return {
    type: CREATE_NOTE,
    note,
  };
};

const update = (updatedNote) => {
  return {
    type: UPDATE_NOTE,
    updatedNote,
  };
};

const deleteNote = (noteId) => {
  return {
    type: DELETE_NOTE,
    noteId,
  };
};

//Thunks

export const CreateNote = ( user_id,content) => async(dispatch) => { 
  const response = await csrfFetch("/api/note/", {
      method:"POST",
      header:{"Content-Type":"application/json"},  
      body: JSON.stringify({    
          user_id,      
          content   
      }),
  });
  const data = await response.json();
  dispatch(createNote(data));
  console.log("$$$$$$",data);
  return response;
}


export const loadAllNotes = (notebook_id) => async (dispatch) => {
  const response = await csrfFetch(`/api/note/${notebook_id}`);
  const notes = await response.json();
  console.log("IN LOAD A NOTE CREATOR",notes);
  dispatch(loadNotes(notes));
  return response;
};

export const loadANote = (notebook_id) => async (dispatch) => {
  const response = await csrfFetch(`/api/${notebook_id}`);
  const notes = await response.json();
  
  dispatch(loadNote(notes));
  return response;
};

export const deleteANote = () => async (dispatch) => {
  const response = await csrfFetch("/api/note",{
    method:"DELETE",
    header:{"Content-Type":"application/json"} 
  })
  if(response.ok){
      const note_id = await response.json();
      dispatch(deleteNote(note_id));  
  }
}

export const UpdateNote = (payload,notebook_id) => async (dispatch) => {
  const response = await csrfFetch(`/api/note/${notebook_id}`,{
    method:"PUT",

    header:{"Content-Type":"application/json"} ,
    body:JSON.stringify(payload)
  });
  const updatedNote = await response.json();
  console.log("UPDATED NOTE",updatedNote[1]);
  if(response.ok){
      
      dispatch(update(updatedNote[1]));  
  }
}

const initialState = {};
const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case LOAD_NOTES: {
      // const notebookNotes = {};
      // action.notes.forEach((note) => {
      //   notebookNotes[note.id] = note;
      // });
      // return {
      //   ...state,
      //   ...notebookNotes,
      // };
      const newState = {...state};
    
      //newState.currentNote=action.note  
      newState[action?.notes[0]?.id] = action?.notes[0];
    console.log("LOAD NOTE NEW STATE",newState);
      return newState
    }
    case LOAD_NOTE:{
      const newState = {...state};
    
      //newState.currentNote=action.note  
      newState[action.note.id] = action.note;
    console.log("LOAD NOTE NEW STATE",newState);
    console.log("NEW DATA ADDED TO STATE",newState[action.note.id] );
      return newState
    }
    
    case CREATE_NOTE: {
      return {
        ...state,
        [action.note.id]: action.note
      }
    }
    case UPDATE_NOTE:{
      console.log("STATE",{
        ...state,
        [action.updatedNote.id]: action.updatedNote,
      })
      return {
        ...state,
        [action.updatedNote.id]: action.updatedNote,
      };
    }
    case DELETE_NOTE: {
      const newState = { ...state };
        delete newState[action.id];
        return newState; 
    }
    default:
      return state;
  }
};

export default notesReducer;
