import React, { useEffect } from 'react'
import { HashRouter, Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import * as actions from './store/actions/index'
import Login from './containers/Auth/Login'
import UserPage from './containers/UserPage/UserPage'
import Admin from './containers/AdminPage/AdminPage'
import Page404 from './containers/Page404/Page404'
import Spinner from './components/UI/Spinner/Spinner'
import Aux from './hoc/_Aux/_Aux';
import Logout from './containers/Auth/Logout';

const App = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector( state => state.auth.token !== null);
  const users = useSelector( state => state.users.users);

  useEffect(()=>{
    dispatch(actions.authCheckState())
  },[])

    let renderThis = <Spinner />;
    if (users) {
      let routes = (
        <Switch>
          <Route path="/login" name="Login" component={Login} />
          <Route path="/404" name="404" component={Page404} />
          <Redirect from="/" to="/login" />
        </Switch>
      )

      if (isAuthenticated) {
        routes = (
          <Switch>
            <Route path="/404" name="404" component={Page404} />
            <Route path="/logout" name="Logout" component={Logout} />
            <Route path="/login" name="Login" component={Login} />
            <Route path="/user" name="Home-User" component={UserPage} />
            <Route path="/admin" name="Home-Admin" component={Admin} />
            <Redirect exact from="/" to={(users[localStorage.userId].role == "user") ? '/user' : '/admin'} />
          </Switch>
        )
      }
      renderThis = <HashRouter>{routes}</HashRouter>
    }

    return (
      <Aux>{renderThis}</Aux>
    )
  }

export default withRouter(App)
