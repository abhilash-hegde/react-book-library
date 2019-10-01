import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from '../../components/UI/Header/';
import Sidebar from '../../components/UI/Sidebar/';
import Breadcrumb from '../../components/UI/Breadcrumb/';
import Footer from '../../components/UI/Footer/';
import Books from './Books/Books';
import IssuedBooks from './IssuedBooks/IssuedBooks';
import BookDetails from './BookDetails/BookDetails';
import Profile from '../../containers/Profile/Profile';
import { infoNotification } from '../../components/UI/Message/Message';

const UserPage = props => {
  useEffect(() => {
    infoNotification("You have logged in as 'user'");
  }, [])
  return (
    <div className="app">
      <Header isAdmin={false} />
      <div className="app-body">
        <Sidebar {...props} isAdmin={false} />
        <main className="main">
          <Breadcrumb />
          <Container fluid>
            <Switch>
              <Route path="/user/books" name="Books" component={Books} />
              <Route path="/user/myBooks" name="My Books" component={IssuedBooks} />
              <Route path="/user/bookDetails/:isbn" name="My Books" component={BookDetails} />
              <Route path="/user/profile" name="Profile" component={Profile} />
              <Redirect exact from="/user/" to="/user/books" />
              <Redirect from="*" to="/404" />
            </Switch>
          </Container>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default UserPage;
