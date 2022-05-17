import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

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
        <main>
          <h1>Login</h1>
          <form name="loginform" class="loginform" onSubmit={this.handleSubmit} method="GET">
              <div>
                  <input id="un" type="text" name="username" required="true" pattern="[a-zA-Z]*" placeholder="default"/>
                  <label>Username</label>
              </div>
              <div>
                  <input id="pw" type="password" name="password" required="true" pattern=".*" placeholder="user"/>
                  <label>Password</label>
              </div>
              <div>
                <Link to="/main" onClick={this.handleSubmit}>
                  <input id="login_btn" type="submit" class="btn" value="Login"/>
                </Link>
              </div>
          </form>
        </main>
      </section>
    );
  }  
}

export default Login