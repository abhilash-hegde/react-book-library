import * as actionTypes from '../actions/ActionTypes';
import { updateObject } from '../utility';

const initialState = {

  add: {
    loading: false,
    error: null,
    success: false
  },

  update: {
    loading: false,
    error: null,
    success: false
  },

  delete: {
    loading: false,
    error: null,
    success: false
  },

  fetchGoogleApi: {
    books: null,
    loading: false,
    error: null,
    success: false
  },
}

/**
|--------------------------------------------------
| Add Book
|--------------------------------------------------
*/

const addBookStart = state => updateObject(state,
  { add: { loading: true, error: null, success: false } });

const addBookSuccess = state => updateObject(state,
  { add: { loading: false, error: null, success: true } });

const addBookFail = (state, action) => updateObject(state,
  { add: { loading: false, error: action.error, success: false } });

/**
|--------------------------------------------------
| Update Book
|--------------------------------------------------
*/

const updateBookStart = state => updateObject(state,
  { update: { loading: true, error: null, success: false } });

const updateBookSuccess = state => updateObject(state,
  { update: { loading: false, error: null, success: true } });

const updateBookFail = (state, action) => updateObject(state,
  { update: { loading: false, error: action.error, success: false } });

/**
|--------------------------------------------------
| Delete Book
|--------------------------------------------------
*/
// TODO

// const deleteBookStart = (state, action) => deleteObject(state,
//   { delete: { loading: true, error: null, success: false } });

// const deleteBookSuccess = (state, action) => deleteObject(state,
//   { delete: { loading: false, error: null, success: true } });

// const deleteBookFail = (state, action) => deleteObject(state,
//   { delete: { loading: false, error: action.error, success: false } });

/**
|--------------------------------------------------
| Fetch Book from Google API
|--------------------------------------------------
*/

const fetchIsbnStart = state => updateObject(state,
  { fetchGoogleApi: { loading: true, error: null, success: false, books: null } });

const fetchIsbnSuccess = (state, action) => updateObject(state,
  { fetchGoogleApi: { loading: false, error: null, success: true, books: action.book } });

const fetchIsbnFail = (state, action) => updateObject(state,
  { fetchGoogleApi: { loading: false, error: action.error, success: false, books: null } });


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_BOOK_START: return addBookStart(state);
    case actionTypes.ADD_BOOK_SUCCESS: return addBookSuccess(state);
    case actionTypes.ADD_BOOK_FAIL: return addBookFail(state, action);

    case actionTypes.UPDATE_BOOK_START: return updateBookStart(state);
    case actionTypes.UPDATE_BOOK_SUCCESS: return updateBookSuccess(state);
    case actionTypes.UPDATE_BOOK_FAIL: return updateBookFail(state, action);

    case actionTypes.FETCH_ISBN_START: return fetchIsbnStart(state);
    case actionTypes.FETCH_ISBN_SUCCESS: return fetchIsbnSuccess(state, action);
    case actionTypes.FETCH_ISBN_FAIL: return fetchIsbnFail(state, action);


    default: return state;
  }
};

export default reducer;