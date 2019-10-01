import * as ActionTypes from './ActionTypes';
import Axios from 'axios';
import firebase from '../../fire';

export const addBookStart = book => {
    return {
        type: ActionTypes.ADD_BOOK_START,
        book: book
    }
}

export const addBookSuccess = book => {
    return {
        type: ActionTypes.ADD_BOOK_SUCCESS,
        book: book
    }
}

export const addBookFail = error => {
    return {
        type: ActionTypes.ADD_BOOK_FAIL,
        error: error
    }
}

export const addBook = book => {
    return (dispatch) => {
        dispatch(addBookStart(book));
        const ref = firebase.database().ref('/books');
        ref.child(book.isbn).set(book).then(() => {
            dispatch(addBookSuccess(book))
        })
            .catch(error => {
                dispatch(addBookFail(error.message));
            });
    }
}

export const deleteBookStart = () => {
    return {
        type: ActionTypes.ADD_BOOK_START,
    }
}

export const deleteBookSuccess = () => {
    return {
        type: ActionTypes.ADD_BOOK_SUCCESS,
    }
}

export const deleteBookFail = error => {
    return {
        type: ActionTypes.ADD_BOOK_FAIL,
        error: error
    }
}

export const deleteBook = book => {
    return (dispatch) => {
        dispatch(addBookStart(book));
        const ref = firebase.database().ref('/books');
        ref.child(book.isbn).set(book).then(() => {
            dispatch(addBookSuccess(book))
        })
            .catch(error => {
                dispatch(addBookFail(error.message));
            });
    }
}

export const updateBookStart = book => {
    return {
        type: ActionTypes.UPDATE_BOOK_START,
        book: book
    }
}

export const updateBookSuccess = book => {
    return {
        type: ActionTypes.UPDATE_BOOK_SUCCESS,
        book: book
    }
}

export const updateBookFail = error => {
    return {
        type: ActionTypes.UPDATE_BOOK_FAIL,
        error: error
    }
}

export const updateBook = book => {
    return (dispatch) => {
        dispatch(updateBookStart(book));
        const ref = firebase.database().ref('/books');
        ref.child(book.isbn).set(book).then(() => {
            dispatch(updateBookSuccess(book))
        })
            .catch(error => {
                dispatch(updateBookFail(error.message));
            });
    }
}

export const fetchIsbnStart = () => {
    return {
        type: ActionTypes.FETCH_ISBN_START
    }
};

export const fetchIsbnSuccess = (book) => {
    return {
        type: ActionTypes.FETCH_ISBN_SUCCESS,
        book: book
    }
};

export const fetchIsbnFail = (error) => {
    return {
        type: ActionTypes.FETCH_ISBN_FAIL,
        error: error
    }
};

export const fetchIsbn = (isbn) => {
    return (dispatch) => {
        dispatch(fetchIsbnStart());
        return Axios.get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn)
            .then(response => {
                (response.data.totalItems == 0) ? dispatch(fetchIsbnFail("Invalid ISBN")) : dispatch(fetchIsbnSuccess(response.data.items[0]))
            }).catch(error => {
                dispatch(fetchIsbnFail(error.message))
            });
    }
}