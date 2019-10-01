import React, { useState, useEffect } from 'react';
import { Input, Card, CardFooter, CardBody, Col, Container, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Button, Divider, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions';
import PropTypes from 'prop-types';

const Login = props => {
  const dispatch = useDispatch();

  const { loading, error, isAuthenticated, authRedirectPath, emailId } = useSelector(state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    emailId: state.auth.email
  }), shallowEqual)

  const [isSignup, setIsSignup] = useState(true);
  const [email, setEmail] = useState({
    value: '',
    validation: {
      required: true,
      isEmail: true
    },
    valid: false,
    touched: false
  });
  const [password, setPassword] = useState({
    value: '',
    validation: {
      required: true,
      minLength: 6
    },
    valid: false,
    touched: false
  })

  useEffect(() =>{
    if (authRedirectPath !== '/') {
      dispatch(actions.setAuthRedirectPath('/'));
    }
  }, [])

  useEffect(() =>{
    if (props.isSignup) {
      dispatch(actions.createUser({ userId: localStorage.userId, email: emailId, role: "user" }))
    }
  }, [])

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }

    return isValid;
  }

  const updateEmail = (event) => {
    const target = event.target;
    setEmail(email => ({
      ...email,
      value: target.value,
      valid: checkValidity(target.value, email.validation),
      touched: true
    }))
  }

  const updatePassword = (event) => {
    const target = event.target;
    setPassword(password => ({
      ...password,
      value: target.value,
      valid: checkValidity(target.value, password.validation),
      touched: true
    }))
  }

    let errorMessage = null;
    if (error) {
      errorMessage = (
        <Message negative>
          <Message.Header>Failed..!</Message.Header>
          <p>{error.message}</p>
        </Message>
      );
    }

    let authRedirect = null;
    if (isAuthenticated) {
      authRedirect = <Redirect to={authRedirectPath} />
    }

    return (

      <div className="app flex-row align-items-center">
        <Container>
          {authRedirect}

          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Row>
                    <Col xs="12" sm="6" md="4">
                      <h1>{isSignup ? 'Register' : 'Login'}</h1>
                      <p className="text-muted">{isSignup ? 'Create your account' : 'Sign In to your account'}</p>
                    </Col>
                    <Col xs="12" sm="6" md="8">
                      {errorMessage}
                    </Col>
                  </Row>
                  <br />
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Email"
                      value={email.value}
                      onChange={event => updateEmail(event)} />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="Password"
                      value={password.value}
                      onChange={event => updatePassword(event)} />
                  </InputGroup>
                </CardBody>
                <CardFooter className="p-4">
                  <Button primary fluid onClick={() => dispatch(actions.auth(email.value, password.value, isSignup))}
                    loading={loading}>
                    <span>{isSignup ? 'SignUp' : 'Login'}</span>
                  </Button>
                  <Divider horizontal>Or</Divider>
                  <Button secondary fluid onClick={() => setIsSignup(isSignup => !isSignup)}>
                    <span>Switch to {isSignup ? 'Login' : 'SignUp'}</span></Button>

                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
}

Login.propTypes = {
  isSignup: PropTypes.bool
}

export default Login;