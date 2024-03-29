import React, {Component} from 'react';
import axios from "axios";
import MapView from '../../components/map/MapView.js';
import Nav from '../../components/navigation/Nav.js';
import Greeting from '../../components/Greeting.js';
import ContactView from '../../components/contacts/ContactView';

class Main extends Component{

    state = {
        addresses: []
    }
      
    async componentDidMount() {
        const headers = {
            headers: { 'Authorization': sessionStorage.getItem("token") }
        };
        //get all addresses from db
        const addressData = await axios.get(process.env.REACT_APP_URL + 'api/addresses/', headers);
        const addresses = addressData.data;
        this.setState({ addresses: addresses});
    }

    render(){
        return(
            <section id="main">      
                <div className="Navbar">
                    <Greeting />
                    <Nav />
                </div>  
                <main>                  
                    <div className="mainscreen">
                        <div className="adresslist">
                            <ul id="adresses"> 
                                <ContactView  contacts={this.state.addresses}/>                       
                            </ul>
                        </div>
                        <div className="map">
                            <MapView addresses={this.state.addresses}/>
                        </div>
                    </div>          
                </main>
          </section>
        );
      } 
}

export default Main;