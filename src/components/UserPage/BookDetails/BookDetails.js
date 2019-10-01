import React from 'react';
import { Item, Comment } from 'semantic-ui-react';
import image from '../../../../public/img/avatars/8.jpg';
import { Rate } from 'antd';
import PropTypes from 'prop-types';


export const Review = ({ review }) => (
  <Comment>
    <Comment.Avatar as='a' src={image} />
    <Comment.Content>
      <Comment.Author as='a'>{review.user || "No Name"}</Comment.Author>
      <Comment.Metadata>
        <span> <Rate allowHalf value={review.rating} disabled /></span>
      </Comment.Metadata>
      <Comment.Text>{review.comment}</Comment.Text>
      <Comment.Actions>
        <a>Reply</a>
      </Comment.Actions>
    </Comment.Content>
  </Comment>
);

Review.propTypes = {
  review : PropTypes.object
}
export const ItemDetails = ({ book }) => (
  <Item.Group>
    <Item key={book.isbn}>
      <Item.Image size='tiny' src={book.img} />
      <Item.Content>
        <Item.Header as='a'><h2>{book.title}</h2></Item.Header>
        <Item.Meta>Author: {book.author} | Year: {book.year}</Item.Meta>
        <Item.Description>
          {book.description}
        </Item.Description>
        <Item.Extra> </Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>
); 

ItemDetails.propTypes = {
  book : PropTypes.object
}