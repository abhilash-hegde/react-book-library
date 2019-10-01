import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table
} from 'reactstrap';

import Book from '../../../components/AdminPage/BookIssued/BookIssued';
import * as actions from '../../../store/actions';
import { Message, Icon } from 'semantic-ui-react';

const BooksIssued = props => {
  const dispatch = useDispatch();
  const user = props.match.params.userId;
  useEffect(() => {
    dispatch(actions.fetchIssuedBooks(user))
  }, []);

  const issuedBooks = useSelector(state => state.library.issuedBooks);
  const { loading, error, success } = useSelector(state => ({
    loading: state.library.fetchIssued.loading,
    error: state.library.fetchIssued.error,
    success: state.library.fetchIssued.success,
  }), shallowEqual)
  let issuedBookArray = [];
  let issuedBookBody = null;
  if (loading) {
    issuedBookBody = (
      <Message icon>
        <Icon name='circle notched' loading />
        <Message.Content>
          <Message.Header>Just one second</Message.Header>
          We are fetching user's library for you.
        </Message.Content>
      </Message>
    );
  } else if (error) {
    issuedBookBody = (<Message negative>
      <Message.Header>We're sorry!</Message.Header>
      <p>{error}</p>
    </Message>);
  } else {
    if (success && issuedBooks === null) {
      issuedBookBody = (
        <Message warning>
          <Message.Header>Empty list!</Message.Header>
          <p>Books are not issued to this user.</p>
        </Message>
      );
    } else {
      Object.keys(issuedBooks).forEach(key => {
        issuedBookArray.push(issuedBooks[key]);
      });

      issuedBookBody = (
        <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
          <thead className="thead-light">
            <tr>
              <th className="text-center"><i className="fa fa-image-o"></i></th>
              <th>Title</th>
              <th>ISBN</th>
              <th>Issued Date</th>
              <th>Return Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {issuedBookArray.map((book) => {
              return <Book key={book.isbn} book={book} />
            }
            )}
          </tbody>
        </Table>
      );
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

export default BooksIssued;
