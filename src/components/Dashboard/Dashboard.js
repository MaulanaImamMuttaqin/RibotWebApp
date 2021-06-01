import React ,{useState, useEffect} from 'react'
import {motion} from "framer-motion"
import "../maincomponent.css"
import "./Dashboard.css"
import {Line, Doughnut} from "react-chartjs-2"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import firebase from "../../firebase";
import {set, useForm} from "react-hook-form"

const dashvariant = {
    hidden: {
        opacity: 0,
        y: -50
    },
    visible:{
        opacity:1,
        y:0,
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

export default function Dashboard() {
    const db = firebase.firestore()
    const patients = db.collection("patients")

    const [countPatient, setCountPatient] = useState("0")
    const [newPat, setNewPat] = useState(false)
    // useEffect(()=>{
    //     patients.
    // },[])

    return (
        <motion.div 
            variants={dashvariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="container dashboard-container"
        >
            {newPat && <AddModal setNewPat={setNewPat} newPat={newPat} patients={patients}/>}
            
            <div className="patients total">
                <div>
                    <div className="add-patient" onClick={()=>setNewPat(!newPat)}>
                        <FontAwesomeIcon icon="user-plus"/>
                    </div>
                    <div className="logo">
                        <FontAwesomeIcon icon="user"/>
                    </div>
                    <div className="content">
                        <p>Patients Registered</p>
                        <p>250</p>
                    </div>
                </div>
            </div>
            <div className="doctor total">
                <div>
                    <div className="logo">
                        <FontAwesomeIcon icon="user-md"/>
                    </div>
                    <div className="content">
                        <p>Doctor Registered</p>
                        <p>50</p>
                    </div>
                </div>
            </div>
            <div className="item1 total">
                    <div>
                        <div className="logo">
                            <FontAwesomeIcon icon="user-md"/>
                        </div>
                        <div className="content">
                            <p>Doctor Registered</p>
                            <p>50</p>
                        </div>
                    </div>
            </div>


            <div className="visits">
                <div>
                    <h2>Patients Visits</h2>
                </div>
                <div>
                    <LineChart/>
                </div>
            </div>

            <div className="online">
                <div>
                    <h2>Users Online</h2>
                </div>
                <div>
                    <p>User 1</p>
                    <p>User 2</p>
                    <p>User 3</p>
                    <p>User 4</p>
                    <p>User 5</p>
                    <p>User 6</p>
                    <p>User 7</p>
                    <p>User 8</p>
                    <p>User 9</p>
                </div>
            </div>
            <div className="chart1 doughnutChart">
                <div>
                    <DougnutChart/>
                </div>
            </div>
            <div className="chart2 doughnutChart">
                <div>
                    <DougnutChart/>
                </div>
            </div>
        </motion.div>
    )
}

function LineChart(){
    return(
        <Line
            data={{
                labels: ["Jan", "Feb", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: 'My First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.4,
                    backgroundColor : 'rgba(75, 192, 192, 0.5)'
                  }]
            }}
            options={{  
                maintainAspectRatio: false,
                responsive: true
                
            }}
        />
    )
}

function DougnutChart(){
    return(
        <Doughnut
            data={{
                labels: [
                    'Red',
                    'Blue',
                    'Yellow'
                  ],
                  datasets: [{
                    label: 'My First Dataset',
                    data: [300, 50, 100],
                    backgroundColor: [
                      'rgb(255, 99, 132)',
                      'rgb(54, 162, 235)',
                      'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 4
                  }]
            }}
            options={{  
                maintainAspectRatio: false,
                responsive: true
                
            }}
        />
    )
}


function AddModal({setNewPat, newPat, patient}){
    // const input ={
    //     docId: docId
    // }
    const [upload, setUpload] = useState(false)
    const { register, handleSubmit, errors, reset  } = useForm();
    const [load, setLoad] = useState(false)

    const sendNewRecordValue = data =>{
        setLoad(true)
        const {name, nik, email, phone_number, address} = data;
        // let timestamp = firebase.firestore.Timestamp.fromDate(new Date(date));
        // patient.doc(nik)
        //     .set({
        //         conclusion: diagnose,
        //         date: timestamp,
        //         description: description,
        //         subject:subject,
        //         treatment: drug.replace(/\s/g, '').split(","),
        //         doctors_id:docId
        //     })
        //     .then(() => {
        //         console.log("success");
        //         setUpdated(true)
        //         setLoad(false)
        //     })
        //     .catch((error) => {
        //         console.error("failed: ", error);
        //         setLoad(false)
        //     });
    }

    

    return(
        <div className="modal">
                <h3>Add New Patient [in Development]</h3>
                {upload && <p>New Patient Succesfully Added</p>}
                {load && <p>Adding New Patient </p>}
                <form onSubmit={handleSubmit(sendNewRecordValue)} className="form">
                    
                    <div>
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name"
                            placeholder="Patients name"
                            {...register('name', 
                                {
                                    required: true
                                })
                            } 
                        />
                    </div>
                    <div>
                        <label htmlFor="nik">NIK</label>
                        <input 
                            type="text" 
                            id="nik"
                            placeholder="Patients NIK"
                            {...register('nik', 
                                {
                                    required: true
                                })
                            } 
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            placeholder="Patients Email"
                            {...register('email', 
                                {
                                    required: true
                                })
                            } 
                        />
                    </div>
                    <div>
                        <label htmlFor="phone_number">Phone Number</label>
                        <input 
                            type="text" 
                            id="phone_number"
                            placeholder="Patients Phone number"
                            {...register('phone_number', 
                                {
                                    required: true
                                })
                            } 
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Address</label>
                        <input 
                            type="text" 
                            id="address"
                            placeholder="Patients Address, ex: [City Name], [Province]"
                            {...register('address', 
                                {
                                    required: true
                                })
                            } 
                        />
                    </div>
                    <div className="buttons">
                        <button onClick={()=>setNewPat(!newPat)}>Cancel</button>
                        <button type="submit">Upload</button>
                        <div className="clear"></div>
                    </div>
                    
                </form>
        </div>
    )
}
