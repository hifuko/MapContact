// MODULES
import React, { Component } from 'react'
import Contact from './Contact.js';

class ContactView extends Component {
    render() {
        let contactList = [];
        return(
            this.props.contacts?
            Object.values(this.props.contacts).map((contactData,key) => {
                if (key == 1) {
                    contactData.map( (contact,key) => {
                        //console.log("KONTAKT ID ", contact._id)
                        let listItem = <Contact id={contact._id} key={contact._id} obj={contact} objects={this.props.objects}/>
                        contactList.push(listItem);          
                    })
                    return contactList;
                }
            })
            :
            'no content'
        );
    }
}
export default ContactView;