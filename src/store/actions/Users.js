import * as actionTypes from './ActionTypes';
import firebase from '../../fire';
import axios from 'axios';
import * as actions from './';

export const createUserStart = () => ({
    type: actionTypes.CREATE_USER_START
})

export const createUserSuccess = (user) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    user: user
})

export const createUserFail = (error) => ({
    type: actionTypes.CREATE_USER_FAIL,
    error: error
})

export const createUser = (user, expiresIn) => (dispatch) => {
    dispatch(createUserStart());
    const ref = firebase.database().ref('/users');
    ref.child(localStorage.userId).set(user).then(() => {
        dispatch(createUserSuccess(user));
        dispatch(actions.authSuccess(localStorage.token, localStorage.userId));
        dispatch(actions.checkAuthTimeout(expiresIn))
    })
        .catch(error => {
            dispatch(createUserFail(error.message));
        });
};

export const fetchUsersStart = () => ({
    type: actionTypes.FETCH_USERS_START
})

export const fetchUsersSuccess = (users) => ({
    type: actionTypes.FETCH_USERS_SUCCESS,
    users: users
})

export const fetchUsersFail = (error) => ({
    type: actionTypes.FETCH_USERS_FAIL,
    error: error
})

export const fetchUsers = () => (dispatch) => {
    dispatch(fetchUsersStart());
    return axios.get(`${process.env.DB_URL}/users.json`)
        .then(response => {
            dispatch(fetchUsersSuccess(response.data))
        })
        .catch(error => {
            dispatch(fetchUsersFail(error.message));
        });
};

export const updateUserStart = () => ({
    type: actionTypes.UPDATE_USER_START
})

export const updateUserSuccess = (user) => ({
    type: actionTypes.UPDATE_USER_SUCCESS,
    user: user
})

export const updateUserFail = (error) => ({
    type: actionTypes.UPDATE_USER_FAIL,
    error: error
})

export const updateUser = (user) => (dispatch) => {
    dispatch(updateUserStart());
    const ref = firebase.database().ref('/users');
    ref.child(localStorage.userId).set(user).then(() => {
        dispatch(updateUserSuccess(user))
    })
        .catch(error => {
            dispatch(updateUserFail(error.message));
        });
};