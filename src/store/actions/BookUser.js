import * as ActionTypes from './ActionTypes';
import firebase from '../../fire';

export const issueBookStart = (isbn) => (
    { type: ActionTypes.ISSUE_BOOK_START, isbn: isbn })

export const issueBookSuccess = (book) => (
    { type: ActionTypes.ISSUE_BOOK_SUCCESS, book: book })

export const issueBookFail = (error) => (
    { type: ActionTypes.ISSUE_BOOK_FAIL, error: error })

export const issueBook = (book, availableBooks) => {
    return (dispatch) => {
        dispatch(issueBookStart(book.isbn));
        console.log(availableBooks);
        const ref = firebase.database().ref('/issuedBooks/' + localStorage.userId);
        console.log(ref)
        const ref1 = firebase.database().ref('/books/' + book.isbn + '/available');
        ref.child(book.isbn).set(book).then(() => {
            console.log(ref1)
            ref1.set(availableBooks - 1).then(() => {
                console.log("issueBookSuccess")
                dispatch(issueBookSuccess(book))
            }).catch(error => {
                console.log("issueBookFail1");
                dispatch(issueBookFail(error.message));
            });
        })
            .catch(error => {
                console.log("issueBookFail2");                
                dispatch(issueBookFail(error.message));
            });
        console.log(availableBooks);
    };
};

export const returnBookStart = (isbn) => {
    return {
        type: ActionTypes.RETURN_BOOK_START,
        isbn: isbn
    }
};

export const returnBookSuccess = (book) => {
    return {
        type: ActionTypes.RETURN_BOOK_SUCCESS,
        book: book
    }
};

export const returnBookFail = (error) => {
    return {
        type: ActionTypes.RETURN_BOOK_FAIL,
        error: error
    }
};

export const returnBook = (book, availableBooks) => {
    return (dispatch) => {
        dispatch(returnBookStart(book.isbn));
        const ref = firebase.database().ref('/issuedBooks/' + localStorage.userId);
        const ref1 = firebase.database().ref('/books/' + book.isbn + '/available');
        ref.child(book.isbn).remove().then(() => {
            ref1.set(availableBooks + 1).then(() => {
                dispatch(returnBookSuccess(book))
            });
        })
            .catch(error => {
                dispatch(returnBookFail(error.message));
            });
    };
};

export const renewBookStart = (isbn) => {
    return {
        type: ActionTypes.RENEW_BOOK_START,
        isbn: isbn
    }
};

export const renewBookSuccess = (book) => {
    return {
        type: ActionTypes.RENEW_BOOK_SUCCESS,
        book: book
    }
};

export const renewBookFail = (error) => {
    return {
        type: ActionTypes.RENEW_BOOK_FAIL,
        error: error
    }
};

export const renewBook = book => (dispatch) => {
    dispatch(renewBookStart(book.isbn));
    const ref = firebase.database().ref('/issuedBooks/' + localStorage.userId);
    ref.child(book.isbn).set(book).then(() => {
        dispatch(renewBookSuccess(book))
    })
        .catch(error => {
            dispatch(renewBookFail(error.message));
        });
};


export const updateBookReviewStart = () => {
    return {
        type: ActionTypes.UPDATE_BOOK_REVIEW_START,
    }
}

export const updateBookReviewSuccess = (review, isbn) => {
    return {
        type: ActionTypes.UPDATE_BOOK_REVIEW_SUCCESS,
        review: review,
        isbn: isbn
    }
}

export const updateBookReviewFail = error => {
    return {
        type: ActionTypes.UPDATE_BOOK_REVIEW_FAIL,
        error: error
    }
}

export const updateBookReview = (review, isbn) => {
    console.log(isbn);
    return (dispatch) => {
        dispatch(updateBookReviewStart());
        const ref = firebase.database().ref('/books');
        ref.child(isbn).child("reviews").child(localStorage.userId).set(review).then(() => {
            console.log("succuss");
            dispatch(updateBookReviewSuccess(review, isbn))
        })
            .catch(error => {
                console.log(err);
                dispatch(updateBookReviewFail(error.message));
            });
    }
}