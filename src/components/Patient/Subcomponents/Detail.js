import React, { useState, useEffect , useRef} from 'react'
import { useParams } from 'react-router-dom'
import firebase from "../../../firebase";
import "./Detail.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useForm} from "react-hook-form"

export default function Detail() {
    const db = firebase.firestore()
    const patient = db.collection("patient")

    // useform buat validasi data form 
    const { register, handleSubmit, errors, reset  } = useForm();

    const {nik} = useParams() // ambil no nik dari url untuk ambil data patient
    
    const [patData, setPatData] = useState({}) // simpan data pribadi patient
    const [patRec, setPatRec] = useState([]) // simpan semua data record diambil dari database
    const [newDoc, setNewDoc] = useState(false) // atur modal untuk menambah dokter baru
    const [newRec, setNewRec] = useState(false) // atur modal untuk mengupload tanggal baru
    const [dates, setDates] = useState([]) // simpan tanggal yang sedang di pilih
    const [desc, setDesc] = useState({}) // simpan data deskripsi yang sedang di tampilkan
    const [docId, setDocId] = useState("") // simpan id document doctor


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
                    // record.push(doc.data())
                })
                console.log(record)
                setPatRec(record)
            })
        
    },[])

    // useeffect buat mereset nilai desc kalau doctor yang lain di tekan 
    useEffect(()=>{
        setDesc({})
    },[docId])


    useEffect(()=>{
        console.log("data added")
    },[setPatRec])

    // fungsi untuk mengambah doktor baru
    const createNewDoctor = (input)=>{
        patient.doc(nik).collection("riwayatberobat").add(input)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }

    // check object kosong atua tidak 
    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }
    
    return (
        <div className="container">
            {newDoc && <NewDoctorModal sendNewDocValue={createNewDoctor}/>}
            {newRec && <AddModal docId={docId} setNewRec={setNewRec} newRec={newRec} nik={nik} patient={patient}/>}
            <div className="patient-detail">
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
                    </div>
                </div>
            </div>
            <div className="patient-records">
                <div className="title">
                    <h1>Patient's Record</h1>
                </div>
                <div className="records">
                    <div className="doctorlist">    
                        <div className="title flexer spread vertical-center">
                            <h3>Doctor List</h3>
                            <div >
                                <button className="addNewdData" onClick={()=> setNewDoc(!newDoc)}><FontAwesomeIcon icon="user-plus"/></button>
                            </div>
                        </div>
                        <div className="list">
                            {patRec.map((rec, index) =>
                                <Doctors key={index} Data={rec[0]} docId={rec[1]} setDocId={setDocId} setDates={setDates}/>
                            )}
                        </div>
                    </div>
                    <div className="dateslist">
                        <div className="title flexer spread vertical-center">
                            <h3>Dates List</h3>
                            <div >
                                <button className="addNewdData" onClick={()=> setNewRec(!newRec)}><FontAwesomeIcon icon="calendar-plus"/></button>
                            </div>
                        </div>
                        <div className="list">
                        {
                            dates.map((date, index) =>
                                <DatesList key={index} Data={date} setDesc={setDesc} />
                            )
                        }
                        </div>
                    </div>
                    <div className="description">
                        <div className="title">
                            <h3>Description</h3>
                        </div>
                        {!isEmpty(desc) &&
                            <div className="desc">
                                <p>Keluhan</p>
                                <p>{desc.description}</p>
                                <p>Pengobatan</p>
                                <ul>
                                    {desc.treatment.map(drug=>
                                        <li key={drug}>{drug}</li>
                                    )}
                                    
                                </ul>
                                <p>Penyakit</p>
                            <p>{desc.conclusion}</p>
                            </div>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

// component function buat nampilin list doctor
function Doctors({Data, setDates, docId, setDocId}){
    const dates = Data.record

    const DocClick= (e)=>{
        setDates(dates)
        setDocId(docId)
        e.currentTarget.parentNode.childNodes.forEach(node=>{
            node.classList.remove("highlight")
        })
        e.currentTarget.classList.add("highlight")
        
    }

    return(
        <div className="doctor" onClick={DocClick}>
            <span>{Data.doctor.name}</span>
            <FontAwesomeIcon icon="chevron-right" />
        </div>
    )
}

// component functin buat nampilin list tanggal dari tiap doctor yang berbeda
function DatesList({Data, setDesc}){

    const DateClick = (e)=>{
        setDesc(Data)
        e.currentTarget.parentNode.childNodes.forEach(node=>{
            node.classList.remove("highlight")
        })
        e.currentTarget.classList.toggle("highlight")
    }
    return(
        <div className="dates" onClick={DateClick}>
            <span>{Data.date.toDate().toDateString()}</span>
            <FontAwesomeIcon icon="chevron-right" />
        </div>
    )

}



// modal buat menambah dokter baru
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


// modal buat nambah tanggal baru 
function AddModal({docId, setNewRec, newRec , nik, patient}){
    // const input ={
    //     docId: docId
    // }
    
    const { register, handleSubmit, errors, reset  } = useForm();

    const sendNewRecordValue = data =>{
        const {date, subject, description, drug, diagnose} = data;
        let timestamp = firebase.firestore.Timestamp.fromDate(new Date(date));
        patient.doc(`/${nik}/riwayatberobat/${docId}`).update({
            record: firebase.firestore.FieldValue.arrayUnion({
                conclusion: diagnose,
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

    

    return(
        <div className="modal">
                <h3>Add New Record</h3>
                <form onSubmit={handleSubmit(sendNewRecordValue)} className="form">
                    
                    <div>
                        <label htmlFor="date">Date</label>
                        <input 
                            type="date" 
                            id="date"
                            {...register('date', 
                                {
                                    required: true
                                })
                            } 
                        />
                    </div>
                    <div>
                        <label htmlFor="subject">Subject</label>
                        <input 
                            type="text" 
                            id="subject"
                            placeholder="enter the subject of this apointment"
                            {...register('subject', 
                                {
                                    required: true
                                })
                            } 
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea 
                            type="text" 
                            id="description"
                            placeholder="Add description"
                            {...register('description', 
                                {
                                    required: true
                                })
                            }
                            rows="5" cols="50"
                        />
                    </div>
                    <div>
                        <label htmlFor="drug">Treatment</label>
                        <input 
                            type="text" 
                            id="drug"
                            placeholder="Obat yang diberikan, ex: nama_obat(dosis), namaobat2(dosis)"
                            {...register('drug', 
                                {
                                    required: true
                                })
                            } 
                        />

                    </div>
                    <div>
                        <label htmlFor="diagnose">Diagnose</label>
                        <input 
                            type="text" 
                            id="diagnose"
                            placeholder="Diagnose"
                            {...register('diagnose', 
                                {
                                    required: true
                                })
                            } 
                        />
                    </div>
                    <div className="buttons">
                        <button onClick={()=>setNewRec(!newRec)}>Cancel</button>
                        <button type="submit">Upload</button>
                        <div className="clear"></div>
                    </div>
                    
                </form>
        </div>
    )
}

{/* <form onSubmit={e=> e.preventDefault()}>
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
                </form> */}