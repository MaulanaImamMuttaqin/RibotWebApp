import React, { useState, useEffect , useRef, useContext} from 'react'
import { AuthContext } from '../../../Auth/AuthContext'
import { useParams } from 'react-router-dom'
import firebase from "../../../firebase";
import "./Detail.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {set, useForm} from "react-hook-form"

export default function Detail() {
    const db = firebase.firestore()
    const patient = db.collection("patients")

    // useform buat validasi data form 
    const { register, handleSubmit, errors, reset  } = useForm();

    const {currentUser} = useContext(AuthContext)

    const {nik} = useParams() // ambil no nik dari url untuk ambil data patient
    
    const [patData, setPatData] = useState({}) // simpan data pribadi patient
    const [newDoc, setNewDoc] = useState(false) // atur modal untuk menambah dokter baru
    const [newRec, setNewRec] = useState(false) // atur modal untuk mengupload tanggal baru
    const [desc, setDesc] = useState({}) // simpan data deskripsi yang sedang di tampilkan
    const [docList, setDoclist] = useState([]) //simpan daftar list dokter
    const [dateslist, setDatesList] = useState([]) // simpan daftar list tanggal
    const [docId, setDocId] = useState("") // simpan id document doctor
    const [editWH, setEditWH] = useState(false)
    const [heightVal, setHeightVal] = useState("")
    const [weightVal, setWeightVal] = useState("")
    console.log(docId)

    useEffect(()=>{
        patient.doc(nik)
            .onSnapshot((result) => {
                setPatData(result.data())
                setHeightVal(result.data().bio_profile.height)
                setWeightVal(result.data().bio_profile.weight)
            })

        patient.doc(nik).collection("doctorslist")
            .onSnapshot(result =>{
                const doctor = []
                result.forEach(doc => {
                    doctor.push(doc.data())
                })
                setDoclist(doctor)
            })
        
    },[])

    useEffect(()=>{
        setDesc({})
    },[docId])

    const setDates = (doctors_id) =>{
        patient.doc(nik).collection("medicalhistory")
            .where("doctors_id" , "==" , doctors_id)
            .orderBy('date', 'desc')
            .onSnapshot(result => {
                const dates = []
                result.forEach(date =>{
                    dates.push(date.data())
                })
                setDatesList(dates)
            })
    }
    const updateWH = ()=>{
        patient.doc(nik).update({
            "bio_profile.height": heightVal,
            "bio_profile.weight" : weightVal
        })
        .then(() => {
            setEditWH(false);
        });
    }   
    // fungsi untuk mengambah doktor baru
    

    // check object kosong atua tidak 
    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }
    
    return (
        <div className="container">
            {newDoc && <NewDoctorModal nik={nik} setNewDoc={setNewDoc} newDoc={newDoc} patient={patient} userDoctor={currentUser}/> }
            {newRec && <AddModal docId={docId} setNewRec={setNewRec} newRec={newRec} nik={nik} patient={patient}/>}
            <div className="patient-detail">
                <div className="title">
                    <h1>Patient's Profile</h1>
                </div>
                <div>
                    <div className="patient-bio">
                        <div>
                            <div className="patient-img">
                                <img src="https://i.picsum.photos/id/40/4106/2806.jpg?hmac=MY3ra98ut044LaWPEKwZowgydHZ_rZZUuOHrc3mL5mI" alt="" srcSet="" height="90" width="90"/>
                            </div>
                            <div className="patient-name">
                                <span>{patData.name}</span>
                                <span>{patData.age} years old | Male</span>
                            </div>
                        </div>
                        <div>
                            <div className="edit-container">
                                <span className="edit" onClick={()=>setEditWH(!editWH)}>
                                    <FontAwesomeIcon icon="edit"/>
                                </span>
                                {
                                    editWH &&
                                    <span className="finish" onClick={updateWH}>
                                        finish
                                    </span>
                                }
                                
                            </div>
                            
                            <div>
                                <span><FontAwesomeIcon icon="child"/> Weight</span>
                                {editWH ? 
                                <span style={{borderBottom:"1px solid", paddingBottom:"1px"}}>
                                    <input type="text" value={weightVal} onChange={(e)=> setWeightVal(e.target.value)}/> Kg
                                </span>  : 
                                <span>
                                    {patData && patData.bio_profile ? patData.bio_profile.weight : ""} Kg
                                </span>
                                }
                                
                                
                            </div>
                            <div>
                                <span><FontAwesomeIcon icon="ruler-vertical"/> Height</span>
                                {editWH ? 
                                <span style={{borderBottom:"1px solid", paddingBottom:"1px"}}>
                                    <input type="text" value={heightVal} onChange={(e)=> setHeightVal(e.target.value)}/> cm
                                </span> : 
                                <span>
                                    {patData && patData.bio_profile ? patData.bio_profile.height : ""} cm
                                </span> 
                                }
                                
                            </div>
                            <div>
                                <span><FontAwesomeIcon icon="tint"/> Blood Type</span>
                                <span>{patData && patData.bio_profile ? patData.bio_profile.blood : ""}</span>
                            </div>
                            <div>
                                <span><FontAwesomeIcon icon="calculator"/> BMI</span>
                                <span>"{patData && patData.bmi_status ? patData.bmi_status : ""}"</span>
                            </div>
                        </div>
                    </div>  
                    <div className="patient-profile">
                        <div>
                            <span>Birth Date</span>
                            <span>{patData.date_birth}</span>
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
                            <span>{patData.phone_number}</span>
                        </div>
                        <div>
                            <span>Domicile</span>
                            <span>{patData && patData.address ? `${patData.address.City}, ${patData.address.province}` : ""}</span>
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
                            {docList.map((data, index) =>
                                <Doctors key={index} Data={data} setDates={setDates} setDocId={setDocId}/>
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
                        {dateslist.length == 0 ? <p>Please Choose Doctor's name</p> :
                            <div className="list">
                            {
                                dateslist.map((date, index) =>
                                    <DatesList key={index} Data={date} setDesc={setDesc}/>
                                )
                            }
                            </div>
                        }
                        
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
                                    {desc.treatment.map((drug,index)=>
                                        <li key={index}>{drug}</li>
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
function Doctors({Data , setDates, setDocId}){
    const {name, doctors_id, field, work_place} = Data

    const [docIdentity, setDocIdentity] = useState(false)
    const DocClick= (e)=>{
        setDates(doctors_id)
        setDocId(doctors_id)
        setDocIdentity(true)
        e.currentTarget.parentNode.childNodes.forEach(node=>{
            node.classList.remove("highlight")
            node.childNodes[1].classList.remove("show-identity")

        })
        e.currentTarget.classList.add("highlight")
        e.currentTarget.childNodes[1].classList.add("show-identity")
    }

    return(
        <div className="doctor" onClick={DocClick}>
            <div className="doctor-name">
                <span>{name}</span>
                <FontAwesomeIcon icon="chevron-right" />
            </div>
            <div className="doctor-profile ">
                <div><span>speciality</span> : {field}</div>
                <div><span>work place</span> : {work_place.name}</div>
                <div><span>location</span>  : {work_place.location}</div>
            </div>
            
        </div>
    )
}

// component functin buat nampilin list tanggal dari tiap doctor yang berbeda
function DatesList({Data, setDesc}){
    const {date} = Data
    
    const DateClick = (e)=>{
        setDesc(Data)
        e.currentTarget.parentNode.childNodes.forEach(node=>{
            node.classList.remove("highlight")
        })
        e.currentTarget.classList.toggle("highlight")
    }
    return(
        <div className="dates" onClick={DateClick}>
            <span>{date.toDate().toDateString()}, WIB {date.toDate().toLocaleTimeString()}</span>
            <FontAwesomeIcon icon="chevron-right" />
        </div>
    )

}



// modal buat menambah dokter baru
function NewDoctorModal({nik, patient, userDoctor, setNewDoc, newDoc}){
    const rand = () => Math.floor(Math.random() * 1000000);
    const doctors_id = `${rand()}`
    const [added, setAdded] = useState(false)
    const { register, handleSubmit, errors, reset  } = useForm();

    const createNewDoctor = (data) =>{
        const {name, field, work_place} = data
        console.log(nik)
        const work_place_split = work_place.replace(/\s/g, '').split(",")
        patient.doc(nik).collection("doctorslist")
            .add({
                name : name,
                field: field,
                doctors_id: doctors_id,
                work_place:{
                    name: work_place_split[0],
                    location: work_place_split[1]
                }
            }).then(()=>{
                setAdded(true)
            })
            .catch((error)=>{
                console.log(error)
            })
        // patient.doc(nik).collection("riwayatberobat").add(input)
        // .then((docRef) => {
        //     console.log("Document written with ID: ", docRef.id);
        // })
        // .catch((error) => {
        //     console.error("Error adding document: ", error);
        // });
    }


    return(
        <div className="modal">
                <h3>Add New Doctor</h3>
                {added && <p>New Doctor Succesfully Added</p>}
                <form onSubmit={handleSubmit(createNewDoctor)} className="form">
                    
                    <div>
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name"
                            placeholder="Enter Doctor's name, ex: Dr. [NAME]"
                            {...register('name', 
                                {
                                    required: true
                                })
                            } 
                        />
                    </div>
                    <div>
                        <label htmlFor="field">Field</label>
                        <input 
                            type="text" 
                            id="field"
                            placeholder="Type your Medical Field, ex: Ongkologist"
                            {...register('field', 
                                {
                                    required: true
                                })
                            }
                            rows="5" cols="50"
                        />
                    </div>
                    <div>
                        <label htmlFor="work_place">Work Place</label>
                        <input 
                            type="text" 
                            id="work_place"
                            placeholder="Where do you work, ex: (Hospital Name), (Hospital Address)"
                            {...register('work_place', 
                                {
                                    required: true
                                })
                            } 
                        />

                    </div>
                    <div className="buttons">
                        <button onClick={()=> setNewDoc(!newDoc)}>Cancel</button>
                        <button type="submit">Upload</button>
                        <div className="clear"></div>
                    </div>
                    
                </form>
        </div>
    )
}


// modal buat nambah tanggal baru 
function AddModal({docId, setNewRec, newRec , nik, patient}){
    // const input ={
    //     docId: docId
    // }
    const [updated, setUpdated] = useState(false)
    const { register, handleSubmit, errors, reset  } = useForm();
    const [load, setLoad] = useState(false)

    const sendNewRecordValue = data =>{
        setLoad(true)
        const {date, subject, description, drug, diagnose} = data;
        console.log(docId)
        let timestamp = firebase.firestore.Timestamp.fromDate(new Date(date));
        patient.doc(nik).collection('medicalhistory')
            .add({
                conclusion: diagnose,
                date: timestamp,
                description: description,
                subject:subject,
                treatment: drug.replace(/\s/g, '').split(","),
                doctors_id:docId
            })
            .then(() => {
                console.log("success");
                setUpdated(true)
                setLoad(false)
            })
            .catch((error) => {
                console.error("failed: ", error);
                setLoad(false)
            });
    }

    

    return(
        <div className="modal">
                <h3>Add New Record</h3>
                {updated && <p>Record Succesfully Added</p>}
                {load && <p>Updating</p>}
                <form onSubmit={handleSubmit(sendNewRecordValue)} className="form">
                    
                    <div>
                        <label htmlFor="date">Date</label>
                        <input 
                            type="datetime-local" 
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