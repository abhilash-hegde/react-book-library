import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';
import { Message, Icon } from 'semantic-ui-react';
import * as actions from '../../../store/actions';

import SearchBook from '../../../components/AdminPage/AddBook/SearchBook';
import EditBookDetails from '../../../components/AdminPage/AddBook/EditBookDetails';

function Users(props) {
  const [editPage, setEditPage] = useState(false);
  const [manualEdit, setManualEdit] = useState(false);
  const [isbn, setIsbn] = useState("");

  const dispatch = useDispatch();
  const { gApiBooks, gApiLoading, gApiError, gApiSuccess } = useSelector(state => ({
    gApibooks: state.bookAdmin.fetchGoogleApi.books,
    gApiLoading: state.bookAdmin.fetchGoogleApi.loading,
    gApiError: state.bookAdmin.fetchGoogleApi.error,
    gApiSuccess: state.bookAdmin.fetchGoogleApi.success,
  }), shallowEqual);

  const { addloading, addError, addSuccess } = useSelector(state => ({
    addLoading: state.bookAdmin.add.loading,
    addError: state.bookAdmin.add.error,
    addSuccess: state.bookAdmin.add.success,
  }), shallowEqual);

  useEffect(() => {
    if (addSuccess) {
      setEditPage(false);
      setIsbn("");
    }
  }, [addSuccess]);

  useEffect(() => {
    if(gApiSuccess){
    setEditPage(true);
    }
  }, [gApiSuccess])

  const onIsbnChange = (event) => {
    const target = event.target;
    setIsbn(target.value);
  }

  const EditPageComp = useMemo(() => {
    console.log("EditPageComp")
    if (isbn && (editPage || manualEdit)) {
      return (<div>
        <EditBookDetails
          isbn={isbn} />
      </div>
      );
    } else if (addSuccess) {
      return (<Message icon positive>
        <Icon name='check square' />
        <Message.Content >
          <Message.Header>Success</Message.Header>
          Book is successfully added to libray.
                  </Message.Content>
      </Message>);
    } else if (addError) {
      return (<Message icon negative>
        <Icon name='frown' />
        <Message.Content >
          <Message.Header>Error!</Message.Header>
          {addError}
        </Message.Content>
      </Message>);
    }else if (gApiLoading) {
      return (
        <Message icon>
          <Icon name='circle notched' loading />
          <Message.Content>
            <Message.Header>Just one second</Message.Header>
            We are fetching book for you.
                      </Message.Content>
        </Message>
      );
    } else if (gApiError) {
      return (<Message negative>
        <Message.Header>We're sorry!</Message.Header>
        <p>{gApiError}</p>
      </Message>);
    }
  },
    [gApiLoading, gApiError, editPage, addError, addSuccess, manualEdit],
  )

  return (
    <div className="animated fadeIn">
      <Card>
        <CardHeader>
          All Books
        </CardHeader>
        <CardBody>
          <SearchBook onSearchEvent={() => {
            dispatch(actions.fetchIsbn(isbn));
          }}
            isbn={isbn}
            onClickEvent={() => setManualEdit(true)}
            onIsbnChange={event => onIsbnChange(event)} />
          <hr />
          {EditPageComp}
        </CardBody>
      </Card>
    </div>
  )
}

export default Users;