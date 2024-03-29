import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Contact extends Component{

    render(){ 
        if (sessionStorage.getItem("isAdmin") === "false" && this.props.obj.isPrivate == true ) {
            return("");
        } else {
            return(
                <Link to = {{pathname: `/adviz/${this.props.id}`}} className="reactLink">
                    <li id={this.props.id}>{this.props.obj.firstName + " " + this.props.obj.lastName}</li>
                </Link>
            );
        }
      }
}

export default Contact;