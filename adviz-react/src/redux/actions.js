import { ADD_CONTACT, UPDATE, CLICK_CONTACT, DELETE, SET_LOGGEDIN } from "./actionTypes";

export const add_contact = (contact) => ({type: ADD_CONTACT, payload: contact}) 

export const click_contact = (key_index) => ({type: CLICK_CONTACT, payload: key_index})

export const update = (contact) => ({type: UPDATE, payload: contact})

export const delete_ = () => ({type: DELETE, payload: 1})

export const login = () => ({type: SET_LOGGEDIN, payload: true})

export const logout = () => ({type: SET_LOGGEDIN, payload: false})

export const set_userRole = (userRole) => ({type: SET_LOGGEDIN, payload: userRole})

