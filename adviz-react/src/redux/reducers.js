import {ADD_CONTACT, UPDATE, CLICK_CONTACT, DELETE, SET_USERROLE, SET_LOGGEDIN} from './actionTypes'

let objs = []
let len = localStorage.length;

for (let i = 0; i < len; i++) {
    let key = localStorage.key(i);
    if (key.startsWith("person_")) {
        let text = localStorage.getItem(key);
        let obj = JSON.parse(text);
        objs.push(obj)
    }
}

const initState = {
    loggedin: false,
    userRole: "",
    addresses: [],
    objects: objs,
    contact_id: "",
    index: -1
};

export default function reducer(state = initState, action) {
    console.log('==============reducer()', state, action)
    switch (action.type) {
        case ADD_CONTACT:
            const contacts = state.objects 
            contacts.push(action.payload)         
            return {
                objects: contacts
            };
        case CLICK_CONTACT:
            return {
                ...state,
                contact_id: action.payload.key,
                index: action.payload.index
            };    
        case UPDATE:
            const contacts2 = state.objects 
            contacts2[state.index] = action.payload
            return {
                objects: contacts2
            }    
        case DELETE:
            const contacts3 = state.objects
            delete contacts3[state.index]
            return{
                objects: contacts3
            }
        case SET_LOGGEDIN:
            return {
                ...state,
                loggedin: action.payload
            };
        case SET_USERROLE:
            return {
                ...state,
                userRole: action.payload
            }
        default:
            return initState;
    }
}

