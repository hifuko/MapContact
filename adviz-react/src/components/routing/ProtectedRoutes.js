// Reference: https://stackoverflow.com/questions/48497510/simple-conditional-routing-in-reactjs#48497783
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class ProtectedRoute extends Component {
    render() {
        const { component: Component, ...props } = this.props
        let loggedin = sessionStorage.getItem("loggedin");
        return (
            <Route 
            {...props} 
            render={props => (
                loggedin === "true" ?
                <Component {...props} /> :
                <Redirect to='/adviz/login' />
            )} 
            />
        )
    }
  }

  export default ProtectedRoute
 