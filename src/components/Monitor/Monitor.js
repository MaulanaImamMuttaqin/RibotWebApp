import React, { useCallback, useEffect, useRef, useState} from 'react'
import { motion } from "framer-motion"
import "../maincomponent.css"
import firebase from "../../firebase";
import {Bar, Line,} from 'react-chartjs-2';
import {Utils} from "chart.js"
import { faMeteor } from '@fortawesome/free-solid-svg-icons';
// import Chartjs from "chart.js";

const monitorVariant = {
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
export default function Monitor() {
    const db = firebase.firestore()
    const analysis = db.collection("analysis_drugs")

    return (
        <motion.div 
        variants={monitorVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="container" style={{paddingBottom:"40px"}}>
                
                    
                        <div style={{marginBottom:"40px"}}>
                            <DrugChart Analysis={analysis}/>
                        </div>
                        <div style={{marginBottom:"40px"}}>
                            <DrugMetric Analysis={analysis} />
                        </div>
                    
                
                
        </motion.div>
    )
}

function DrugChart({Analysis}){


    const [chartColor , setChartColor] = useState([]) // untuk menetukan warna dari chart
    const [drugLabels, setDrugLabels] = useState([]) //mengumpulkan semua label untuk chart
    const [drugVal, setDrugVal] = useState([]) // menumpulkan semua nilai masing2 label untuk chart
    const [loading, setLoading] = useState(false) // atur loading

    const rand = () => Math.floor(Math.random() * 257); // hitung nilai random dari 1 hingga 256 untuk membuat rgb value

    // untuk mengambil data dari firestore
    useEffect(()=>{
        setLoading(true)
        Analysis.doc("Drugs_List")
            .onSnapshot(result =>{
                const chartCol = []
                const data = result.data().drugs
                const label = []
                const value = []
                data.forEach(drug=>{
                    label.push(drug.name)
                    value.push(drug.value)
                    chartCol.push(`rgba(${rand()}, ${rand()}, ${rand()}, 0.7)`)
                })
                setDrugLabels(label)
                setDrugVal(value)
                setLoading(false)
                setChartColor(chartCol)
            })
        
    },[])
    useEffect(()=>{
        const data = {'paramex': 16, 'panadol': 15, 'ranitidin': 7, 'antimo': 2, 'bodrex': 1, 'oskadon': 1}
        const label = []
        const value = []
        for (var key in data){
            label.push(key)
            value.push(data[key])
        }
    },[])
    // untuk mengatur warna bar dari chart secara random

    return(
        
        <div>
            {
            loading ? <p>Loading</p> :
            <div>
                <div className="title">
                    <h2>Drug Demand</h2>
                </div>
                {/* <div>
                    <Bar 
        
                        data={{
                            labels: drugLabels,
                            datasets: [{
                                label: 'Drug',
                                data: drugVal,
                                backgroundColor: chartColor,
                                borderColor: [
                                    `rgba(${rand()}, ${rand()}, ${rand()}, 1)`
                                ],
                                borderWidth: 1
                            }]
                        }}
                        height={300}
                        width={600}
                        options={{  
                            maintainAspectRatio: false,
                            scales: {
                                x : {
                                },
                                y : {
                                    padding:10
                                }

                            },
                            indexAxis: 'y'
                            
                        }}
                        
                    />
                </div> */}

            </div>
            }
        </div>
                
    )
}

function DrugMetric({Analysis}){
    const [loading, setLoading] = useState(false)
    const [label, setLabel] = useState([])
    // useEffect(()=>{
    //     setLoading(true)
    //     Analysis.doc("Drugs_Metrics")
    //         .collection("Metrics")
    //         .orderBy('time', 'desc')
    //         .onSnapshot(result =>{
    //             const metr = []
    //             const label = []
    //             const dates = []
    //             const value = []
    //             result.forEach(res=>{

    //                 metr.unshift(res.data())
    //                 dates.unshift(res.data().time.toDate().toDateString())
    //             })

    //             metr[0].drug.forEach(drg=>{
    //                 label.push(drg.name)
    //             })
                
    //             label.forEach((lab)=>{
    //                 const val = []
    //                 metr.forEach((met)=>{
    //                     met.drug.forEach((drug)=>{
    //                         if(drug.name == lab){
    //                             val.push(drug.value)
    //                             break;
    //                         }else{
    //                             val.push(0)
    //                             break;
    //                         }
    //                     })
                        
    //                 })
    //                 value.push(val)
    //             })
                
    //             console.log(dates)
    //             console.log(label)
    //             console.log(metr)
    //             console.log(value)

    //         })
        
    // },[])
    return (
        <div>
            
            <div className="title">
                <h2>Drug Demand Metric</h2>
            </div>
            <div>
                <Line
                    data={{
                        labels: ["Wed May 19 2021", "Thu May 20 2021", "Fri May 21 2021", "Sat May 22 2021", "Sun May 23 2021", "Mon May 24 2021", "Tue May 25 2021", "Wed May 26 2021"],
                        datasets: [{
                            label: 'ranitidin',
                            data: [10, 5, 3, 7, 9, 7, 22, 18],
                            borderColor: 'rgb(75, 192, 192)',
                            borderWidth: 1
                        }]
                    }}
                    height={300}
                    width={600}
                    options={{  
                        maintainAspectRatio: false
                        
                    }}
                />
            </div>
            
        </div>
    )
}
