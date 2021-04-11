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
import LandingHome from "./Components/LandingPage/Home/LandingHome";
import ResetPwd from "./Components/Screens/Auth/ResetPwd";
import Assesment from "./Components/Screens/Assesment/Assesment";
import { TrainingProvider } from "./Store/TrainingContext";
import VsCode from "./Components/Screens/VsCode/VsCode";
import MeetingClose from "./Components/Zoom/MeetingClose";





function App() {
   const {spinner} = useContext(AppContext)
  return (<>
      <Spinner value={spinner}/>
      <TrainingProvider>
         <Router>
            <LandingHome path="/"/>
            <ResetPwd path="/reset/:token"/>
            <Login path="/login"/>
            <Assesment path="/assesment"/>
            <Dashboard path="/*"/>
            <ClassLab path="class/*"/>
            <VsCode path="vscode"/>
            <MeetingClose path="zoomclose"/>

         </Router>
      </TrainingProvider>
 </> );
}

export default App;
