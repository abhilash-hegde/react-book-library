import React, { useEffect, useState, useRef } from 'react'
import { Message, Icon as Icon1, Segment, Form, Button, Transition, Image, Label } from 'semantic-ui-react';
import { Progress } from 'antd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as actions from '../../../store/actions';
import { Row, Col } from 'react-grid-system';


const editBookDetails = props => {
  const dispatch = useDispatch();
  const gApiBook = useSelector(state => state.bookAdmin.fetchGoogleApi.books);
  const { imgUrl, imgProgress, imgError } = useSelector(state => ({
    imgUrl: state.images.book.url,
    imgLoading: state.images.book.loading,
    imgProgress: state.images.book.progress,
    imgError: state.images.book.error,
  }), shallowEqual);
  const addLoading = useSelector(state => state.bookAdmin.add.loading);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [available, setAvailable] = useState("");
  const [img, setImg] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const imageInput = useRef(null);
  useEffect(() => {
    setImg(imgUrl);
    return () => {
      setSelectedImage(null);
    }
  }, [imgUrl])

  useEffect(() => {
    if (gApiBook) {
      const book = gApiBook.volumeInfo;
      setTitle(book.title);
      setAuthor(book.authors);
      setDescription(book.description);
      setYear(book.publishedDate);
      setGenre(book.categories ? book.categories[0] || "" : "");
      setImg(book.imageLinks ? book.imageLinks.smallThumbnail || "" : "");
    }
  }, [gApiBook])


  const imageUploadHandler = () => {
    dispatch(actions.uploadBookImage(selectedImage, props.isbn));
  }

  const onSubmitHandler = (event) => {
    console.log(event.target);
    const book = {
      isbn: props.isbn,
      title,
      author,
      description,
      year,
      genre,
      img,
      available,
      rating: "",
      reviews: {}
    }
    dispatch(actions.addBook(book));
  }

  let uploadingStatus = 'active';

  if (imgProgress == 100) {
    uploadingStatus = "success";
  }
  if (imgError) {
    uploadingStatus = "exeption";
  }

  let bookComp = null;
  if (addLoading) {
    bookComp = (<Message icon info>
      <Icon1 name='circle notched' loading />
      <Message.Content >
        <Message.Header>Just one second</Message.Header>
        Adding book..!.
            </Message.Content>
    </Message>);
  } else if (props.isbn) {
    bookComp = (<Transition.Group animation="horizontal flip" duration="600">
      <Form onSubmit={(event) => onSubmitHandler(event)}>
        <Form.Group widths='equal'>
          <Form.Input fluid disabled key="ISBN" label='ISBN'
            placeholder='ISBN'
            value={props.isbn}
          />
          <Form.Input key='Title' fluid label='Title' placeholder='Title'
            onChange={({ target }) => setTitle(target.value)}
            required value={title} />
          <Form.Input fluid label='Author' placeholder='Authors'
            onChange={({ target }) => setAuthor(target.value)}
            required value={author} />
        </Form.Group>

        <Form.TextArea key='Description' label='Description' placeholder='Description about the book...'
          onChange={({ target }) => setDescription(target.value)}
          value={description} />

        <Form.Group widths='equal'>
          <Form.Input fluid key='Year' label='Year'
            placeholder='Year'
            onChange={({ target }) => setYear(target.value)}
            required value={year}
          />
          <Form.Input fluid key='Genre' label='Genre' placeholder='Genre'
            onChange={({ target }) => setGenre(target.value)}
            required value={genre} />

          <Form.Input fluid key='Available' label='Available'
           placeholder='Available No of books' required
            onChange={({ target }) => setAvailable(target.value)}
            type="number" value={available} />
        </Form.Group>
        <br />
        <Row align="center">
          <Col align="center">
            <input type="file"
              style={{ display: 'none' }}
              onChange={event => setSelectedImage(event.target.files[0])}
              ref={imageInput} />

            <Segment style={{ width: 180 }}>
              <div><Image size='medium'>
                {img ? (<Image src={img} size='small' />) : (<Label content='Image not found!' icon='warning' />)}
              </Image>
              </div>
              <span hidden={!imgProgress} style={{ width: 170 }}><Progress percent={imgProgress || 0} size="small" status={uploadingStatus} /></span>
              <br />
              <Button size='mini' onClick={() => imageInput.current.click()}>{img ? "Change" : "Add"}</Button>
              <Button size='mini' disabled={!selectedImage} onClick={() => imageUploadHandler()}>Upload</Button>
            </Segment>
          </Col>
        </Row>
        <br />
        <br />
        <Row align="center">
          <Col align="center">
            <Button color={'green'} disabled={false} type='Submit'
            >Submit</Button>
          </Col>
        </Row>
      </Form>
    </Transition.Group>)
  }
  return bookComp;
}
export default editBookDetails;