import * as actionTypes from '../actions/ActionTypes';
import { updateObject } from '../utility';

const initialState = {
    issue: {
        loading: false,
        error: null,
        isbn: null,
        success: false
    },

    return: {
        loading: false,
        error: null,
        isbn: null,
        success: false
    },

    renew: {
        loading: false,
        error: null,
        isbn: null,
        success: false
    },

    updateReview: {
        success: false,
        error: null,
        loading: false
    }
}

/**
|--------------------------------------------------
| Issue Book
|--------------------------------------------------
*/

const issueBookStart = (state, action) => updateObject(state,
    { issue: { loading: true, error: null, success: false, isbn: action.isbn } });

const issueBookSuccess = state => updateObject(state,
    { issue: { loading: false, error: null, success: true, isbn: null } });

const issueBookFail = (state, action) => updateObject(state,
    { issue: { loading: false, error: action.error, success: false, isbn: null } });

/**
|--------------------------------------------------
| Renew Book
|--------------------------------------------------
*/

const renewBookStart = (state, action) => updateObject(state,
    { renew: { loading: true, error: null, success: false, isbn: action.isbn } });

const renewBookSuccess = state => updateObject(state,
    { renew: { loading: false, error: null, success: true, isbn: null } });

const renewBookFail = (state, action) => updateObject(state,
    { renew: { loading: false, error: action.error, success: false, isbn: null } });

/**
|--------------------------------------------------
| Return Book
|--------------------------------------------------
*/

const returnBookStart = (state, action) => updateObject(state,
    { return: { loading: true, error: null, success: false, isbn: action.isbn } });

const returnBookSuccess = state => updateObject(state,
    { return: { loading: false, error: null, success: true, isbn: null } });

const returnBookFail = (state, action) => updateObject(state,
    { return: { loading: false, error: action.error, success: false, isbn: null } });

/**
|--------------------------------------------------
| Add/Update Review
|--------------------------------------------------
*/

const updateBookReviewStart = state => updateObject(state,
    { updateReview: { loading: true, error: null, success: false } });

const updateBookReviewSuccess = state => updateObject(state,
    { updateReview: { success: true, loading: false, error: null } });

const updateBookReviewFail = (state, action) => updateObject(state,
    { updateReview: { success: false, loading: false, error: action.error } });


const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ISSUE_BOOK_START: return issueBookStart(state, action);
        case actionTypes.ISSUE_BOOK_SUCCESS: return issueBookSuccess(state);
        case actionTypes.ISSUE_BOOK_FAIL: return issueBookFail(state, action);

        case actionTypes.RENEW_BOOK_START: return renewBookStart(state, action);
        case actionTypes.RENEW_BOOK_SUCCESS: return renewBookSuccess(state);
        case actionTypes.RENEW_BOOK_FAIL: return renewBookFail(state, action);

        case actionTypes.RETURN_BOOK_START: return returnBookStart(state, action);
        case actionTypes.RETURN_BOOK_SUCCESS: return returnBookSuccess(state);
        case actionTypes.RETURN_BOOK_FAIL: return returnBookFail(state, action);

        case actionTypes.UPDATE_BOOK_REVIEW_START: return updateBookReviewStart(state);
        case actionTypes.UPDATE_BOOK_REVIEW_SUCCESS: return updateBookReviewSuccess(state);
        case actionTypes.UPDATE_BOOK_REVIEW_FAIL: return updateBookReviewFail(state, action);

        default: return state;
    }
};

export default reducer;