import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { Message, Icon } from 'semantic-ui-react';
import * as actions from '../../../store/actions/';
import User from '../../../components/AdminPage/User/User';
import PropTypes from 'prop-types';

const Users = props => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => ({ loading: state.users.fetch.loading, error: state.users.fetch.error, success: state.users.fetch.success }))
  const users = useSelector(state => state.users.users);

  useEffect(() => {
    dispatch(actions.fetchUsers())
  }, [])

  let usersArray = [];

  if (users) {
    Object.keys(users).forEach(key => {
      usersArray.push(users[key]);
    });
  }

  let pageBody = (<Message icon>
    <Icon name='circle notched' loading />
    <Message.Content>
      <Message.Header>Just one second</Message.Header>
      We are fetching Users for you.
    </Message.Content>
  </Message>);
  if (error) {
    pageBody = (<Message negative>
      <Message.Header>{`We're sorry!`}</Message.Header>
      <p>{fetch.error}</p>
    </Message>);
  } else if (usersArray.length) {
    pageBody = (<Row align="center">
      {usersArray.map(user => (
        <Col key={user.email} align='center' xs={12} sm={6} md={3} style={{ "marginTop": "10px", "marginBottom": "5px" }}>
          <User
            key={user.email}
            user={user}
            onClickEvent={userId => props.history.push('/admin/users/booksIssued/' + userId)} />
        </Col>))
      }
    </Row>);
  } else if (!loading) {
    pageBody = (<Message icon>
      <Icon name='circle notched' warning />
      <Message.Content>
        <Message.Header>No users found</Message.Header>
        Sorry! No one is using your library!
      </Message.Content>
    </Message>);
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              All Users
              </CardHeader>
            <CardBody>
              {pageBody}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

Users.propTypes = {
  history : PropTypes.object
}

export default Users;
