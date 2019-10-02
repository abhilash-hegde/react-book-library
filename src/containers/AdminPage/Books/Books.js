import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Dropdown, Message, Icon, Grid, Input } from 'semantic-ui-react';
import { Visible, Row, Col } from 'react-grid-system';
import _ from 'lodash';
import {
  Card,
  CardHeader,
  CardBody,
  Table
} from 'reactstrap';
import Book from '../../../components/AdminPage/Book/Book';
import BookM from '../../../components/AdminPage/Book/Book_m';
import * as actions from '../../../store/actions';
import PropTypes from 'prop-types'

const searchFilterOptions = [
  { key: 'author', text: 'Author', value: 'author' },
  { key: 'genre', text: 'Category', value: 'genre' },
  { key: 'title', text: 'Title', value: 'title' },
]

const Books = props => {
  const [genreFilter, setGenreFilter] = useState("All");
  const [searchFilter, setSearchFilter] = useState("author");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [searchFilterLoading, setSearchFilterLoading] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => ({
    loading: state.library.fetch.loading,
    error: state.library.fetch.error,
    success: state.library.fetch.success
  }), shallowEqual);
  const books = useSelector(state => state.library.books);

  useEffect(() => {
    dispatch(actions.fetchAllBooks());
  }, [])

  const filterBook = () => {
    if (books) {
      let booksArray = [];
      Object.keys(books).forEach(key => {
        booksArray.push(books[key]);
      });
      if (genreFilter !== 'All') {
        booksArray = booksArray.filter(book => book.genre == genreFilter);
      }
      if (search) {
        const re = new RegExp(_.escapeRegExp(search), 'i');
        const isMatch = books => re.test(books[searchFilter]);
        booksArray = _.filter(booksArray, isMatch)
      }
      setFilteredBooks(booksArray);
    }
  }

  useEffect(() => {
    filterBook()
  }, [success])

  useEffect(() => {
    if (books) {
      let cat = categories;
      let booksArray = [];
      Object.keys(books).forEach(key => {
        booksArray.push(books[key]);
        if (!categories.includes(books[key].genre)) {
          cat.push(books[key].genre)
        }
      });
      setCategories(cat);
    }
  }, [books])

  useEffect(() => {
    filterBook();
  }, [genreFilter, search, searchFilter])

  const onSearchHandler = (searchKey) => {
    setSearch(searchKey);
    setSearchFilterLoading(true);
    setTimeout(() => {
      setSearchFilterLoading(false);
    }, 300);
  }
  let bookBody = (
    <Message icon>
      <Icon name='circle notched' loading />
      <Message.Content>
        <Message.Header>Just one second</Message.Header>
        We are fetching books for you.
      </Message.Content>
    </Message>
  );
  console.log(loading);
  console.log(success);
  console.log(books);
  console.log(filteredBooks);
  if (!loading) {
    if (error) {
      bookBody = (<Message negative>
        <Message.Header>{`We're sorry!`}</Message.Header>
        <p>{error}</p>
      </Message>);
    } else if (success && books) {
      const bookBigScr = filteredBooks.length ? (<Table hover responsive className="table-outline mb-0 d-none d-sm-table">
        <thead className="thead-light">
          <tr>
            <th className="text-center"><i className="icon-people"></i></th>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Category</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map(book => <Book key={book.isbn} book={book}
            onClickEvent={isbn => props.history.push('/admin/editBook/' + isbn)} />
          )}
        </tbody>
      </Table>): <Message warning>
          <Message.Header> Sorry</Message.Header>
          <p>No results found..!</p>
        </Message>

      const bookSmallScr = filteredBooks.length ? (filteredBooks.map(book =>
        <Col key={book.isbn} align='center' sm={6} style={{ "marginTop": "10px", "marginBottom": "3px" }}>
          <BookM key={book.isbn} book={book}
            onClickEvent={isbn => props.history.push('/admin/editBook/' + isbn)} />
        </Col>)) : <Message warning>
          <Message.Header> Sorry</Message.Header>
          <p>No results found..!</p>
        </Message>

      bookBody = (<div>
        <Visible md lg xl>
          <Grid columns='equal'>
            <Grid.Column>
              <Dropdown text={'Filter'} icon='filter' floating labeled button className='icon'>
                <Dropdown.Menu>
                  <Dropdown.Header icon='tags' content='Filter by Category' />
                  <Dropdown.Divider />
                  <Dropdown.Item selected={genreFilter == "All"}
                    onClick={() => setGenreFilter('All')} key={'All'}>All</Dropdown.Item>
                  {
                    categories.map(category => {
                      return (<Dropdown.Item selected={genreFilter == category}
                        onClick={(e, { children }) => setGenreFilter(children)} key={category}>{category}</Dropdown.Item>);
                    })
                  }
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
            <Grid.Column width={14}>
              <Input
                icon={<Icon name={!search ? 'search' : 'delete'}
                  circular link={search ? true : false} onClick={() => setSearch("")} />}
                loading={searchFilterLoading}
                label={<Dropdown defaultValue='author'
                  onChange={(e, { value }) => setSearchFilter(value)} options={searchFilterOptions} />}
                labelPosition='left'
                placeholder={'Find ' + searchFilter}
                onChange={({ target }) => onSearchHandler(target.value)}
                value={search} />
            </Grid.Column>
          </Grid>
        </Visible>
        <Visible xs sm>
          <Grid columns='equal'>
            <Grid.Column floated="right" >
              <Dropdown icon='filter' floating button className='icon'>
                <Dropdown.Menu>
                  <Dropdown.Header icon='tags' content='Filter by Category' />
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => setGenreFilter('All')}
                    key={'All'}>All</Dropdown.Item>
                  {
                    categories.map(category => {
                      return (<Dropdown.Item selected={genreFilter == category}
                        onClick={(e, { children }) => setGenreFilter(children)} key={category}>{category}</Dropdown.Item>);
                    })
                  }
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
            <Grid.Column floated="left" width={12}>
              <Input
                icon={<Icon name={!search ? 'search' : 'delete'}
                  circular link={search ? true : false} onClick={() => setSearch("")} />}
                size='mini'
                loading={searchFilterLoading}
                label={<Dropdown defaultValue='author'
                  onChange={(e, { value }) => setSearch(value)} options={searchFilterOptions} />}
                labelPosition='left'
                placeholder={'Find ' + searchFilter}
                onChange={({ target }) => onSearchHandler(target.value)}
                value={search} />
            </Grid.Column>
          </Grid>
        </Visible>
        <br />
        <Visible xs sm><Row align="center">{bookSmallScr} </Row></Visible>
        <Visible md lg xl>{bookBigScr} </Visible>
      </div>
      );
    } else if (success && !books) {
      bookBody = (
        <Message warning>
          <Message.Header> Empty!</Message.Header>
          <p>Hey ADMIN.. Please add some books!.</p>
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

Books.propTypes = {
  history: PropTypes.object
}
export default Books;
