import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Dropdown, Message, Icon } from 'semantic-ui-react';
import { Visible, Hidden, Row, Col } from 'react-grid-system';
import { Card, CardHeader, CardBody, Table } from 'reactstrap';
import Book from '../../../components/UserPage/Book/Book';
import MBook from '../../../components/UserPage/Book/mBook';
import * as bookActions from '../../../store/actions';
import { successNotification, errorNotification } from '../../../components/UI/Message/Message';

const Books = props => {
  const [genreFilter, setGenreFilter] = useState('All');

  const { fetchError, fetchSuccess, fetchLoading } = useSelector(state => ({
    fetchError: state.library.fetch.error,
    fetchSuccess: state.library.fetch.success,
    fetchLoading: state.library.fetch.loading
  }), shallowEqual);

  const { issueError, issueSuccess, issueLoading, issueIsbn } = useSelector(state => ({
    issueError: state.bookUser.issue.error,
    issueSuccess: state.bookUser.issue.success,
    issueLoading: state.bookUser.issue.loading,
    issueIsbn: state.bookUser.issue.isbn
  }), shallowEqual);

  const { libraryBooks, libraryIssuedBooks } = useSelector(state => ({
    libraryBooks: state.library.books,
    libraryIssuedBooks: state.library.issuedBooks
  }), shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bookActions.fetchAllBooks())
    dispatch(bookActions.fetchIssuedBooks(localStorage.userId))
  }, []);

  useEffect(() => {
    console.log("issueSuccess")
    if (issueSuccess) {
      successNotification("Your book is issued successfully");
    }
  }, [issueSuccess, issueLoading])

  useEffect(() => {
    console.log("issueError")
    if (issueError) {
      errorNotification(issueError);
    }
  }, [issueError, issueLoading])

  const dateFormat = (delay) => {
    var date = new Date();
    date.setDate(date.getDate() + delay);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var y = date.getFullYear();
    return (mm + '/' + dd + '/' + y);
  }

  const issueBook = book => {
    const issuedBook = {
      isbn: book.isbn,
      title: book.title,
      author: book.author,
      img: book.img,
      issuedDate: dateFormat(0),
      returnDate: dateFormat(15)
    }
    console.log(issuedBook);
    dispatch(bookActions.issueBook(issuedBook, book.available))
  }

  let booksArray = [];
  let genre = [];
  let issuedIsbnArray = [];
  let bookBody = null;

  if (!libraryBooks && fetchLoading) {
    bookBody = (
      <Message icon>
        <Icon name='circle notched' loading />
        <Message.Content>
          <Message.Header>Just one second</Message.Header>
          We are fetching books for you.
        </Message.Content>
      </Message>
    );
  } else if (fetchError) {
    bookBody = (<Message negative>
      <Message.Header>We're sorry!</Message.Header>
      <p>{fetchError}</p>
    </Message>);
  } else {
    if (libraryBooks) {
      if (libraryIssuedBooks) {
        Object.keys(libraryIssuedBooks).forEach(key => {
          issuedIsbnArray.push(key);
        });
      }

      Object.keys(libraryBooks).forEach(key => {
        booksArray.push(libraryBooks[key]);
      });

      booksArray.map((book) => {
        if (!genre.includes(book.genre)) {
          genre.push(book.genre)
        }
      });

      if (genreFilter !== "All") {
        booksArray = booksArray.filter(a => a.genre == genreFilter);
      }

      const booksBigScr = (<Table hover responsive className="table-outline mb-0 d-none d-sm-table">
        <thead className="thead-light">
          <tr>
            <th className="text-center"><i className="icon-people"></i></th>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Category</th>
            <th>Rating</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {booksArray.map(book => {
            return <Book key={book.isbn} book={book}
              issueBook={book => issueBook(book)}
              onClickEvent={isbn => props.history.push('/user/bookDetails/' + isbn)}
              issuedIsbnArray={issuedIsbnArray}
              issueIsbn={issueIsbn}
              issueBtnLoading={issueLoading}
              issueError={issueError}
              issued={issueSuccess} />
          }
          )}
        </tbody>
      </Table>);

      const booksSmallScr = (
        booksArray.map(book => <Col align='center' sm={6} style={{ "marginTop": "10px", "marginBottom": "5px" }}>
          <MBook key={book.isbn} book={book}
            issueBook={book => issueBook(book)}
            onClickEvent={isbn => props.history.push('/user/bookDetails/' + isbn)}
            issuedIsbnArray={issuedIsbnArray}
            issueIsbn={issueIsbn}
            issueBtnLoading={issueLoading}
            issueError={issueError} /> </Col>
        )
      );

      bookBody = (<div>
        <Dropdown text='Filter' icon='filter' floating labeled button className='icon'>
          <Dropdown.Menu>
            <Dropdown.Header icon='tags' content='Filter by Category' />
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => setGenreFilter("All")} key={'All'}>All</Dropdown.Item>
            {
              genre.map(key => {
                console.log(key);
                return (<Dropdown.Item onClick={(e, genre) => setGenreFilter(genre.children)} key={key}>{key}</Dropdown.Item>);
              })
            }
          </Dropdown.Menu>
        </Dropdown>
        <br />
        <br />
        <Visible xs sm > <Row align="center"> {booksSmallScr} </Row> </Visible>
        <Visible md lg xl> {booksBigScr} </Visible>

      </div>
      );

    } else {
      bookBody = (
        <Message warning>
          <Message.Header>There is no book in our Library!</Message.Header>
          <p>Please inform this to the admin!.</p>
        </Message>
      );
    }
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              All Books
              </CardHeader>
            <CardBody>
              {bookBody}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Books;
