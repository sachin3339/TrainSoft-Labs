import {  useContext,useEffect } from "react";
import Login from "./Components/Screens/Auth/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Assets/css/main.css'
import Dashboard from "./Components/Layout/Dashboard/Dashboard";
import { Router } from "./Components/Common/Router";
import ClassLab from "./Components/Screens/ClassLab/ClassLab";
import Spinner from "./Components/Common/Spinner/Spinner";
import AxiosService from './Services/axios.service';
import AppContext from "./Store/AppContext";




function App() {
   const {user,spinner} = useContext(AppContext)

   useEffect(() => {
      AxiosService.init('',user.jwtToken);
   }, [])

  return (<>
      <Spinner value={spinner}/>
      <Router>
         <Login path="/"/>
         <Dashboard path="/*"/>
         <ClassLab path="class/*"/>
      </Router>
 </> );
}

export default App;
