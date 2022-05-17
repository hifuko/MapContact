// MODULES
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/routing/ProtectedRoutes';
// LAYOUT
import './css/App.css';
// COMPONENTS
import Login from './components/login/Login';
import Main from './components/Main';
import Add from './components/contacts/Add';
import UpdateDelete from './components/contacts/UpdateDelete';

class App extends Component {

  render(){
    return(
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path='/adviz/login' component={Login} />
            <ProtectedRoute path='/adviz/main' component={Main} />
            <ProtectedRoute exact path='/main/' component={Main} />
            <ProtectedRoute exact path='/adviz/' component={Main} />
            <ProtectedRoute exact path='/' component={Main} />
            <ProtectedRoute path='/adviz/add' component={Add} />
            <ProtectedRoute path='/adviz/:address_id' component={UpdateDelete} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;