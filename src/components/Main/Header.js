import React, { useContext , useState} from 'react'
import { AuthContext } from '../../Auth/AuthContext'
import firebase from "../../firebase"
import "./Header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Header() {
    const logOut = ()=>{
        firebase.auth().signOut()
    }
    const {currentUser} = useContext(AuthContext)
    // console.log(currentUser.uid)
    const username = currentUser ? currentUser.email : ""
    const uid = currentUser ? currentUser.uid : ""
    const [userDropdown, setUserDropdown] = useState(false)
    console.log(userDropdown)
    return (
        <div className="header">
            <div className="logo">
                <h1>RibotApp</h1>
            </div>
            <div className="user">
                
                <div className="user-greet">
                    <p>hello {username}</p>
                </div>
                <div className="user-profile">
                    <span onClick={()=> setUserDropdown(!userDropdown)}>
                        <FontAwesomeIcon className="icon" icon="user"/>
                    </span>
                    
                    
                        <div className={`userDropdown ${userDropdown && "userDropDown-show"}`}>
                            <span onClick={logOut}>Logout</span>
                            <FontAwesomeIcon icon="sign-out-alt"/>
                        </div>
                        
                    
                </div>
                
            </div>
        </div>
    )
}
