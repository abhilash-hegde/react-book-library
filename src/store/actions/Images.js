import * as ActionTypes from './ActionTypes';
import firebase from '../../fire';

export const uploadBookImageStart = () => {
  return {
    type: ActionTypes.UPLOAD_BOOK_IMAGE_START
  }
};

export const uploadBookImageProgress = (progress) => {
  return {
    type: ActionTypes.UPLOAD_BOOK_IMAGE_PROGRESS,
    progress: progress
  }
};

export const uploadBookImageSuccess = (url) => {
  return {
    type: ActionTypes.UPLOAD_BOOK_IMAGE_SUCCESS,
    url: url
  }
};

export const uploadBookImageFail = (error) => {
  return {
    type: ActionTypes.UPLOAD_BOOK_IMAGE_FAIL,
    error: error
  }
};

export const uploadBookImage = (image, isbn) => {
  return (dispatch) => {
    dispatch(uploadBookImageStart());
    const storageRef = firebase.storage().ref("books/" + isbn + ".jpg");
    const task = storageRef.put(image);
    task.on('state_changed',
      function progress(snapshot) {
        const progrs = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        dispatch(uploadBookImageProgress(progrs))
      },
      function error(error) {
        dispatch(uploadBookImageFail(error.message))
      },
      function complete() {
        task.snapshot.ref.getDownloadURL().then(url => {
          dispatch(uploadBookImageSuccess(url))
        }).catch(error => {
          dispatch(uploadBookImageFail(error.message))
        })

      })
  }
}

export const uploadUserImageStart = () => {
  return {
    type: ActionTypes.UPLOAD_USER_IMAGE_START
  }
};

export const uploadUserImageProgress = (progress) => {
  return {
    type: ActionTypes.UPLOAD_USER_IMAGE_PROGRESS,
    progress: progress
  }
};

export const uploadUserImageSuccess = (url) => {
  return {
    type: ActionTypes.UPLOAD_USER_IMAGE_SUCCESS,
    url: url
  }
};

export const uploadUserImageFail = (error) => {
  return {
    type: ActionTypes.UPLOAD_USER_IMAGE_FAIL,
    error: error
  }
};

export const uploadUserImage = (image) => {
  return (dispatch) => {
    dispatch(uploadUserImageStart());

    const storageRef = firebase.storage().ref("users/" + localStorage.userId + ".jpg");
    const task = storageRef.put(image);
    task.on('state_changed',
      function progress(snapshot) {
        const progrs = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        dispatch(uploadUserImageProgress(progrs))
      },
      function error(error) {
        dispatch(uploadUserImageFail(error.message))
      },
      function complete() {
        task.snapshot.ref.getDownloadURL().then(url => {
          dispatch(uploadUserImageSuccess(url))
        }).catch(error => {
          dispatch(uploadUserImageFail(error.message))
        })
      })
  };
};