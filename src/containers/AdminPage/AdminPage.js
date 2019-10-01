import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from '../../components/UI/Header/';
import Sidebar from '../../components/UI/Sidebar/';
import Breadcrumb from '../../components/UI/Breadcrumb';
import Footer from '../../components/UI/Footer/';
import Books from './Books/Books';
import Profile from '../../containers/Profile/Profile';
import Logout from '../../containers/Auth/Logout';
import Users from './Users/Users';
import BooksIssued from './BooksIssued/BooksIssued';
import EditBook from './EditBook/EditBook';
import AddBook from './AddBook/AddBook';
import { infoNotification } from '../../components/UI/Message/Message';

const AdminPage = props => {
  useEffect(() => {
    infoNotification("You have logged in as 'admin'");
  }, [])
  return (
    <div className="app">
      <Header isAdmin />
      <div className="app-body">
        <Sidebar {...props} isAdmin />
        <main className="main">
          <Breadcrumb />
          <Container fluid>
            <Switch>
              <Route path="/admin/books" name="Books" component={Books} />
              <Route path="/admin/addBook" name="AddBook" component={AddBook} />
              <Route path="/admin/booksIssued/:userId" name="BooksIssued" component={BooksIssued} />
              <Route path="/admin/editBook/:isbn" name="EditBook" component={EditBook} />
              <Route path="/admin/users" name="Users" component={Users} />
              <Route path="/admin/profile" name="Profile" component={Profile} />
              <Redirect exact from="/admin/" to="/admin/books" />
            </Switch>
          </Container>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AdminPage;
