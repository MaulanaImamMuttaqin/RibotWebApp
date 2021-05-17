import React , {useState} from 'react'
import { useHistory } from 'react-router'
import firebase from "../../firebase"
import "./Login.css"
import {motion} from "framer-motion"


const loginVariant = {
    hidden: {
        opacity: 0,
        y: -20
    },
    visible:{
        opacity:1,
        y:0,
        transition : {
            ease : "easeInOut",
            delay:0.3
        }
    }
}

export default function Login() {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const signIn = ()=>{
        setLoading(true)
        firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .then(()=>{
            setLoading(false)
            console.log("login success")
            history.push("/")
        })
        .catch(error =>{
            console.log(error)
        })
    }   
    const signOut = () =>{
        firebase.auth().signOut()
    }
    return (
        <div className="login">
            <motion.div 
            variants={loginVariant}
            initial="hidden"
            animate="visible"
            className="container"className="input-form">
                <h3 className="subtitle">Please Login With Your Registered Account</h3>
                <input type="text" onChange={(e)=>{setEmail(e.target.value)}} value={email} placeholder="email"/>
                <input type="password" onChange={(e)=>{setPass(e.target.value)}} value={pass} placeholder="password"/>
                <button onClick={signIn}>KIRIM</button>
                <p style={{opacity: loading ? "1": "0", transition: "opacity .5s"}}>Loading...</p>
            </motion.div>
            
        </div>
    )
}
