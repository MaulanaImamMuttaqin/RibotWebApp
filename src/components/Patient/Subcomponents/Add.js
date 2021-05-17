import React, {useState, useRef} from 'react'
import {motion} from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Add.css"
import firebase from "../../../firebase";

export default function Add() {
    const db = firebase.firestore()
    const patient = db.collection("patient")
    const [input, setInput] = useState({})
    

    const inputValue = (e, name) => {
        input[name] = e.target.value
    }

    const sendValue = () =>{
        const {name, nik, domisili, email, no_hp} = input;

        patient.doc(nik).set({
            name:name,
            nik:nik,
            domisili:domisili,
            email:email,
            no_hp:no_hp
        })
        .then(() => {
            setInput({})
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }
    return (
        <motion.div className="container">
            <div className="add">
                <div className="add-title">
                    <h1>Add New Patient</h1>
                </div>
                <div className="add-form">
                    <input type="text" onChange={(e) => inputValue(e, "name")} placeholder="Name" value={input["name"]}/>
                    <input type="number" onChange={(e) => inputValue(e, "nik")} placeholder="NIK" value={input["nik"]}/>
                    <input type="text" onChange={(e) => inputValue(e, "domisili")} placeholder="Domisili" value={input["domisili"]}/>
                    <input type="email" onChange={(e) => inputValue(e, "email")} placeholder="Email" value={input["email"]}/>
                    <input type="text" onChange={(e) => inputValue(e, "no_hp")} placeholder="No HP" value={input["no_hp"]}/>
                    <button className="search-button" onClick={sendValue}><FontAwesomeIcon icon="plus"/></button>
                </div>
            </div>
        </motion.div>
    )
}
