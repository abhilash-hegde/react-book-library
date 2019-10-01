import React from 'react';
import {Badge} from 'reactstrap';
import { Button } from 'semantic-ui-react';

const issuedBook = ({book, returnBook, renewBook, renewBtnLoading, returnBtnLoading, renewIsbn, returnIsbn}) => {

  const oneDay = 24*60*60*1000; 
  const date = new Date();
  const todaysDate =  new Date(date.getMonth()+1 + '/' + date.getDate() + '/' + date.getFullYear());
  const returnDate = new Date(book.returnDate);
  const remainingDays = Math.round(Math.abs((todaysDate.getTime() - returnDate.getTime())/(oneDay)));
  let remainingDaysDadge = 'success';
  if(remainingDays < 3) remainingDaysDadge = 'danger';
  else if(remainingDays < 5) remainingDaysDadge = 'warning';

  return (
    <tr>
      <td className="text-center">
        <div className="avatar">
          <img src={book.img} className="img-avatar" alt="admin@bootstrapmaster.com"/>
        </div>
      </td>
      <td>
        <div>{book.title}</div>
        <div className="small text-muted">
          <span>{book.author}</span> | {book.isbn}
        </div>
      </td>
      <td>
      <div>{book.isbn}</div>
      </td>
      
      <td>
      <div>{book.issuedDate}</div>
      </td>
      <td>
      <div>{book.returnDate}</div>
      </td>
  
      <td>
      <Badge color={remainingDaysDadge} className="float-left">{remainingDays} {(remainingDays==1)?'day':'days'} Remaining</Badge>
      </td>
      <td>
      <Button.Group>
      <Button loading={renewBtnLoading && (renewIsbn == book.isbn)} onClick={e => renewBook(book)}>
      <i className="fa fa-refresh"></i> Renew</Button>
      <Button.Or />
      <Button loading={returnBtnLoading && (returnIsbn == book.isbn) } negative onClick={e => returnBook(book)}>
      <i className="fa fa-chevron-circle-right"></i> Return</Button>
      </Button.Group>
      </td>
    </tr>
)
}

export default issuedBook;
