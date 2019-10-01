import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Badge } from 'reactstrap';
import PropTypes from 'prop-types';

const mIssuedBook = props => {
  const oneDay = 24 * 60 * 60 * 1000;
  const date = new Date();
  const todaysDate = new Date(date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear());
  const returnDate = new Date(props.book.returnDate);
  const remainingDays = Math.round(Math.abs((todaysDate.getTime() - returnDate.getTime()) / (oneDay)));
  let remainingDaysDadge = 'success';
  if (remainingDays < 3) remainingDaysDadge = 'danger';
  else if (remainingDays < 5) remainingDaysDadge = 'warning';

  return (
    <Card>
      <Card.Content onClick={() => props.onClickEvent(props.book.isbn)}>
        <Image floated='right' size='mini' src={props.book.img} onClick={() => props.onClickEvent(props.book.isbn)} />
        <Card.Header>{props.book.title}</Card.Header>
        <Card.Meta>{props.book.year || 'Unknown'} |{props.book.isbn}</Card.Meta>
        <Card.Description onClick={() => props.onClickEvent(props.book.isbn)}>
          <strong>Authors:</strong> {props.book.author}
          <br />
          <Badge color={remainingDaysDadge} pill>{remainingDays} {(remainingDays == 1) ? 'day' : 'days'} Remaining</Badge>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group>
          <Button loading={props.renewBtnLoading && (props.renewIsbn == props.book.isbn)} onClick={() => props.renewBook(props.book)}>
            <i className="fa fa-refresh"></i> Renew</Button>
          <Button.Or />
          <Button loading={props.returnBtnLoading && (props.returnIsbn == props.book.isbn)} negative onClick={() => props.returnBook(props.book)}>
            <i className="fa fa-chevron-circle-right"></i> Return</Button>
        </Button.Group>
      </Card.Content>
    </Card>
  )
}

mIssuedBook.propTypes = {
  book:PropTypes.object,
  returnBook:PropTypes.func,
  renewBook:PropTypes.func,
  onClickEvent:PropTypes.func,
  renewBtnLoading:PropTypes.bool,
  returnBtnLoading:PropTypes.bool,
  renewIsbn:PropTypes.string,
  returnIsbn:PropTypes.string,
}
export default mIssuedBook;