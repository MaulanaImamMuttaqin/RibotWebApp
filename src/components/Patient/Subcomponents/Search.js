import React, {useState, useRef} from 'react'
import {motion} from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Search.css"
import firebase from "../../../firebase";
import { useHistory } from 'react-router';

export default function Search() {
    const db = firebase.firestore()
    const patient = db.collection("patient")

    const history = useHistory()
    

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
    
    const patientDetail = (nik)=>{
        history.push(`/Patient/Detail/${nik}`)
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
                                    <span>No</span>
                                    <span>NAMA</span>
                                    <span>NIK</span>
                                </div>

                                {patientData.map((data, index) => 
                                    <div className="table table-body" onClick={()=>patientDetail(data.nik)} key={data.nik}>
                                        <span>{index+1}</span>
                                        <span>{data.name}</span>
                                        <span>{data.nik}</span>
                                    </div>
                                )}
                            </div>
                        {/* }  */}
                    
               
                </div>
            </div>
        </motion.div>
    )
}
