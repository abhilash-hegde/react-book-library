import * as actionTypes from '../actions/ActionTypes';
import { updateObject, removeObject } from '../utility';

const initialState = {
  books: null,
  issuedBooks: null,

  fetch: {
    loading: false,
    error: null,
    success: false
  },

  fetchIssued: {
    loading: false,
    error: null,
    success: false
  },
}

/**
|--------------------------------------------------
| Fetch Books
|--------------------------------------------------
*/

const fetchBooksStart = state => updateObject(state,
  { fetch: { loading: true, error: null, success: false } });

const fetchBooksSuccess = (state, action) => {
  return updateObject(state,
    { fetch: { success: true, loading: false, error: null }, books: action.books });
}

const fetchBooksFail = (state, action) => updateObject(state,
  { fetch: { success: false, loading: false, error: action.error } });

/**
|--------------------------------------------------
| Fetch Issued Books
|--------------------------------------------------
*/

const fetchIssuedBooksStart = state => updateObject(state,
  { fetchIssued: { loading: true, error: null, success: false } });

const fetchIssuedBooksSuccess = (state, action) => updateObject(state,
  { fetchIssued: { success: true, loading: false, error: null }, issuedBooks: action.books });

const fetchIssuedBooksFail = (state, action) => updateObject(state,
  { fetchIssued: { success: false, loading: false, error: action.error } });



const issueBookSuccess = (state, action) => {
  const isbn = action.book.isbn;
  const updatedBooks = updateObject(state.books[isbn], { available: state.books[isbn].available - 1 });
  return updateObject(state, {
    books: updateObject(state.books, { [isbn]: updatedBooks }),
    issuedBooks: updateObject(state.issuedBooks, { [isbn]: action.book }),
  });
}

const renewBookSuccess = (state, action) => updateObject(state, {
  issuedBooks: updateObject(state.issuedBooks, { [action.book.isbn]: action.book }),
})

const returnBookSuccess = (state, action) => {
  const isbn = action.book.isbn;
  const updatedBooks = updateObject(state.books[isbn], { available: state.books[isbn].available + 1 });
  return updateObject(state, {
    books: updateObject(state.books, { [isbn]: updatedBooks }),
    issuedBooks: removeObject(state.issuedBooks, isbn),
  });
}

const updateBookReviewSuccess = (state, action) => updateObject(state, {
  books: updateObject(state.books, {
    [action.isbn]: updateObject(state.books[action.isbn], {
      reviews: updateObject(state.books[action.isbn].reviews, {
        [localStorage.userId]: action.review
      }),
    }),
  }),
});

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.FETCH_BOOKS_START: return fetchBooksStart(state);
     case actionTypes.FETCH_BOOKS_SUCCESS: return fetchBooksSuccess(state, action);
    case actionTypes.FETCH_BOOKS_FAIL: return fetchBooksFail(state, action);

    case actionTypes.FETCH_ISSUEDBOOKS_START: return fetchIssuedBooksStart(state);
    case actionTypes.FETCH_ISSUEDBOOKS_SUCCESS: return fetchIssuedBooksSuccess(state, action);
    case actionTypes.FETCH_ISSUEDBOOKS_FAIL: return fetchIssuedBooksFail(state, action);

    case actionTypes.ISSUE_BOOK_SUCCESS: return issueBookSuccess(state, action);
    case actionTypes.RENEW_BOOK_SUCCESS: return renewBookSuccess(state, action);
    case actionTypes.RETURN_BOOK_SUCCESS: return returnBookSuccess(state, action);
    case actionTypes.UPDATE_BOOK_REVIEW_SUCCESS: return updateBookReviewSuccess(state, action);

    default: return state;
  }
};

export default reducer;