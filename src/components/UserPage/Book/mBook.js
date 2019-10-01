import React from 'react';
import { Button, Icon, Card, Image } from 'semantic-ui-react';
import { Rate } from 'antd';

const mBook = props => {
  let issued = false;
  console.log(props.issuedIsbnArray);
  if (props.issuedIsbnArray) {
    issued = props.issuedIsbnArray.includes(props.book.isbn) ? true : false;
  }

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
      <Card.Content extra>
        <Button color={issued ? 'green' : 'blue'} disabled={issued} icon labelPosition='right'
          loading={props.issueBtnLoading && (props.issueIsbn == props.book.isbn)}
          onClick={() => props.issueBook(props.book)}>
          <Icon name={issued ? 'in cart' : 'add to cart'} />
          {issued ? 'Issued' : 'Issue'}</Button>
      </Card.Content>
    </Card>
  )
}

export default mBook;