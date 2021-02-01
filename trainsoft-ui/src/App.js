import { Fragment } from "react";
import Login from "./Screens/Auth/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Assets/css/main.css'
import Dashboard from "./Screens/Dashboard/Dashboard";
import { Router } from "./Shared/Router";
import ClassLab from "./Screens/ClassLab/ClassLab";


function App() {
  return (<>
      <Router basepath="/">
         <Login path="login"/>
         <Dashboard path="/*"/>
         <ClassLab path="class/*"/>
      </Router>
 </> );
}

export default App;
