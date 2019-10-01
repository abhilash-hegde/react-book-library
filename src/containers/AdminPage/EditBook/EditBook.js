import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { message } from 'antd';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';

import { Form } from 'semantic-ui-react';
import * as actions from '../../../store/actions';

const EditBook= props => {
  const dispatch = useDispatch();
  const isbn = props.match.params.isbn;
  const book = useSelector(state => state.library.books ? state.library.books[isbn]: null)
  const {fetchLoading} = useSelector(state => ({
    fetchLoading: state.library.fetch.loading,
    fetchError: state.library.fetch.error,
    fetchSuccess: state.library.fetch.success,
  }), shallowEqual)
  const {updateLoading, updateError, updateSuccess} = useSelector(state => ({
    updateLoading: state.bookAdmin.update.loading,
    updateError: state.bookAdmin.update.error,
    updateSuccess: state.bookAdmin.update.success,
  }), shallowEqual)
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [available, setAvailable] = useState("");

  useEffect(() => {
    dispatch(actions.fetchAllBooks());
  }, [])

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setDescription(book.description);
      setYear(book.year);
      setGenre(book.genre);
      setAvailable(book.available)
    }
  }, [book])

  message.config({
    top: 60,
    duration: 2,
    maxCount: 3,
  });
   useEffect(() => {
     if(updateSuccess){
    message.success('Updated book details');
     }
   }, [updateSuccess])

   useEffect(() => {
    if(updateError){
   message.error('Failed to updated book details');
    }
  }, [updateError])

  useEffect(() => {
    if(updateLoading){
   message.loading('loading');
    }
  }, [updateLoading])
  
  const updateBook = () => {
    const updatedBook = {
      title,
      author,
      description,
      year,
      genre,
      available,
      ...book
    };

    dispatch(actions.updateBook(updatedBook))
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
                <Form loading={fetchLoading} onSubmit={() => updateBook()}>
                  <Form.Group widths='equal'>
                    <Form.Input fluid disabled label='ISBN'
                      placeholder='First name'
                      value={isbn} />
                    <Form.Input fluid label='Title' placeholder='Last name'
                      onChange={({target}) => setTitle(target.value)}
                      value={title} />
                    <Form.Input fluid label='Author' placeholder='Gender'
                      onChange={({target}) => setAuthor(target.value)}
                      value={author} />
                  </Form.Group>
                  <Form.TextArea label='Description' placeholder='Description about the book...'
                    onChange={({target}) => setDescription(target.value)}
                    value={description} />
                  <Form.Group widths='equal'>
                    <Form.Input fluid label='Year'
                      placeholder='First name'
                      onChange={({target}) => setYear(target.value)}
                      value={year} />
                    <Form.Input fluid label='Genre' placeholder='Last name'
                      onChange={({target}) => setGenre(target.value)}
                      value={genre} />
                  </Form.Group>
                  <Form.Button disabled={updateLoading} type="submit">Submit</Form.Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
}

export default EditBook;
