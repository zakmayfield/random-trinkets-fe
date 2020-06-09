import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Register from './components/Register'
import Login from './components/Login'
import Shop from './components/Shop'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

function App () {
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <Switch>
            <Route path='/register'>
              <Register />
            </Route>

            <Route path='/login'>
              <Login />
            </Route>

            <ProtectedRoute path='/shop' component={Shop} />
            <ProtectedRoute path='/:userId/cart' component={Cart} />

            <Route path='/' component={Login} />
          </Switch>
        </header>
      </div>
    </Router>
  )
}

export default App
