import React, {useState, useEffect} from 'react';
import firebase from "../../firebase";
import "./Patient.css"
import "../maincomponent.css"
import {motion} from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link} from "react-router-dom";

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


export default function Patient() {

  return (
    <motion.div className="patient"
      variants={patientVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="container"
    >
      <div className="options">
        <div className="options-title">
            <h1>RIBOT</h1>
            <h3>Patient's Record Control</h3>
        </div>
        <div className="options-body">
          <Link to='/Patient/Search'>
            <span className="tooltiptext">Search Patient</span>
            <FontAwesomeIcon icon="search"/>
          </Link>
          <Link to='/Patient/Add'>
            <span class="tooltiptext">Add Patient</span>
            <FontAwesomeIcon icon="plus"/>
          </Link>
        </div>
      </div>

    </motion.div>
  );
}


// const [patientData, setPatientData] = useState([])
//   const [loading, setLoading] = useState(false)

//   const db = firebase.firestore()
//   const patient = db.collection("patient")

//   useEffect(()=>{
//     setLoading(true)
//     patient.onSnapshot(querySnapshot =>{
//       const items = []
//       querySnapshot.forEach(doc =>{
//         items.push(doc.data())
//       })
//       setPatientData(items)
//       setLoading(false)
//     })
//   },[])
{/* <h1>Patient List</h1>
      {loading ? <h1>Fetching</h1> : 
        <div>
            <table>
              <tr>
                <th>nama</th>
                <th>nik</th>
                <th>domisili</th>
                <th>email</th>
                <th>no hp</th>
              </tr>
              <tbody>
                  {patientData.map(data => 
                    <tr key={data.nik}>
                      <td>{data.name}</td>
                      <td>{data.nik}</td>
                      <td>{data.domisili}</td>
                      <td>{data.email}</td>
                      <td>{data.no_hp}</td>
                    </tr>
                  )}
              </tbody>
              
            </table>
            
        </div>
      } */}