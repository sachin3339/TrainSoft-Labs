import {  useContext } from "react";
import Login from "./Components/Screens/Auth/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Assets/css/main.css'
import Dashboard from "./Components/Layout/Dashboard/Dashboard";
import { Router } from "./Components/Common/Router";
import ClassLab from "./Components/Screens/ClassLab/ClassLab";
import Spinner from "./Components/Common/Spinner/Spinner";
import AppContext from "./Store/AppContext";


function App() {
   const appContext = useContext(AppContext)
  return (<>
      <Spinner value={appContext.spinner}/>
      <Router basepath="/">
         <Login path="login"/>
         <Dashboard path="/*"/>
         <ClassLab path="class/*"/>
      </Router>
 </> );
}

export default App;
