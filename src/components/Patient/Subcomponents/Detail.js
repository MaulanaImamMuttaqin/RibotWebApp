import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import firebase from "../../../firebase";
import "./Detail.css"


export default function Detail() {
    const db = firebase.firestore()
    const patient = db.collection("patient")

    const {nik} = useParams()
    
    const [patData, setPatData] = useState({})
    const [patRec, setPatRec] = useState([])
    const [recModal, setRecModal] = useState(false)


    const openModal= ()=>{
        setRecModal(!recModal)
    }

    useEffect(()=>{
        patient.doc(nik)
            .get()
            .then((result) => {
                setPatData(result.data())
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

        patient.doc(nik).collection("riwayatberobat")
            .onSnapshot(result =>{
                const record = []
                result.forEach(doc =>{
                    record.push(doc.data())
                })
                setPatRec(record)
            })
        
    },[])

    console.log(patData)
    console.log(patRec)

    return (
        <div className="container">
            {recModal && <AddModal/>}
            <div className="patient-detail">
                <div><span>NAMA</span>   |  {patData.name}</div>
                <div><span>NIK</span>   |  {patData.nik}</div>
                <div><span>DOMISILI</span>   |  {patData.domisili}</div>
                <div><span>E-MAIL</span>   |  {patData.email}</div>
                <div><span>NO HP</span>   |  {patData.no_hp}</div>
            </div>
            <div className="patient-records">
                <div className="title">
                    <h1>Riwayat Pasien</h1>
                </div>
                <div className="records">
                    {patRec.map(rec =>
                        <Records Data={rec} openModal={openModal}/>
                    )}
                </div>
            </div>
        </div>
    )
}


function Records({Data, openModal}){
    const [open, setOpen] = useState(false)

    

    return (
        <div className="record">
            <div className="doctor" onClick={()=> setOpen(!open)}>
                <span>{Data.doctor.name}</span><span>{Data.doctor.speciality}</span>
            </div>

            <div className={`record-dates ${open && "open"}`}>
                <button onClick={openModal}>add</button>
                
                {Data.record.map(rec =>
                    <Dates Record={rec}/>
                    
                )}
            </div>
        </div>
    )
}
function AddModal(){
    return(
        <div className="modal">
            <div>
                <input type="date" />
                <input type="text" name="" id="" placeholder="keluhan"/>
                
            </div>
        </div>
    )
}
function Dates({Record}){
    const [open, setOpen] =useState(false)

    const toogleDropDown = ()=>{
        setOpen(!open)
    }

    return(
        <div>
            <div className="date" onClick={(toogleDropDown)}>{Record.date.toDate().toDateString()}, ( {Record.conclusion} )</div>
            <div className={` description ${open && "open"}`}>
                <div className="description-container">
                    <p>Keluhan</p>
                    <p>{Record.description}</p>
                    <p>Pengobatan</p>
                    <ul>
                        {Record.treatment.map(drug=>
                            <li>{drug}</li>
                        )}
                        
                    </ul>
                    <p>Penyakit</p>
                    <p>{Record.conclusion}</p>
                </div>
                
                
            </div>
        </div>
    )
}