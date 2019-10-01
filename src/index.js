import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import 'semantic-ui-css/semantic.min.css'
import 'antd/dist/antd.css'
import 'flag-icon-css/css/flag-icon.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'simple-line-icons/css/simple-line-icons.css'
import '../scss/style.scss'
import '../scss/core/_dropdown-menu-right.scss'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

import configureStore from './store/configureStore'
import * as Actions from './store/actions'
import App from './App'

const store = configureStore()
store.dispatch(Actions.fetchIssuedBooks(localStorage.userId))
store.dispatch(Actions.fetchAllBooks())
store.dispatch(Actions.fetchUsers())

ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root'),
)

