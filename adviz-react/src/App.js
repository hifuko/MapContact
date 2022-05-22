// MODULES
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from './components/routing/ProtectedRoutes';
// LAYOUT
import './css/App.css';
// ROUTING COMPONENTS (PAGES)
import Login from './pages/login/Login';
import Main from './pages/contacts/Main';
import Add from './pages/contacts/Add';
import UpdateDelete from './pages/contacts/UpdateDelete';

class App extends Component {

  render(){
    return(
        <div className="App">

        {/* Switch: 1 path should only match 1 component. when matched, the current component will be rendered without checking if the next routes match */}
          <Switch>
            <Route path='/adviz/login' component={Login} />
            <ProtectedRoute path='/adviz/main' component={Main} />
           
            {/* <ProtectedRoute exact path='/main/' component={Main} />
            <ProtectedRoute exact path='/adviz/' component={Main} />
            <ProtectedRoute exact path='/' component={Main} /> */}
            <ProtectedRoute path='/adviz/add' component={Add} />
            <ProtectedRoute path='/adviz/:address_id' component={UpdateDelete} />
            {/* when all routes above are not matched, then redirect to main */}
            <Redirect to='/adviz/main'/>
          </Switch>
        </div>
    )
  }
}

export default App;