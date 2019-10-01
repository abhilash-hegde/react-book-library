import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Rate } from 'antd';
import PropTypes from 'prop-types'

const Book_m = props => {
  return (
    <Card link>
      <Card.Content onClick={() => props.onClickEvent(props.book.isbn)}>
        <Image floated='right' size='mini' src={props.book.img} onClick={() => props.onClickEvent(props.book.isbn)} />
        <Card.Header>{props.book.title}</Card.Header>
        <Card.Meta>{props.book.year} |{props.book.isbn}</Card.Meta>
        <Card.Description onClick={() => props.onClickEvent(props.book.isbn)}>
          <strong>Authors:</strong> {props.book.author}
          <br /><strong>Category:</strong> {props.book.genre}
          <br /><Rate as='h5' allowHalf disabled value={props.book.rating} />
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

Book_m.propTypes = {
  onClickEvent: PropTypes.func,
  book: PropTypes.object
}

export default Book_m;