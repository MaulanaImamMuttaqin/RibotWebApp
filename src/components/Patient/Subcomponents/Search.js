import React, {useState, useRef} from 'react'
import {motion} from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Search.css"
import firebase from "../../../firebase";
import { useHistory } from 'react-router';
import axios from 'axios';

export default function Search() {
    const db = firebase.firestore()
    const patient = db.collection("patients")

    const history = useHistory()
    

    const [input, setInput] = useState("")
    const [load, setLoad] = useState(false)
    const [responData, setResponData] = useState("")
    const [patientData, setPatientData] = useState([])

    const SearchInput = useRef("")
    const table = useRef("")
    const loading = useRef("")
    
    
    const inputValue = e =>{
        setInput(e.target.value)
    }
    const sendValue = () =>{
        setLoad(true)

        const data = {
            key: input
        }
        patient.get()
                .then(result=>{
                    result.forEach(res=>{
                        console.log(res.doc)
                        setLoad(false)
                    })
                })
                .catch(error=>{
                    console.log(error)
                })
        // axios.post('https://asia-southeast2-ninth-incentive-312907.cloudfunctions.net/Search',{data})
        // .then(res => {
        //     const result = res.data;
        //     console.log(result)
        //     setLoad(true)
        // })
        // .catch(error=>{
        //     console.log(error);
        // })
      
    }
    
    const patientDetail = (nik)=>{
        history.push(`/Patient/Detail/${nik}`)
    }

    return (
        <motion.div className="container">
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
                                    <span>Name</span>
                                    <span>NIK</span>
                                    <span>E-mail</span>
                                </div>

                                {patientData.map((data, index) => 
                                    <div className="table table-body" onClick={()=>patientDetail(data.nik)} key={data.nik}>
                                        <span>{index+1}</span>
                                        <span>{data.name}</span>
                                        <span>{data.nik}</span>
                                        <span>{data.email}</span>
                                    </div>
                                )}
                            </div>
                        {/* }  */}
                    
               
                </div>
            </div>
        </motion.div>
    )
}
