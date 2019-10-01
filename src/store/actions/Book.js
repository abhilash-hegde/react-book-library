import * as ActionTypes from './ActionTypes';
import Axios from 'axios';
import firebase from '../../fire';

export const fetchAllBooksStart = () => {
  console.log('fetchAllBooksStart');
  return {
    type: ActionTypes.FETCH_BOOKS_START
  }
};

export const fetchAllBooksSuccess = (books) => {
  console.log("fetchAllBooksSuccess");
  return {
    type: ActionTypes.FETCH_BOOKS_SUCCESS,
    books: books
  }
};

export const fetchAllBooksFail = (error) => {
  // console.log(error);
  return {
    type: ActionTypes.FETCH_BOOKS_FAIL,
    error: error
  }
};

export const fetchAllBooks = () => {
  return (dispatch) => {
    dispatch(fetchAllBooksStart());
    return Axios.get(`${process.env.DB_URL}/books.json`)
      .then(response => {
        console.log(response);
        dispatch(fetchAllBooksSuccess(response.data))
      })
      .catch(error => {
        console.log(error);
        dispatch(fetchAllBooksFail(error.message))
      });
  };
};

export const fetchIssuedBooksStart = () => {
  console.log("fetchIssuedBooksStart");
  return {
    type: ActionTypes.FETCH_ISSUEDBOOKS_START
  }
};

export const fetchIssuedBooksSuccess = (books) => {
  console.log("fetchIssuedBooksSuccess");
  return {
    type: ActionTypes.FETCH_ISSUEDBOOKS_SUCCESS,
    books: books
  }
};

export const fetchIssuedBooksFail = (error) => {
  // console.log(error);
  return {
    type: ActionTypes.FETCH_ISSUEDBOOKS_FAIL,
    error: error
  }
};

export const fetchIssuedBooks = (userId) => {
  console.log(userId);
  return (dispatch) => {
    dispatch(fetchIssuedBooksStart());
    return Axios.get(`${process.env.DB_URL}/issuedBooks/${userId}.json`)
      .then(response => {
        console.log(response);
        dispatch(fetchIssuedBooksSuccess(response.data))
      })
      .catch(error => {
        console.log(error.message);
        dispatch(fetchIssuedBooksFail(error.message));
      });
  };
};