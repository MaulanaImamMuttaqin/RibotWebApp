import React, { useCallback, useEffect, useRef, useState} from 'react'
import { motion } from "framer-motion"
import "../maincomponent.css"
import firebase from "../../firebase";
import {Bar, Line,} from 'react-chartjs-2';
import {Utils} from "chart.js"
import { faMeteor } from '@fortawesome/free-solid-svg-icons';
import "./monitor.css"
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
        className="container monitor">
                
                        <div className="Drug">
                            <div >
                                <DrugChart Analysis={analysis}/>
                            </div>
                            <div>
                                <DailyDrugDemand Analysis={analysis}/>
                            </div>
                        </div>
                        
                        <div>
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
                const data = result.data()
                const dataKeySorted = Object.keys(data).sort((a,b) => {return data[b]- data[a]})
                const label = []
                const value = []
                dataKeySorted.forEach(key=>{
                    label.push(key)
                    value.push(data[key])
                    chartCol.push(`rgba(${rand()}, ${rand()}, ${rand()}, 0.5)`)
                })
                // data.forEach(drug=>{
                //     label.push(drug.name)
                //     value.push(drug.value)
                //     chartCol.push(`rgba(${rand()}, ${rand()}, ${rand()}, 0.7)`)
                // })
                setDrugLabels(label)
                setDrugVal(value)
                setLoading(false)
                setChartColor(chartCol)
            })
        
    },[])

    // untuk mengatur warna bar dari chart secara random

    return(
        
        <div>
            
            <div>
                <div className="title">
                    <h2>Total Drug Demand</h2>
                </div>
                {
                    loading ? <p>Loading</p> :
                <div>
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
                            indexAxis: 'y',
                            responsive: true
                            
                        }}
                        
                    />
                </div>
                 }
            </div>
           
        </div>
                
    )
}

function DailyDrugDemand({Analysis}){
    const [chartColor , setChartColor] = useState([]) // untuk menetukan warna dari chart
    const [drugLabels, setDrugLabels] = useState([]) //mengumpulkan semua label untuk chart
    const [drugVal, setDrugVal] = useState([]) // menumpulkan semua nilai masing2 label untuk chart
    const [toDate, setToDate] = useState("")
    const [loading, setLoading] = useState(false) // atur loading
    const rand = () => Math.floor(Math.random() * 257);
    useEffect(()=>{
        setLoading(true)
        Analysis.doc("Daily_analysis")
            .onSnapshot(result =>{
                
                const chartCol = []
                const timeLastUpdated = result.data()["date"]
                const data = result.data()["drug"]
                
                const dataKeySorted = Object.keys(data).sort((a,b) => {return data[b]- data[a]})
                const label = []
                const value = []
                dataKeySorted.forEach(key=>{
                    label.push(key)
                    value.push(data[key])
                    chartCol.push(`rgba(${rand()}, ${rand()}, ${rand()}, 0.7)`)
                })
                // data.forEach(drug=>{
                //     label.push(drug.name)
                //     value.push(drug.value)
                //     chartCol.push(`rgba(${rand()}, ${rand()}, ${rand()}, 0.7)`)
                // })
                setDrugLabels(label)
                setDrugVal(value)
                setLoading(false)
                setChartColor(chartCol)
                setToDate(`${timeLastUpdated.toDate().toDateString()}}, WIB ${timeLastUpdated.toDate().toLocaleTimeString()}`)
            })
        
    },[])
    return (
        <div>
            
            <div>
                <div className="title">
                    <h2>Daily Drug Demand [  {toDate}  ]</h2>
                </div>
                {
                     loading ? <p>Loading</p> :
                <div>
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
                            indexAxis: 'y',
                            responsive: true
                            
                        }}
                        
                    />
                </div>
             }

            </div>
        </div>
    )
}
function DrugMetric({Analysis}){
    const [loading, setLoading] = useState(false)
    // const [label, setLabel] = useState([])
    const [labels, setLabels] = useState([])
    // const [value, setValue] = useState({})
    const [datasets, setDatasets] = useState([])
    useEffect(()=>{
        setLoading(true)
        Analysis.doc("Drugs_Metrics")
            .collection("Metrics")
            .orderBy('date', 'desc')
            .limit(10)
            .onSnapshot(result =>{
                const data =[]
                const labels = []
                const label = []
                const value = []
                const dataset = []
                const sum_value = []
                const highest_label =[]
                const rand = () => Math.floor(Math.random() * 257);
                //const sortObject = (object) => {return Object.keys(object).sort((a,b) => {return data[b]- data[a]})}
                result.forEach(res=>{
                    data.push(res.data())
                    labels.unshift(res.data().date.toDate().toDateString())
                    for (const prop in res.data().drug){
                        if(!label.includes(prop)){
                            label.push(prop)
                        }
                    }
                })

                console.log(labels)
                label.forEach(lab=>{
                    const label_value = []
                    data.forEach(dat=>{
                        const drug_label = dat.drug[lab] ? dat.drug[lab] : 0
                        label_value.unshift(drug_label)
                    })
                    value[lab] = label_value
                })
                
                for (const prop in value){
                    sum_value.push([prop, value[prop].reduce((a, b) => a + b, 0)])
                }

                const label_sort = sum_value.sort((a, b) => b[1] - a[1])
                for (let index = 0; index < 3; index++) {
                    highest_label.push(label_sort[index][0])
                    
                }

                console.log(highest_label)
                console.log(sum_value)
                console.log(value)
                // console.log(sortObject(sum_value))
                label.forEach(lab=>{
                    const new_data_config = {
                        borderWidth: 1,
                        borderColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
                        label: lab,
                        data: value[lab],
                        hidden: highest_label.includes(lab) ? false : true,
                    }
                    dataset.push(new_data_config)
                })
                setLabels(labels)
                setDatasets(dataset)
                setLoading(false)
            })
        
    },[])

    
    
    useEffect(()=>{
        if(labels){

            
        }
    },[])

    return (
        <div>
             
            <div>
                <div className="title">
                    <h2>Drug Demand Metric</h2>
                </div>
                {
                    loading ? <p>Loading</p> :
                <div>
                    <Line
                        data={{
                            labels: labels,
                            datasets: datasets
                        }}
                        height={300}
                        width={600}
                        options={{  
                            maintainAspectRatio: false,
                            responsive: true
                            
                        }}
                    />
                </div>
                 }
            </div>
           
        </div>
    )
}
