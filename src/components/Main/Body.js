import React from 'react'
import Login from '../Auth/Login'
import Dashboard from '../Dashboard/Dashboard'
import Monitor from '../Monitor/Monitor'
import Patient from '../Patient/Patient'
import Add from '../Patient/Subcomponents/Add'
import Detail from '../Patient/Subcomponents/Detail'
import Search from '../Patient/Subcomponents/Search'
import {AnimatePresence} from "framer-motion"
import { Switch, Route, useLocation} from "react-router-dom";

export default function Body() {
    const location = useLocation();

    return (
        <div>
            <AnimatePresence>
            <Switch location={location} key={location.key}>
              <Route path='/Patient/Detail/:nik' component={Detail}/>
              <Route path='/Patient' component={Search}/>
              <Route path='/Monitor' component={Monitor}/>
              <Route path='/Login' component={Login}/>
              <Route path='/' component={Dashboard}/>
            </Switch>
          </AnimatePresence>
        </div>
    )
}
