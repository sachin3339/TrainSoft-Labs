import { Fragment } from "react";
import Login from "./Screens/Auth/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Assets/css/main.css'
import Dashboard from "./Screens/Dashboard/Dashboard";
import { Router } from "./Shared/Router";


function App() {
  return (<>
      <Router basepath="/">
         <Login path="/"/>
         <Dashboard path="dashboard/*"/>
      </Router>
 </> );
}

export default App;
