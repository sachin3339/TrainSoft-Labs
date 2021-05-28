import {  useContext,useEffect } from "react";
import Login from "./Components/Screens/Auth/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Assets/css/main.css'
import Dashboard from "./Components/Layout/Dashboard/Dashboard";
import { navigate, Router } from "./Components/Common/Router";
import ClassLab from "./Components/Screens/ClassLab/ClassLab";
import Spinner from "./Components/Common/Spinner/Spinner";
import AxiosService from './Services/axios.service';
import AppContext from "./Store/AppContext";
import LandingHome from "./Components/LandingPage/Home/LandingHome";
import ResetPwd from "./Components/Screens/Auth/ResetPwd";
import Assessment from "./Components/Screens/Assessment/Assessment";
import { TrainingProvider } from "./Store/TrainingContext";
import VsCode from "./Components/Screens/VsCode/VsCode";
import MeetingClose from "./Components/Zoom/MeetingClose";
import { AssessmentProvider } from "./Store/AssessmentContext";





function App() {
   const {spinner} = useContext(AppContext)
   // useEffect(() => {
   //    navigate('./login')
   // }, [])
  return (<>
      <Spinner value={spinner}/>
      <AssessmentProvider>
      <TrainingProvider>
         <Router>
            <LandingHome path="/landing"/>
            <ResetPwd path="/reset/:token"/>
            <Login path="/"/>
            <Assessment path="/assessment/:assessmentSid/:companySid/:virtualAccountSid"/>
            <Dashboard path="/*"/>
            <ClassLab path="class/*"/>
            <VsCode path="vscode"/>
            <MeetingClose path="/zoomclose"/>
         </Router>
      </TrainingProvider>
      </AssessmentProvider>
 </> );
}

export default App;
