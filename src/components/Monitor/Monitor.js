import React, { useCallback, useEffect, useRef, useState} from 'react'
import { motion } from "framer-motion"
import "../maincomponent.css"
import firebase from "../../firebase";
import {Bar, defaults } from "react-chartjs-2"
import Chartjs from "chart.js";

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

    const [drugLabels, setDrugLabels] = useState([])
    const [drugVal, setDrugVal] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
        analysis.doc("Drugs_List")
            .onSnapshot(result =>{
                const data = result.data().drugs
                const label = []
                const value = []
                data.forEach(drug=>{
                    label.push(drug.name)
                    value.push(drug.value)
                })
                setDrugLabels(label)
                setDrugVal(value)
                setLoading(false    )
            })
    },[])
    return (
        <motion.div 
        variants={monitorVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="container">
                {/* {
                    loading ? <p>Loading</p> :
                    <BarChart Labels={drugLabels} Value={drugVal}/>
                } */}
                <BarChart Labels={drugLabels} Value={drugVal}/>
        </motion.div>
    )
}

function BarChart({Labels, Value}){
    // const [barRef, setBarRef] = useState(null)
    // const [click, setClick] = useState(false)

    // // useEffect(()=>{
    // //     barChar.current.data.datasets[0].data = Value;
    // //     barChar.current.update();
    // // },[Value])
    // // console.log(barChar ? barChar.current : "" )

    // const randomInt = () => Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    // const charRef = useCallback((charNode)=>{
        
    //     if(charNode){
    //         // charNode.data.datasets[0].data.
    //         // charNode.update();
    //         charNode.data.datasets.forEach((dataset) => {
    //             dataset.data.forEach((dat, index)=>{
    //                 dataset.data[index] = Value[index]
    //             })
    //         });
    //         console.log(charNode.data.datasets[0].data)
    //     }
        
    // },[Value])
    
    return(
        <div>
            <div className="title">
                <h2>Drug Demand</h2>
            </div>
            {/* <button onClick={()=>setClick(!click)}>click</button> */}
            <div>
                <Bar 
                    data={{
                        labels: Labels,
                        datasets: [{
                            label: 'Drug',
                            data: Value,
                            backgroundColor: [
                                'rgba(52, 175, 237, 0.5)'
                            ],
                            borderColor: [
                                'rgba(52, 175, 237, 1)'
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
                                padding:10,
                                animations:{
                                    duration:0
                                }
                            }

                        },
                        indexAxis: 'y',
                        
                    }}
                    redraw={false}
                    
                />
            </div>
        
        </div>
    )
}