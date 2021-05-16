import React , {useState} from 'react'
import firebase from "../../firebase"
import "./Login.css"

export default function Login() {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")


    const signIn = ()=>{
        firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .then(()=>{
            console.log("login success")
        })
        .catch(error =>{
            console.log(error)
        })
    }   

    const signOut = () =>{
        firebase.auth().signOut()
    }
    
    return (
        <div>
            <input type="text" onChange={(e)=>{setEmail(e.target.value)}} value={email} placeholder="email"/>
            <input type="password" onChange={(e)=>{setPass(e.target.value)}} value={pass} placeholder="password"/>
            <button onClick={signIn}>KIRIM</button>
            <button onClick={signOut}>sign out</button>
        </div>
    )
}
