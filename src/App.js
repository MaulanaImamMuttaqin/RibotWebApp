import React, {useState, useEffect, useRef, Fragment} from 'react';
import { Switch, Route, Link, useLocation} from "react-router-dom";
import "./App.css"
import Login from './components/Auth/Login';
import { AuthProvider } from './Auth/AuthContext';
import Header from './components/Main/Header';
import Body from './components/Main/Body';
import Controller from './components/Main/Controller';



function App() {
  return (
    <div>
        <AuthProvider>
        
            <Switch>
              <Route path='/Login' component={Login}/>
              <Route path='/' render={() =>
                    <Fragment>
                        <Header/>
                        <Body/>
                        <Controller/>
                    </Fragment>
                    } />
            </Switch>

        </AuthProvider>
          
    </div>
          


  );
}

export default App;
