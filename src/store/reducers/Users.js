import * as actionTypes from '../actions/ActionTypes';
import { updateObject } from '../utility';

const initialState = {
  users: null,
  fetch: {
    user: null,
    loading: false,
    error: null,
    success: false,
  },
  update: {
    user: null,
    loading: false,
    error: null,
    success: false,
  },
  create: {
    user: null,
    loading: false,
    error: null,
    success: false,
  },
};

/**
|--------------------------------------------------
| Fetch Users
|--------------------------------------------------
*/

const fetchUsersStart = (state, action) => updateObject(state,
  { fetch: { loading: true, error: null, success: false } });

const fetchUsersSuccess = (state, action) => updateObject(state,
  { fetch: { success: true, loading: false, error: null }, users: action.users });

const fetchUsersFail = (state, action) => updateObject(state,
  { fetch: { success: false, loading: false, error: action.error } });

/**
|--------------------------------------------------
| Create User
|--------------------------------------------------
*/

const createUserStart = (state, action) => updateObject(state,
  { create: { loading: true, error: null, success: false } });

const createUserSuccess = (state, action) => updateObject(state, {
  create: { success: true, loading: false, error: null },
  users: updateObject(state.users, { [action.user.userId]: action.user })
});

const createUserFail = (state, action) => updateObject(state,
  { create: { success: false, loading: false, error: action.error } });

/**
|--------------------------------------------------
| Update User
|--------------------------------------------------
*/

const updateUserStart = (state, action) => updateObject(state,
  { update: { loading: true, error: null, success: false } });

const updateUserSuccess = (state, action) => updateObject(state, {
  update: { success: true, loading: false, error: null },
  users: updateObject(state.users, { [action.user.userId]: action.user })
});

const updateUserFail = (state, action) => updateObject(state,
  { update: { success: false, loading: false, error: action.error } });


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_START: return fetchUsersStart(state, action);
    case actionTypes.FETCH_USERS_SUCCESS: return fetchUsersSuccess(state, action);
    case actionTypes.FETCH_USERS_FAIL: return fetchUsersFail(state, action);

    case actionTypes.UPDATE_USER_START: return updateUserStart(state, action);
    case actionTypes.UPDATE_USER_SUCCESS: return updateUserSuccess(state, action);
    case actionTypes.UPDATE_USER_FAIL: return updateUserFail(state, action);

    case actionTypes.CREATE_USER_START: return createUserStart(state, action);
    case actionTypes.CREATE_USER_SUCCESS: return createUserSuccess(state, action);
    case actionTypes.CREATE_USER_FAIL: return createUserFail(state, action);

    default: return state;
  }
};

export default reducer;