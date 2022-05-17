import React, {Component} from 'react';

export default class Greeting extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            userRole: ""
        }
    }

    componentDidMount() {
        this.setState({
            firstName: sessionStorage.getItem("firstName"),
            lastName: sessionStorage.getItem("lastName"),
        });

        if ( sessionStorage.getItem("isAdmin") === "true" ) {
            this.setState({
                userRole: "administrator"
            });
        } else {
            this.setState({
                userRole: "user"
            });
        }
    }

    render(){
        return(
            <p className="greetingLabel">
                Hello { this.state.firstName } { this.state.lastName }, you are logged in as { this.state.userRole }
            </p>
        );
    }
}
    