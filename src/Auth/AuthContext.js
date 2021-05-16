import React, { useEffect, useState } from 'react'
import firebase from "../firebase"
import {useLocation} from "react-router-dom";
import {useHistory} from "react-router"

export const AuthContext = React.createContext()

export function AuthProvider({children}){
    const[currentUser, setCurrentUser] = useState(null)

    const history = useHistory()
    const location = useLocation()


    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            setCurrentUser(user)
        })

    },[])

    
    // if(currentUser == null && (location.pathname != "/Login")){
    //     history.push("/Login")
    // }else if (currentUser != null){
    //     history.push("/")
    // }


    return (
        <AuthContext.Provider
            value={{currentUser}}
        >
            {children}
        </AuthContext.Provider>
    )
}