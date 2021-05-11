import React, {useState, useEffect, useRef} from 'react';
import { Switch, Route, Link, useLocation} from "react-router-dom";
import "./App.css"
import { motion , AnimatePresence} from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Patient from "./components/Patient/Patient"
import Monitor from "./components/Monitor/Monitor"
import Dashboard from "./components/Dashboard/Dashboard"
import Search from './components/Patient/Subcomponents/Search';
import Add from './components/Patient/Subcomponents/Add';
import Detail from './components/Patient/Subcomponents/Detail';


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
function App() {
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
    <div>
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

          <AnimatePresence>
            <Switch location={location} key={location.key}>
              <Route path='/Patient/Detail/:nik' component={Detail}/>
              <Route path='/Patient/Search' component={Search}/>
              <Route path='/Patient/Add' component={Add}/>  
              <Route path='/Patient' component={Patient}/>
              <Route path='/Monitor' component={Monitor}/>
              <Route path='/' component={Dashboard}/>
            </Switch>
          </AnimatePresence>
          
    </div>
          


  );
}

export default App;
