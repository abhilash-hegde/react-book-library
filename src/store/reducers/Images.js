import * as actionTypes from '../actions/ActionTypes';
import { updateObject, removeObject } from '../utility';

const initialState = {
  user: {
    url: null,
    loading: false,
    progress: null,
    error: null
  },
  book: {
    url: null,
    loading: false,
    progress: null,
    error: null
  }
}

/**
|--------------------------------------------------
| Upload image of book
|--------------------------------------------------
*/

const uploadBookImagesStart = (state, action) => updateObject(state,
  { book: { url: null, progress: null, loading: true, error: null } });

const uploadBookImagesProgress = (state, action) => updateObject(state,
  { book: { url: null, progress: action.progress, loading: true, error: null } });

const uploadBookImagesSuccess = (state, action) => updateObject(state,
  { book: { url: action.url, progress: 100, loading: false, error: null } });

const uploadBookImagesFail = (state, action) => updateObject(state,
  { book: { url: null, progress: null, loading: false, error: action.error } });

/**
|--------------------------------------------------
| Upload image of user
|--------------------------------------------------
*/

const uploadUserImageStart = (state, action) => updateObject(state,
  { user: { url: null, progress: null, loading: true, error: null } });

const uploadUserImageProgress = (state, action) => updateObject(state,
  { user: { url: null, progress: action.progress, loading: true, error: null } });

const uploadUserImageSuccess = (state, action) => updateObject(state,
  { user: { url: action.url, progress: 100, loading: false, error: null } });

const uploadUserImageFail = (state, action) => updateObject(state,
  { user: { url: null, progress: null, loading: false, error: action.error } });



const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_BOOK_IMAGE_START: return uploadBookImagesStart(state, action);
    case actionTypes.UPLOAD_BOOK_IMAGE_PROGRESS: return uploadBookImagesProgress(state, action);
    case actionTypes.UPLOAD_BOOK_IMAGE_SUCCESS: return uploadBookImagesSuccess(state, action);
    case actionTypes.UPLOAD_BOOK_IMAGE_FAIL: return uploadBookImagesFail(state, action);

    case actionTypes.UPLOAD_USER_IMAGE_START: return uploadUserImageStart(state, action);
    case actionTypes.UPLOAD_USER_IMAGE_PROGRESS: return uploadUserImageProgress(state, action);
    case actionTypes.UPLOAD_USER_IMAGE_SUCCESS: return uploadUserImageSuccess(state, action);
    case actionTypes.UPLOAD_USER_IMAGE_FAIL: return uploadUserImageFail(state, action);
    default: return state;
  }
};

export default imagesReducer;