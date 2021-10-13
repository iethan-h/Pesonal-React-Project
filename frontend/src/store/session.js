/* eslint-disable no-unused-vars */
import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const MAKE_NOTEBOOK = 'session/setnotebook';
const MAKE_NOTE = 'session/newnote';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const makeNotebook = (notebook) => {
  return {
    type: MAKE_NOTEBOOK,
    notebook
  };
};

const newNote = (note) => {
  return {
    type: MAKE_NOTE,
    note
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case MAKE_NOTEBOOK:
        return {
            ...state,
            [action.notebook.id]: action.notebook
        }
    case MAKE_NOTE:
        return {
            ...state,
            [action.note.id]: action.note
        }
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state
      
         
  }
};

//Thunk Action To Restore session user 
export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};


//Thunk Action For signup
export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};


//Thunk Action for User Logout
export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};


//Thunk Action for Making a new Notebook
export const CreateNotebook = (notebook) => async(dispatch) => {
  const {user_id, title,contents} = notebook;
  const response = await csrfFetch("/api/notebook", {
      method:"POST",
      body: JSON.stringify({
          user_id,
          title,
          contents
      }),
  });
  const data = await response.json();
  dispatch(makeNotebook(data.notebook));
  return response;
}


//Thunk Action for making a new Note
export const writeNote = (note) => async(dispatch) => {
  const {userId, title,contents} = note;
  const response = await csrfFetch("/api/notes", {
      method:"POST",
      body: JSON.stringify({
          userId,
          title,
          contents
      }),
  });
  const data = await response.json();
  dispatch(newNote(data.note));
  return response;
}


export default sessionReducer;