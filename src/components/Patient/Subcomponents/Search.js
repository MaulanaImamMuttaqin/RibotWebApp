import React, {useState, useRef} from 'react'
import {motion} from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Search.css"
import firebase from "../../../firebase";

export default function Search() {
    const db = firebase.firestore()
    const patient = db.collection("patient")

    const [input, setInput] = useState("")
    const [load, setLoad] = useState(false)
    const [patientData, setPatientData] = useState([])

    const SearchInput = useRef("")
    const table = useRef("")
    const loading = useRef("")
    
    
    const inputValue = e =>{
        setInput(e.target.value)
    }
    const sendValue = () =>{
        setLoad(true)
        patient.orderBy("name").get()
        .then(result=>{
            const items = []
            result.forEach(doc =>{
                items.push(doc.data())
            })
            setPatientData(items)
            setLoad(false)
            table.current.style.display = "block"
            SearchInput.current.style.height = "20%"
        })
      
    }
    
    return (
        <motion.div>
            <div className="search">
                <div className="search-title">

                </div>
                <div className="search-input" ref={SearchInput}>
                    <div>
                        <input type="text" onChange={(e)=> inputValue(e)}/>
                        <button className="search-button" onClick={sendValue}><FontAwesomeIcon icon="search"/></button>
                    </div>
                    <p style={{opacity: load ? "1": "0"}}>loading...</p>
                </div>
                <div className="search-result">
                    
                        {/* {load ? <h1>Fetching</h1> :  */}
                            <div ref={table} className="table-container">
                                <div className="table table-head">
                                    <span>NAMA</span>
                                    <span>NIK</span>
                                    <span>DOMISILI</span>
                                    <span>E-MAIL</span>
                                    <span>NO HP</span>
                                </div>

                                {patientData.map(data => 
                                    <div className="table table-body">
                                        <span>{data.name}</span>
                                        <span>{data.nik}</span>
                                        <span>{data.domisili}</span>
                                        <span>{data.email}</span>
                                        <span>{data.no_hp}</span>
                                    </div>
                                )}
                            </div>
                        {/* }  */}
                    
               
                </div>
            </div>
        </motion.div>
    )
}
