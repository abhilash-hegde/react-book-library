import React from 'react';
import { Rating } from 'semantic-ui-react';

const book = ({ book, onClickEvent }) => (
  <tr onClick={() => onClickEvent(book.isbn)}>
    <td className="text-center" >
      <div className="avatar">
        <img src={book.img} className="img-avatar" alt="admin@bootstrapmaster.com" />
      </div>
    </td>
    <td >
      <div>{book.title}</div>
      <div className="small text-muted">
        <span>Available: {book.available}</span> | {book.year}
      </div>
    </td>
    <td>
      <div>{book.author}</div>
    </td>
    <td>
      <div>{book.isbn}</div>
    </td>
    <td>
      <div>{book.genre}</div>
    </td>
    <td >
      <div>
        <Rating maxRating={5} defaultRating={book.rating} icon='star' size='mini' disabled />
      </div>
    </td>
  </tr>
)

export default book;