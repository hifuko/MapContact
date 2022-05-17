// MODULES
import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import {Marker} from 'react-leaflet';
import L from 'leaflet';
// RESOURCES
import icon from 'leaflet/dist/images/marker-icon.png';

class MapView extends Component {

    state = {
        lat: 52.520815,
        lng: 13.409419,
        zoom: 11,
        geodata: []
    }
    
    render() {
        // SETUP MAP ICON
        let DefaultIcon = L.icon({
            iconUrl: icon,
            iconSize: [20, 30],
            iconAnchor: [10, 30]
        });
        L.Marker.prototype.options.icon = DefaultIcon;
        // RENDER MAP
        return (
            this.props.addresses ?
            <Map 
            center={ [this.state.lat,this.state.lng] } 
            zoom={ this.state.zoom } 
            style={{ width: '100%', height: '100%'}}>
            <TileLayer
                attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                
                {
                    Object.values(this.props.addresses).map((addressData,key) => {
                        if (key == 1) {
                            addressData.map(address => {
                                if (!(sessionStorage.getItem("isAdmin") === "false" && address.isPrivate == true) ) {
                                    const geodata = [Number(address.latitude),Number(address.longitude)]
                                    this.state.geodata.push(geodata)
                                }
                            })
                        }
                    })
                }
                {
                    this.state.geodata.map(data=>{
                        return <Marker position={ data } />
                    })
                }

            </Map>
            :
            'Data is loading..'
        );
     }
 }

 export default MapView;