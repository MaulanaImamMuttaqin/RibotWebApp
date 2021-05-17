import React, { useEffect, useRef, useState } from 'react'
import { motion} from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation} from "react-router-dom";
import "./controller.css"

const routervariants = {
    hidden:{
      y:100,
      opacity:0.5
    },
    visible:{
      scale: 1.1,
      opacity:1,
      y:0
    }
  }

export default function Controller() {
  let routebutton = useRef({})
  const location = useLocation();
  const [loc, setLoc] = useState("")
  
  useEffect(()=>{
    const locate = location.pathname
    setLoc(locate.split("/")[1])

    for (const obj in routebutton.current){
      routebutton.current[obj].style.backgroundColor = "white";
      Object.assign(routebutton.current[obj].style, {
        backgroundColor : "transparent",
        color: "#222222"
      })
      if(obj == `/${loc}`){ 
        Object.assign(routebutton.current[`/${loc}`].style, {
          backgroundColor : "#5b96f5",
          color: "white"
        })
      }
    }
  })
    return (
        <div className="router">
            <motion.div className="router-container" 
            variants={routervariants}
            initial="hidden"
            animate="visible"
            >
              <Link ref={el => routebutton.current['/'] = el} to='/'><FontAwesomeIcon icon="home" /></Link>
              <Link ref={el => routebutton.current['/Patient'] = el} to='/Patient'><FontAwesomeIcon icon="hospital-user" /></Link>
              <Link ref={el => routebutton.current['/Monitor'] = el} to='/Monitor'><FontAwesomeIcon icon="chart-line" /></Link>
              
            </motion.div>
          </div>
    )
}
