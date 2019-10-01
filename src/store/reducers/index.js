import { combineReducers } from 'redux';
import library from './Book';
import auth from './auth';
import users from './Users';
import images from './Images';
import bookAdmin from "./BookAdmin";
import bookUser from './BookUser';

export default combineReducers({
  library: library,
  auth: auth,
  users: users,
  images: images,
  bookAdmin: bookAdmin,
  bookUser: bookUser,
});