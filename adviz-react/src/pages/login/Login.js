import React, {Component} from 'react';
import { Input, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axios from "axios";
import 'semantic-ui-css/semantic.min.css'


class Login extends Component{

  handleSubmit = (e) => {
    e.preventDefault()
    // SETUP REQUEST
    const headers = {
      'Content-Type': 'application/json'
    };
    let logindata = {
      "identification": document.querySelector("#un").value,
      "password": document.querySelector("#pw").value
    };
    // FIRE AND PROCESS REQUEST
    (async () => {
      await axios.post('http://localhost:3001/auth/login',logindata,headers)
        .then(
          (resp) => {
            console.log("RESPONSE ",resp);
            let token = resp.data.token;
            let user = resp.data.user
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("isAdmin", user.isAdmin);
            sessionStorage.setItem("firstName", user.firstName);
            sessionStorage.setItem("lastName", user.lastName);
            sessionStorage.setItem("loggedin",true);
            this.props.history.push('/adviz/main')
          })
        .catch(error => {
          alert("Wrong username or password");
        });
    })();
  }
      
  render(){
    return(
      <section id="login">
        <login>
          <h1>Login</h1>
          <form name="loginform" className="loginform" onSubmit={this.handleSubmit} method="GET">
              <div>
                  <label>Username</label> 
                  <br/>
                  <Input id="un" type="text" name="username" size='mini' required={true} pattern="[a-zA-Z]*" placeholder="Username"/>
              </div>         
              <div>
                  <label>Password</label>
                  <br/>
                  <Input id="pw" type="password" name="password" size='mini' required={true} pattern=".*" placeholder="password"/>                 
              </div>
              <div className="login_link">
                <Link to="/main" onClick={this.handleSubmit}>
                  <Button id="login_btn" type="submit" value="Login" color='pink'>Login</Button>
                </Link>
              </div>
          </form>
        </login>
      </section>
    );
  }  
}

export default Login