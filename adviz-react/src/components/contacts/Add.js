import React, {Component} from 'react';
import axios from "axios";
import { add_contact } from '../../redux/actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Nav from '../navigation/Nav.js';
import Greeting from '../Greeting.js';
import { Input, Button } from 'semantic-ui-react'

class Add extends Component{

  
    handleAdd = (e) => {
      
    }

    isNull(str) {
        if (str === "") {
            return true;
        }
        var regu = "^[ ]+$";
        var re = new RegExp(regu);
        return re.test(str);
    }

    resolveAddress = (street,plz) => {
        // SETUP REQUEST
        street = street.replace(/ /g, '+');
        let postcode = plz;
        // let country = address.country; // unused
        let url = "https://nominatim.openstreetmap.org/search?postalcode=" + postcode + "&street=" + street + "&format=json&addressdetails=1";
        // console.log(address + " " + url);
        // FIRE REQUEST AND RETURN GEOGRAPHICAL DATA
        return fetch(url)
                .then(function (response) {
                        return response.json();
                })
                .then(function (jsonResponse) {
                        if (jsonResponse == false || typeof (jsonResponse) == "undefined") {
                                return false;
                        }
                        let lat = jsonResponse[0].lat;
                        let lon = jsonResponse[0].lon;
                        return [lat, lon];
                });
    }

    handleSubmit = (e) => {

      e.preventDefault()

      let firstName = document.querySelector("#fn2").value;
      let lastName = document.querySelector("#n2").value;
      let street = document.querySelector("#street2").value;
      let postCode = document.querySelector("#pc2").value;
      let city = document.querySelector("#city2").value;
      let country = document.querySelector("#country2").value;
      let isPrivate = document.querySelector("#pr2").checked;

      let fn_test = /^[a-zA-Z]+$/.test(firstName);
      let ln_test = /^[a-zA-Z]+$/.test(lastName);
      let street_test = !this.isNull(street);
      let pc_test = /^[0-9]{5}$/.test(postCode);
      let city_test = /^[a-zA-Z]+$/.test(city);
      let country_test = /^[a-zA-Z]+$/.test(country);


      if (fn_test && ln_test && street_test && pc_test && city_test && country_test) {

             this.resolveAddress(street,postCode)
              .then( geodata => {
                  console.log("GEODATA", geodata);
                  if ( geodata == "undefined") {
                      alert("Invalid");
                  } else {
                      const headers = {
                          headers: { 'Authorization': sessionStorage.getItem("token") }
                      };
      
                      let payload = {
                          "firstName": firstName,
                          "lastName": lastName,
                          "street": street,
                          "postCode": postCode,
                          "city": city,
                          "country": country,
                          "isPrivate": isPrivate,
                          "latitude": geodata[0],
                          "longitude": geodata[1],
                      };
      
                      const url = "http://localhost:3001/addresses/";
                      // axios.post(url,payload,headers);
                      // this.props.history.push('/adviz/main')
                      axios.post(url,payload,headers).then(()=>{
                        this.props.history.push('/adviz/main')
                      })

                  }
              });
      } else {
          alert("Invalid Input");
      }  
    
      



      // //e.preventDefault()

      // let firstName = document.querySelector("#fn2").value;
      // let name = document.querySelector("#n2").value;
      // let street = document.querySelector("#street2").value;
      // let postCode = document.querySelector("#pc2").value;
      // let city = document.querySelector("#city2").value;
      // let country = document.querySelector("#country2").value;
      // // "private" is a reserved word 
      // let private_ = document.querySelector("#pr2").checked;
  
  
      // let myObj = {
      //     "firstName": firstName,
      //     "name": name,
      //     "street": street,
      //     "postCode": postCode,
      //     "city": city,
      //     "country": country,
      //     "private_": private_
      // };
  
      

      // let myJSON = JSON.stringify(myObj);
      // localStorage.setItem("person_" + firstName + " " + name, myJSON);

      // //this.props.handleAddContact(myObj)

      // //store.dispatch(add_contact(myObj))
      // this.props.add_contact(myObj)
  
      // document.querySelector("#addNewAddress").style.display = "none";
      // document.querySelector("#main").style.display = "block";
      // document.querySelector("#addform").reset();

      // todo route back to main

    }
  

    // handleBackClick = (e) => {
    //   // document.querySelector("#addNewAddress").style.display = "none";
    //   // document.querySelector("#main").style.display = "block";
    //   document.querySelector("#addform").reset();

    // }
   

    render(){
      
      return(
        <section id="addNewAddress">
    
          <div class="add">
            <h1 style={{"text-align": "center"}}>New Address</h1>

            <form id="addform" action={this.handleAdd} onSubmit={this.handleSubmit} method="GET" class="add_form">
              <table>
                <tr>
                    <td><label for="fn2">First Name</label></td>
                    <td><Input type="text" name="firstName" size='mini' pattern="[a-zA-Z]*" id="fn2" required/></td>
                </tr>
                <tr>
                    <td><label for="n2">Name</label></td>
                    <td><Input type="text" name="name" size='mini' pattern="[a-zA-Z]*" id="n2" required/></td>
                </tr>
                <tr>
                    <td><label for="street2">Street</label></td>
                    <td><Input type="text" name="street" size='mini' id="street2" required/></td>
                </tr>
                <tr>
                    <td><label for="pc2">Post Code</label></td>
                    <td><Input type="text" name="postCode" size='mini' id="pc2" pattern="[0-9]{5}" required/></td>
                </tr>
                <tr>
                    <td><label for="city2">City</label></td>
                    <td><Input type="text" name="city" id="city2" size='mini' pattern="[a-zA-Z]*" required/></td>
                </tr>
                <tr>
                    <td><label for="country2">Country</label></td>
                    <td><Input type="text" name="firstName" id="country2" size='mini' pattern="[a-zA-Z]*" required/></td>
                </tr>
                <tr>
                    <td><label for="pr2">private</label></td>
                    <td><Input type="checkbox" name="private_" value="yes" size='mini' id="pr2" style={{"zoom" : "1.5"}}/></td>
                </tr>

              </table>
              <div align="center">          
                {/* <button class="btn" id="back2" onClick={this.handleBackClick} to='/main'>back</button> */}
                <Link to="/adviz/main">
                  <Button size='large'>back</Button>
                </Link>
                 {/* onClick={() => this.props.handleAddContact(this.state.newObj)} */}
                 <Link to="/adviz/main">
                  <Button id="add_btn" size='large' onClick={this.handleSubmit} color='pink'>Add</Button>
                </Link>
              </div>
            </form>
          </div>
          <div className="Navbar">
            <Greeting />
            <Nav />
          </div>
        </section>
            
        );
      }
    
    
}

export default connect(
  state=>state,
  {add_contact}
)(Add);