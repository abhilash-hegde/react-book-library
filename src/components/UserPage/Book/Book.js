import React from 'react';
import { Button, Icon, Rating } from 'semantic-ui-react';

const Book = props => {
  let issued = props.issuedIsbnArray.includes(props.book.isbn) ? true :false;
  return (
    <tr>
      <td className="text-center" onClick={() => props.onClickEvent(props.book.isbn)}>
        <div className="avatar">
          <img src={props.book.img} className="img-avatar" alt="admin@bootstrapmaster.com" />
        </div>
      </td>
      <td onClick={() => props.onClickEvent(props.book.isbn)}>
        <div>{props.book.title}</div>
        <div className="small text-muted">
          <span>Available</span> | {props.book.year}
        </div>
      </td>
      <td onClick={() => props.onClickEvent(props.book.isbn)}>
        <div>{props.book.author}</div>
      </td>
      <td onClick={() => props.onClickEvent(props.book.isbn)}>
        <div>{props.book.isbn}</div>
      </td>
      <td onClick={() => props.onClickEvent(props.book.isbn)}>
        <div>{props.book.genre}</div>
      </td>
      <td onClick={() => props.onClickEvent(props.book.isbn)}>
        <div>
          <Rating maxRating={5} defaultRating={props.book.rating} icon='star' size='mini' disabled />            
        </div>
      </td>
      <td>
        <Button color={issued ? 'green' : 'blue'} disabled={issued} icon labelPosition='right'
          loading={props.issueBtnLoading && (props.issueIsbn == props.book.isbn)}
          onClick={e => props.issueBook(props.book)}>
          <Icon name={issued ? 'in cart' : 'add to cart'} />
          {issued ? 'Issued' : 'Issue'}</Button>
      </td>
    </tr>
  ) 
}

export default Book;