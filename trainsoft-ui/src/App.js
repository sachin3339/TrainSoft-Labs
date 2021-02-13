import { Fragment } from "react";
import Login from "./Components/Screens/Auth/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Assets/css/main.css'
import Dashboard from "./Components/Layout/Dashboard/Dashboard";
import { Router } from "./Components/Common/Router";
import ClassLab from "./Components/Screens/ClassLab/ClassLab";


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
