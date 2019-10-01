import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import isEqual from "react-fast-compare";
import { Visible, Row, Col } from 'react-grid-system';
import { Card, CardHeader, CardBody, Table } from 'reactstrap';
import { Message, Icon } from 'semantic-ui-react';
import Aux from '../../../hoc/_Aux/_Aux';
import Book from '../../../components/UserPage/IssuedBook/IssuedBook';
import MBook from '../../../components/UserPage/IssuedBook/mIssuedBook';
import * as actions from '../../../store/actions';
import { successNotification, errorNotification } from '../../../components/UI/Message/Message';

const IssuedBooks = props => {
  const dispatch = useDispatch();

  const [issuedBooks, setIssuedBooks] = useState(null);

  const { fetchIssuedError, fetchIssuedSuccess, fetchIssuedLoading } = useSelector(state => ({
    fetchIssuedError: state.library.fetchIssued.error,
    fetchIssuedSuccess: state.library.fetchIssued.success,
    fetchIssuedLoading: state.library.fetchIssued.loading
  }), shallowEqual);

  const { issueError, issueSuccess, issueLoading, issueIsbn } = useSelector(state => ({
    issueError: state.bookUser.issue.error,
    issueSuccess: state.bookUser.issue.success,
    issueLoading: state.bookUser.issue.loading,
    issueIsbn: state.bookUser.issue.isbn
  }), shallowEqual);

  const { returnError, returnSuccess, returnLoading, returnIsbn } = useSelector(state => ({
    returnError: state.bookUser.return.error,
    returnSuccess: state.bookUser.return.success,
    returnLoading: state.bookUser.return.loading,
    returnIsbn: state.bookUser.return.isbn
  }), shallowEqual);

  const { renewError, renewSuccess, renewLoading, renewIsbn } = useSelector(state => ({
    renewError: state.bookUser.renew.error,
    renewSuccess: state.bookUser.renew.success,
    renewLoading: state.bookUser.renew.loading,
    renewIsbn: state.bookUser.renew.isbn
  }), shallowEqual);

  const libraryIssuedBooks = useSelector(state => state.library.issuedBooks, shallowEqual);

  useEffect(() => {
    dispatch(actions.fetchIssuedBooks(localStorage.userId));
    dispatch(actions.fetchAllBooks());
  }, []);

  useEffect(() => {
    console.log("returnSuccess")
    if (returnSuccess) {
      successNotification("Your book is returned successfully");
    }
  }, [returnSuccess, returnLoading])

  useEffect(() => {
    console.log("returnError")
    if (returnError) {
      errorNotification(returnError);
    }
  }, [returnError, returnLoading])

  useEffect(() => {
    console.log("renewSuccess")
    if (renewSuccess) {
      successNotification("Your book is renewed successfully");
    }
  }, [renewSuccess, renewLoading])

  useEffect(() => {
    console.log("renewError")
    if (renewError) {
      errorNotification(renewError);
    }
  }, [renewError, renewLoading])

  useEffect(() => {
    if (!isEqual(libraryIssuedBooks, issuedBooks)) {
      setIssuedBooks(libraryIssuedBooks)
    }
  }, [libraryIssuedBooks])

  const dateFormat = (delay) => {
    let date = new Date();
    date.setDate(date.getDate() + delay);
    return ((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
  }

  const renewBook = book => {
    const renewBook = {
      ...book,
      issuedDate: dateFormat(0),
      returnDate: dateFormat(15)
    }
    console.log(renewBook);
    dispatch(actions.renewBook(renewBook))
  }

  const returnBook = book => {
    const returnBook = {
      ...book,
      issuedDate: dateFormat(0),
      returnDate: dateFormat(15)
    }
    console.log(returnBook);
    dispatch(actions.returnBook(returnBook, libraryIssuedBooks[book.isbn].available))
  }

    let issuedBookArray = [];
    let issuedBookBody = null;
    if (!issuedBooks && fetchIssuedLoading) {
      issuedBookBody = (
        <Message icon>
          <Icon name='circle notched' loading />
          <Message.Content>
            <Message.Header>Just one second</Message.Header>
            We are fetching your library for you.
        </Message.Content>
        </Message>
      );
    } else if (fetchIssuedError) {
      issuedBookBody = (<Message negative>
        <Message.Header>We're sorry!</Message.Header>
        <p>{fetchIssuedError}</p>
      </Message>);
    } else {
      if (!issuedBooks) {
        issuedBookBody = (
          <Message warning>
            <Message.Header>There is no book in your reading list!</Message.Header>
            <p>Please issue a book to yourself!.</p>
          </Message>
        );
      } else {
        console.log(issuedBooks);
        Object.keys(issuedBooks).forEach(key => {
          issuedBookArray.push(issuedBooks[key]);
        });

        if (issuedBookArray) {
          const booksBigScr = (<Table hover responsive className="table-outline mb-0 d-none d-sm-table">
            <thead className="thead-light">
              <tr>
                <th className="text-center"><i className="fa fa-image-o"></i></th>
                <th>Title</th>
                <th>ISBN</th>
                <th>Issued Date</th>
                <th>Return Date</th>
                <th>Days Remaining</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {issuedBookArray.map(book => (
                <Book key={book.isbn} book={book} renewBook={book => renewBook(book)}
                  returnBook={book => returnBook(book)}
                  returnBtnLoading={returnLoading}
                  renewBtnLoading={renewLoading}
                  returnError={returnError}
                  renewError={renewError}
                  returnIsbn={returnIsbn}
                  renewIsbn={renewIsbn} />
              )
              )}
            </tbody>
          </Table>);
          const booksSmallScr = (issuedBookArray.map(book =>
            <Col align='center' sm={6} style={{ "marginTop": "10px", "marginBottom": "5px" }}>
              <MBook key={book.isbn} book={book} renewBook={ book => renewBook(book)}
                  returnBook={book => returnBook(book)}
                  returnBtnLoading={returnLoading}
                  renewBtnLoading={renewLoading}
                  returnError={returnError}
                  renewError={renewError}
                  returnIsbn={returnIsbn}
                  renewIsbn={renewIsbn} />
            </Col>
          ));
          issuedBookBody = (
            <Aux>
              <Visible xs sm>  <Row align="center">{booksSmallScr} </Row> </Visible>
              <Visible md lg xl>{booksBigScr}</Visible>
            </Aux>
          );
        }
      }
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                My Books
              </CardHeader>
              <CardBody>
                {issuedBookBody}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
}

export default IssuedBooks;
