import React, { useState, useEffect , useRef} from 'react'
import { useParams } from 'react-router-dom'
import firebase from "../../../firebase";
import "./Detail.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Detail() {
    const db = firebase.firestore()
    const patient = db.collection("patient")

    const {nik} = useParams()
    
    const [patData, setPatData] = useState({})
    const [patRec, setPatRec] = useState([])
    const [newDoc, setNewDoc] = useState(false)


    

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
                    record.push([doc.data(), doc.id])
                })
                setPatRec(record)
            })
        
    },[])

    const sendNewRecordValue = (input) =>{
        const {date, subject, description, drug, disease, docId} = input;
        let timestamp = firebase.firestore.Timestamp.fromDate(new Date(date));
        patient.doc(nik).collection("riwayatberobat").doc(docId).update({
            record: firebase.firestore.FieldValue.arrayUnion({
                conclusion: disease,
                date: timestamp,
                description: description,
                subject:subject,
                treatment: drug.replace(/\s/g, '').split(",")
            })            
        })
        .then(() => {
            console.log("success");
        })
        .catch((error) => {
            console.error("failed: ", error);
        });
    }

    const createNewDoctor = (input)=>{
        patient.doc(nik).collection("riwayatberobat").add(input)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }

    return (
        <div className="container">
            {newDoc && <NewDoctorModal sendNewDocValue={createNewDoctor}/>}
            <div className="patient-detail">
                {/* <div><span>NAMA</span>   |  {patData.name}</div>
                <div><span>NIK</span>   |  {patData.nik}</div>
                <div><span>DOMISILI</span>   |  {patData.domisili}</div>
                <div><span>E-MAIL</span>   |  {patData.email}</div>
                <div><span>NO HP</span>   |  {patData.no_hp}</div> */}
                <div className="title">
                    <h1>Patient's Profile</h1>
                </div>
                <div>
                    <div className="patient-bio">
                        <div>
                            <div className="patient-img">
                                <img src="https://i.picsum.photos/id/40/4106/2806.jpg?hmac=MY3ra98ut044LaWPEKwZowgydHZ_rZZUuOHrc3mL5mI" alt="" srcset="" height="90" width="90"/>
                            </div>
                            <div className="patient-name">
                                <span>{patData.name}</span>
                                <span>20 years old | Male</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span><FontAwesomeIcon icon="child"/> Weight</span>
                                <span>55 Kg</span>
                            </div>
                            <div>
                                <span><FontAwesomeIcon icon="ruler-vertical"/> Height</span>
                                <span>170 cm</span>
                            </div>
                            <div>
                                <span><FontAwesomeIcon icon="tint"/> Blood Type</span>
                                <span>O+</span>
                            </div>
                        </div>
                    </div>
                    <div className="patient-profile">
                        <div>
                            <span>Birth Date</span>
                            <span>23-11-2000</span>
                        </div>
                        <div>
                            <span>NIK</span>
                            <span>{patData.nik}</span>
                        </div>
                        <div>
                            <span>E-mail</span>
                            <span>{patData.email}</span>
                        </div>
                        <div>
                            <span>Phone Number</span>
                            <span>{patData.no_hp}</span>
                        </div>
                        <div>
                            <span>Domicile</span>
                            <span>{patData.domisili}</span>
                        </div>
                        <div>
                            <span>Birth Date</span>
                            <span>tes</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="patient-records">
                <div className="title flexer spread">
                    <h1>Patient's Record</h1>

                    <div >
                        <button className="add-doc" onClick={()=> setNewDoc(!newDoc)}><FontAwesomeIcon icon="user-plus"/></button>
                    </div>
                    
                </div>
                <div className="records">
                    {patRec.map((rec, index) =>
                        <Records key={index} Data={rec[0]} docId={rec[1]} sendNewRecordValue={sendNewRecordValue}/>
                    )}
                </div>
            </div>
        </div>
    )
}


function Records({Data, docId, sendNewRecordValue}){
    const [open, setOpen] = useState(false)
    const [recModal, setRecModal] = useState(false)


    return (
        <div className="record">
            {recModal && <AddModal sendNewRecordValue={sendNewRecordValue} docId={docId}/>}

            <div className="doctor" onClick={()=> setOpen(!open)}>
                <span>{Data.doctor.name}</span><span>{Data.doctor.speciality}</span>
            </div>

            <div className={`record-dates ${open && "open"}`}>
                <button onClick={()=>setRecModal(!recModal)}>add</button>
                
                {Data.record.map((rec, index) =>
                    <Dates key={index} Record={rec} />
                    
                )}
            </div>
        </div>
    )
}

function NewDoctorModal({sendNewDocValue}){
    const input ={
        doctor:{},
        record: []
    }
    

    const inputValue = (e, field) => {
        input.doctor[field] = e.target.value
    }


    return(
        <div className="modal">
            <div>
                <form onSubmit={e=>e.preventDefault()}>
                    <label htmlFor="name">Nama</label>
                        <input onChange={(e) => inputValue(e, "name")} id="name" className="addrecord" type="text" placeholder="nama" required/>
                    <label htmlFor="speciality">Spesialis</label>
                        <input onChange={(e) => inputValue(e, "speciality")} id="speciality" className="addrecord" type="text" placeholder="Jenis Doctor"required/>
                    <button onClick={()=> {sendNewDocValue(input)}}>TAMBAH</button> 
                </form>
            </div>
        </div>
    )
}

function AddModal({sendNewRecordValue, docId}){
    const input ={
        docId: docId
    }
    

    const inputValue = (e, name) => {
        input[name] = e.target.value
    }

    

    return(
        <div className="modal">
            <div>
                <form onSubmit={e=> e.preventDefault()}>
                    <label htmlFor="date">tanggal</label>
                        <input onChange={(e) => inputValue(e, "date")} id="date" type="date" required/>
                    <label htmlFor="subject">Subject</label>
                        <input onChange={(e) => inputValue(e, "subject")} id="subject" className="addrecord" type="text" placeholder="subject"required/>
                    <label htmlFor="description">Keterangan</label>
                        <textarea onChange={(e) => inputValue(e, "description")} id="description" type="text" placeholder="Keterangan" rows="10" cols="50"required/>
                    <label htmlFor="drug">Obat</label>
                        <input onChange={(e) => inputValue(e, "drug")} id="drug" className="addrecord" type="text" placeholder="Obat yang diberikan, ex: nama_obat(dosis), namaobat2(dosis)"required/>
                    <label htmlFor="disease">Penyakit</label>
                        <input onChange={(e) => inputValue(e, "disease")} id="disease" className="addrecord"  type="text"  placeholder="Penyakit yang diduga"required/>  

                    <button onClick={()=> sendNewRecordValue(input)}>TAMBAH</button> 
                </form>
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
            <div className="date" onClick={(toogleDropDown)}>{Record.date.toDate().toDateString()}, ( {Record.subject} )</div>
            <div className={` description ${open && "open"}`}>
                <div className="description-container">
                    <p>Keluhan</p>
                    <p>{Record.description}</p>
                    <p>Pengobatan</p>
                    <ul>
                        {Record.treatment.map(drug=>
                            <li key={drug}>{drug}</li>
                        )}
                        
                    </ul>
                    <p>Penyakit</p>
                    <p>{Record.conclusion}</p>
                </div>
                
                
            </div>
        </div>
    )
}