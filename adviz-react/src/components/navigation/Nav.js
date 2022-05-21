import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

export default class Nav extends Component{

  handleSubmit = (e) => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isAdmin");
    sessionStorage.removeItem("firstName");
    sessionStorage.removeItem("lastName");
    sessionStorage.setItem("loggedin",false);
  }

  render(){
    if (sessionStorage.getItem("isAdmin") === "true" ) {
      return(
        <nav>
          <ul id="navigation">
          <NavLink activeClassName="navActive" to="/adviz/main">
            <li>Main</li>
          </NavLink>
          <NavLink activeClassName="navActive" to="/adviz/add">
            <li>Add address</li>
          </NavLink>
          <NavLink to="/adviz/login" onClick={this.handleSubmit}>
            <li>Log out</li>
          </NavLink>
          </ul>
        </nav>
      );
    } else {
      return(
        <nav>
          <ul id="navigation">
          <NavLink activeClassName="navActive" to="/adviz/main">
            <li>Main</li>
          </NavLink>
          <NavLink to="/adviz/login" onClick={this.handleSubmit}>
            <li>Log out</li>
          </NavLink>
          </ul>
        </nav>
      );
    }
  }  
}