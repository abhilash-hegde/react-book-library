import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Rate } from 'antd';
import { Visible, Row, Col } from 'react-grid-system';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { Card as SemanticCard, TextArea, Dimmer, Loader, Segment, Icon, Button, Comment, Form, Header } from 'semantic-ui-react';
import * as actions from '../../../store/actions';
import { Review, ItemDetails } from '../../../components/UserPage/BookDetails/BookDetails';
import ShareButton from 'react-social-share-buttons';
import { successNotification, errorNotification } from '../../../components/UI/Message/Message';
import PropTypes from 'prop-types';

const BookDetails = props => {
  const dispatch = useDispatch();
  const { fetchLoading } = useSelector(state => ({
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

  const { reviewError, reviewSuccess, reviewLoading } = useSelector(state => ({
    reviewError: state.bookUser.updateReview.error,
    reviewSuccess: state.bookUser.updateReview.success,
    reviewLoading: state.bookUser.updateReview.loading
  }), shallowEqual);

  const { libraryBooks, libraryIssuedBooks } = useSelector(state => ({
    libraryBooks: state.library.books,
    libraryIssuedBooks: state.library.issuedBooks
  }), shallowEqual);

  const isbn = props.match.params.isbn;

  const [review, setReview] = useState({ user: props.myName || "", rating: 0, comment: "" });

  useEffect(() => {
    dispatch(actions.fetchAllBooks())
    dispatch(actions.fetchIssuedBooks(localStorage.userId))
  }, []);

  let book = null;
  if (libraryBooks) {
    book = libraryBooks[props.match.params.isbn];
  }
  useEffect(() => {
    if (book) {
      setReview(review => ({
        ...review,
        rating: book.reviews[localStorage.userId].rating,
        comment: book.reviews[localStorage.userId].comment
      }))
    }
  }, [book])

  useEffect(() => {
    if (issueSuccess) {
      successNotification("Your book is issued successfully");
    }
  }, [issueSuccess, issueLoading])

  useEffect(() => {
    if (issueError) {
      errorNotification(issueError);
    }
  }, [issueError, issueLoading])

  useEffect(() => {
    if (reviewSuccess) {
      successNotification("Successfully updated your review..!");
    }
  }, [reviewSuccess, reviewLoading])

  useEffect(() => {
    if (reviewError) {
      errorNotification(reviewError);
    }
  }, [reviewError, reviewLoading])

  const dateFormat = (delay) => {
    var date = new Date();
    date.setDate(date.getDate() + delay);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var y = date.getFullYear();
    return (mm + '/' + dd + '/' + y);
  }

  const issueBook = () => {
    const issuedBook = {
      isbn: book.isbn,
      title: book.title,
      author: book.author,
      img: book.img,
      issuedDate: dateFormat(0),
      returnDate: dateFormat(15)
    }
    dispatch(actions.issueBook(issuedBook, book.available))
  }

  let issuedIsbnArray = [];
  let userReviews = [];
  const socialMediaShare = ["facebook", "google-plus", "twitter", "pinterest"];

  if (libraryIssuedBooks) {
    Object.keys(libraryIssuedBooks).forEach(key => {
      issuedIsbnArray.push(key);
    });
  }

  const issued = issuedIsbnArray.includes(isbn) ? true : false;
  if (book && book.reviews) {
    Object.keys(book.reviews).forEach(key => {
      userReviews.push(book.reviews[key]);
    });
  }
  let userComments = <h4>No comments availabe</h4>;

  if (userReviews.length) {
    userComments = userReviews.map(review => <Review key={review.user} review={review} />);
  }

  return (
    <div className="animated fadeIn">
      <Card key={isbn}>
        <CardHeader>
          All Books
        </CardHeader>
        <CardBody>
          <Dimmer.Dimmable as={Segment} dimmed={fetchLoading}>
            <Dimmer active={fetchLoading || !book} inverted>
              <Loader>Loading..</Loader>
            </Dimmer>
            {book ? <ItemDetails book={book} /> : null}
            <Row align="center">
              <Col align="center" xs={12} sm={4} md={3} >
                <Button color='green' animated
                  onClick={() => issueBook()} disabled={issued}
                  loading={issueLoading && (issueIsbn === isbn)} >
                  <Button.Content visible><i className="fa fa-dot-circle-o"></i> {issued ? 'Issued' : 'Issue'}</Button.Content>
                  <Button.Content hidden>
                    <Icon name='right arrow' />
                  </Button.Content>
                </Button>
              </Col>
              <Visible xs> <br /> </Visible>
              <Visible xs> <br /> </Visible>
              <Col align="center" xs={12} sm={5} md={5} offset={{ sm: 3, md: 4 }}>
                <SemanticCard>
                  <SemanticCard.Content>
                    <SemanticCard.Header>Share</SemanticCard.Header>
                    <SemanticCard.Description>
                      <Row align="center">
                        {socialMediaShare.map(site => <Col align="center" key={site}>
                          <ShareButton
                            compact
                            socialMedia={site}
                            url={`http://${process.env.AUTH_DOMAIN}/#${props.location.pathname}`}
                            media={"https://imgs.xkcd.com/comics/error_code.png"}
                            text="My Library"
                          />
                        </Col>)}
                      </Row>
                    </SemanticCard.Description>
                  </SemanticCard.Content>
                </SemanticCard>
              </Col>
            </Row>
            <Comment.Group minimal key={1}>
              <Header as='h3' dividing>
                Rate & Comment:
                    </Header>
              <Form>
                <Row align="center">
                  <Col align="center" xs={12} sm={6} md={4} >
                    <TextArea autoHeight rows={1}
                      value={review.comment}
                      placeholder="Write your comments!"
                      onChange={(event, data) => setReview(review => ({ ...review, comment: data.value }))} />
                  </Col>
                  <Visible xs sm> <br /> <br />  <br /> </Visible>
                  <Col align="center" xs={7} sm={6} md={4} >
                    <Rate as='h5' allowHalf
                      onChange={rating => setReview(review => ({ ...review, rating }))}
                      value={review.rating} />
                  </Col>
                  <Col align="center" xs={5} sm={12} md={3}>
                    <Button size="small" loading={reviewLoading}
                      onClick={() => dispatch(actions.updateBookReview(review, isbn))} content='Submit'
                      labelPosition='left' icon='edit' primary />
                  </Col>
                </Row>
              </Form>
            </Comment.Group>
            <Comment.Group minimal key={2}>
              <Header as='h3' dividing>User Comments</Header>
              {userComments}
            </Comment.Group>
          </Dimmer.Dimmable>
        </CardBody>
      </Card>
    </div>
  )
}

BookDetails.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  myName: PropTypes.string
};

export default BookDetails;