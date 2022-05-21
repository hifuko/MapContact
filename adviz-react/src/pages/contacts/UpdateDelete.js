import React, {Component} from 'react';
import axios from "axios";
import { update, delete_ } from '../../redux/actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Nav from '../../components/navigation/Nav.js';
import Greeting from '../../components/Greeting.js';
import { Input, Button } from 'semantic-ui-react'

class UpdateDelete extends Component{

    componentDidMount(){
        // SET FIELDS
        let firstName = document.querySelector("#fn");
        let name = document.querySelector("#n");
        let street = document.querySelector("#street");
        let postCode = document.querySelector("#pc");
        let city = document.querySelector("#city");
        let country = document.querySelector("#country");
        let isPrivate = document.querySelector("#pr");
        // INIT FIELDS BY DB REQUEST
        const headers = {
            headers: { 'Authorization': sessionStorage.getItem("token") }
        };
        const url = "http://localhost:3001/addresses/" + this.props.match.params.address_id 
        axios.get(url,headers)
        .then( response => {
            console.log(response.data.address)
            firstName.value = response.data.address.firstName;
            name.value = response.data.address.lastName;
            street.value = response.data.address.street;
            postCode.value = response.data.address.postCode;
            city.value = response.data.address.city;
            country.value = response.data.address.country;
            isPrivate.checked = response.data.address.isPrivate;
        });
        //normalo can only read contact info
        if (sessionStorage.getItem("isAdmin") === "false") {
            firstName.disabled = "disabled";
            name.disabled = "disabled";
            street.disabled = "disabled";
            postCode.disabled = "disabled";
            city.disabled = "disabled";
            country.disabled = "disabled";
            isPrivate.disabled = "disabled";
        }
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

    update = (e) => {
        e.preventDefault()

        let firstName = document.querySelector("#fn").value;
        let lastName = document.querySelector("#n").value;
        let street = document.querySelector("#street").value;
        let postCode = document.querySelector("#pc").value;
        let city = document.querySelector("#city").value;
        let country = document.querySelector("#country").value;
        let isPrivate = document.querySelector("#pr").checked;

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
                    if ( geodata === "undefined") {
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
        
                        const base = "http://localhost:3001/addresses/";
                        const identification = String(this.props.match.params.address_id);
                        const url = String.prototype.concat(base,identification);
                        // axios.patch(url,payload,headers);
                        // this.props.history.push('/adviz/main')


                        axios.patch(url,payload,headers).then(()=>{
                            this.props.history.push('/adviz/main')
                        })

                    }
                });
        } else {
            alert("Invalid Input");
        }       
    }
      
    delete = (e) => {
        e.preventDefault();
        const headers = {
            headers: { 'Authorization': sessionStorage.getItem("token") }
        };
        const base = "http://localhost:3001/addresses/";
        const identification = String(this.props.match.params.address_id);
        const url = String.prototype.concat(base,identification);
        //axios.delete(url,headers);

        axios.delete(url,headers).then(()=>{
            this.props.history.push('/adviz/main')

        })
    }

    render(){
        if (sessionStorage.getItem("isAdmin") === "true" ) {
            return(
                <section id="updateDeleteAddress">
                    <div className="Navbar">
                        <Greeting />
                        <Nav />
                    </div>
                    <div class="update">
                        <h1 style={{"text-align": "center"}}>Update/Delete address</h1>
                        <form action={this.handleAction} onSubmit={this.handleBackClick} method="GET" class="up_form">
                            <table>
                            <tr>
                                <td><label for="fn">First Name</label></td>
                                <td><Input type="text" size='mini' name="firstName" id="fn" pattern="[a-zA-Z]*" required/></td>
                            </tr>
                            <tr>
                                <td><label for="n">Name</label></td>
                                <td><Input type="text" size='mini' name="name" id="n" pattern="[a-zA-Z]*" required/></td>
                            </tr>
                            <tr>
                                <td><label for="street">Street</label></td>
                                <td><Input type="text" size='mini' name="street" id="street" required/></td>
                            </tr>
                            <tr>
                                <td><label for="pc">Post Code</label></td>
                                <td><Input type="text" size='mini' name="postCode" id="pc" pattern="[0-9]{5}" required/></td>
                            </tr>
                            <tr>
                                <td><label for="city">City</label></td>
                                <td><Input type="text" size='mini' name="city" id="city" pattern="[a-zA-Z]*" required/></td>
                            </tr>
                            <tr>
                                <td><label for="country">Country</label></td>
                                <td><Input type="text" size='mini' name="firstName" id="country" pattern="[a-zA-Z]*" required/></td>
                            </tr>
                            <tr>
                                <td><label for="pr">Private</label></td>
                                <td><Input type="checkbox" name="private" id="pr" value="yes" style={{"zoom": "1.2"}}/></td>
                            </tr>

                            </table>
                           
                            <div style={{"padding-left": "2em"}}>
                            {/* </Link> */}
                                <Link to="/adviz/main">
                                    <Button size='large' id="back" style={{"margin-right": "1em"}}>Back</Button>
                                </Link>
                                {/* <Link to="/adviz/main"> */}
                                <Button id="update" size='large' onClick={this.update} color='pink' style={{"margin-right": "1em"}}>Update</Button>
                                {/* </Link> */}
                                {/* <Link to="/adviz/main"> */}
                                <Button id="delete" size='large' onClick={this.delete} color='black'>Delete</Button>                                
                            </div>
                        </form>
                    </div>         
                </section>
            );
        } else {
            return(
                <section id="updateDeleteAddress">
                    <div class="up">
                        <h1 style={{"text-align": "center"}}>Update/Delete address</h1>
                        <form action={this.handleAction} onSubmit={this.handleBackClick} method="GET" class="up_form">
                            <table>
                            <tr>
                                <td><label for="fn">First Name</label></td>
                                <td><Input type="text" name="firstName" id="fn" pattern="[a-zA-Z]*" required/></td>
                            </tr>
                            <tr>
                                <td><label for="n">Name</label></td>
                                <td><Input type="text" name="name" id="n" pattern="[a-zA-Z]*" required/></td>
                            </tr>
                            <tr>
                                <td><label for="street">Street</label></td>
                                <td><Input type="text" name="street" id="street" required/></td>
                            </tr>
                            <tr>
                                <td><label for="pc">Post Code</label></td>
                                <td><Input type="text" name="postCode" id="pc" pattern="[0-9]{5}" required/></td>
                            </tr>
                            <tr>
                                <td><label for="city">City</label></td>
                                <td><Input type="text" name="city" id="city" pattern="[a-zA-Z]*" required/></td>
                            </tr>
                            <tr>
                                <td><label for="country">Country</label></td>
                                <td><Input type="text" name="firstName" id="country" pattern="[a-zA-Z]*" required/></td>
                            </tr>
                            <tr>
                                <td><label for="pr">Private</label></td>
                                <td><Input type="checkbox" name="private" id="pr" value="yes" style={{"zoom": "1.5"}}/></td>
                            </tr>

                            </table>
                            <div style={{"padding-left": "120px"}}>
                                <Link to="/adviz/main">
                                    <button class="btn" id="back">back</button>
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
}

export default connect(
    state=>state,
    {update, delete_}
  )(UpdateDelete);

