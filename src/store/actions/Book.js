import * as ActionTypes from './ActionTypes';
import Axios from 'axios';

export const fetchAllBooksStart = () => {
  return {
    type: ActionTypes.FETCH_BOOKS_START
  }
};

export const fetchAllBooksSuccess = (books) => {
  return {
    type: ActionTypes.FETCH_BOOKS_SUCCESS,
    books: books
  }
};

export const fetchAllBooksFail = (error) => {
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
        dispatch(fetchAllBooksSuccess(response.data))
      })
      .catch(error => {
        dispatch(fetchAllBooksFail(error.message))
      });
  };
};

export const fetchIssuedBooksStart = () => {
  return {
    type: ActionTypes.FETCH_ISSUEDBOOKS_START
  }
};

export const fetchIssuedBooksSuccess = (books) => {
  return {
    type: ActionTypes.FETCH_ISSUEDBOOKS_SUCCESS,
    books: books
  }
};

export const fetchIssuedBooksFail = (error) => {
  return {
    type: ActionTypes.FETCH_ISSUEDBOOKS_FAIL,
    error: error
  }
};

export const fetchIssuedBooks = (userId) => {
  return (dispatch) => {
    dispatch(fetchIssuedBooksStart());
    return Axios.get(`${process.env.DB_URL}/issuedBooks/${userId}.json`)
      .then(response => {
        dispatch(fetchIssuedBooksSuccess(response.data))
      })
      .catch(error => {
        dispatch(fetchIssuedBooksFail(error.message));
      });
  };
};