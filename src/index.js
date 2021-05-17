import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChartLine, faHome, faHospitalUser, faSearch, faPlus , faUser, 
  faChild, faRulerVertical, faTint, faUserPlus, faChevronRight, faCalendarPlus} from '@fortawesome/free-solid-svg-icons'

library.add(faChartLine, faHome, faHospitalUser, faSearch, faPlus, faUser , faChild, faRulerVertical, faTint,faUserPlus, faChevronRight , faCalendarPlus)
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
