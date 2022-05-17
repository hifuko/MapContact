import React, {Component} from 'react';
import axios from "axios";
import MapView from './map/MapView.js';
import { connect } from 'react-redux'
import { add_contact } from '../redux/actions'
import Nav from './navigation/Nav.js';
import Greeting from './Greeting.js';
import ContactView from './contacts/ContactView';

class Main extends Component{

    state = {
        addresses: []
    }
      
    async componentDidMount() {
        const headers = {
            headers: { 'Authorization': sessionStorage.getItem("token") }
        };
        const addressData = await axios.get('http://localhost:3001/addresses/',headers);
        const addresses = addressData.data;
        this.setState({ addresses: addresses});
    }

    render(){
        return(
            <section id="main">        
                <main>                  
                    <div className="mainscreen">
                        <div className="adresslist">
                            <ul id="adresses"> 
                                <ContactView contacts={this.state.addresses}/>   
                            </ul>
                        </div>
                        <div className="map">
                            <MapView addresses={this.state.addresses}/>
                        </div>
                    </div>          
                </main>

            <div className="Navbar">
            <Greeting />
            <Nav />
            </div>
            
          </section>
        );
      } 
}

export default connect(
    state => state,
    {add_contact}
  )(Main);