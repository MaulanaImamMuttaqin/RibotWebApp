import React, { useContext } from 'react'
import { AuthContext } from '../../Auth/AuthContext'
import firebase from "../../firebase"
import "./Header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Header() {
    const logOut = ()=>{
        firebase.auth().signOut()
    }
    const {currentUser} = useContext(AuthContext)
    console.log(currentUser)
    // console.log(currentUser.uid)
    const username = currentUser ? currentUser.email : ""
    const uid = currentUser ? currentUser.uid : ""
    
    return (
        <div className="header">
            <div className="logo">
                <h1>RibotApp</h1>
            </div>
            <div className="user">
                <p onClick={logOut}>Logout</p>
                <div className="user-greet">
                    <p>hello {username}</p>
                </div>
                <div className="user-profile">
                    <FontAwesomeIcon className="icon" icon="user"/>
                </div>
                
            </div>
        </div>
    )
}
