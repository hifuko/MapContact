import React, {Component} from 'react';
import { Link } from 'react-router-dom';

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
          <Link to="/adviz/main">
            <li>Main</li>
          </Link>
          <Link to="/adviz/add">
            <li>Add address</li>
          </Link>
          <Link to="/adviz/login" onClick={this.handleSubmit}>
            <li>Log out</li>
          </Link>
          </ul>
        </nav>
      );
    } else {
      return(
        <nav>
          <ul id="navigation">
          <Link to="/adviz/main">
            <li>Main</li>
          </Link>
          <Link to="/adviz/login" onClick={this.handleSubmit}>
            <li>Log out</li>
          </Link>
          </ul>
        </nav>
      );
    }
  }  
}