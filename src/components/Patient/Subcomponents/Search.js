import React, {useState, useRef} from 'react'
import {motion} from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Search.css"
import firebase from "../../../firebase";
import { useHistory } from 'react-router';
import axios from 'axios';


const patientVariant = {
    hidden: {
        opacity: 0,
        x: 50
    },
    visible:{
        opacity:1,
        x:0,
        transition : {
            ease : "easeInOut",
            delay:0.3
        }
    },
    exit:{
        x:-50,
        opacity:0,  
        transition:{
            ease: "easeInOut"
        }
    }
  }

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
    const searchPatient = () =>{
        setLoad(true)
        const data = {
            key: input
        }
        axios.post('https://asia-southeast2-ninth-incentive-312907.cloudfunctions.net/Search',{data})
            .then(res => {
                console.log(res)
                const result = res.data;
                console.log(result)
                setLoad(true)
            })
            .catch(error=>{
                console.log(error);
            })
        patient.get()
                .then(result=>{
                    const patient = []
                    result.docs.forEach(res=>{
                        patient.push(res.data())
                    })
                    setPatientData(patient)
                    setLoad(false)

                })
                .catch(error=>{
                    console.log(error)
                })
    }
    
    const patientDetail = (nik)=>{
        history.push(`/Patient/Detail/${nik}`)
    }

    return (
        <motion.div className="container"
            variants={patientVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="container patient-container"
        >
            <div className={`search ${(patientData.length != 0) && "move-top"}`}>
                <div className="search-title">
                    <h1>Search Patients</h1>
                </div>
                <div className="search-form">
                    <input type="text" placeholder="Please insert patients name you are looking for" onChange={e => inputValue(e)}/>
                    <div onClick={searchPatient}><FontAwesomeIcon icon="search"/></div>
                </div>
                    <p style={{opacity: load ? '1': '0'}}>Loading...</p>
            </div>
            <div className={`patients-table move-top ${(patientData.length != 0) && "show"}`}>
                <h3>Lists of Patients based on keyword ""</h3>
                <table >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>NIK</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientData.map((patient, index)=>
                            <tr key={index} onClick={()=>patientDetail(patient.nik)}>
                                <td>{patient.name}</td>
                                <td>{patient.nik}</td>
                                <td>{patient.email}</td>
                                <td>{patient.phone_number}</td>
                                <td>{(patient && patient.address) && `${patient.address.City}, ${patient.address.province}`}</td>
                            </tr>
                        )}
                        
                    </tbody>
                </table>
            </div>

            
        </motion.div>
    )
}


