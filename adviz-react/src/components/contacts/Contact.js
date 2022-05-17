import React, {Component} from 'react';
import { click_contact } from '../../redux/actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class Contact extends Component{
   
    handleClick = (e) => {

        // let key = this.props.id
        // console.log("==========================Contact: " + key)

        // let text = localStorage.getItem(key);
        // let obj = JSON.parse(text);

        // let objects = this.props.objects
        // let index = 100

        // for (let i = 0; i < objects.length; i++) {
        //     if (objects[i] != null) {
        //         if (objects[i].firstName===obj.firstName && objects[i].name===obj.name) {
        //             index = i
        //         }
        //     }            
        // }

        // const key_index = {
        //     key: key,
        //     index: index
        // }
        // this.props.click_contact(key_index)

        // document.querySelector("#addNewAddress").style.display = "none";
        // document.querySelector("#main").style.display = "none";
        // document.querySelector("#updateDeleteAddress").style.display = "block";
    }

    render(){ 
        if (sessionStorage.getItem("isAdmin") === "false" && this.props.obj.isPrivate == true ) {
            return("");
        } else {
            return(
                <Link to = {{pathname: `/adviz/${this.props.id}`}} params={{ id: this.props.id }} class="reactLink">
                    <li onClick={this.handleClick} id={this.props.id}>{this.props.obj.firstName + " " + this.props.obj.lastName}</li>
                </Link>
            );
        }
      }
    
    
}


export default connect(
    state=>state,
    {click_contact}
  )(Contact);