import { Router } from "../../Shared/Router";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import Home from "../Home/Home";
import Report from "../Report/Report";
import Setting from "../Setting/Setting";
import Batches from "../Batches/Batches";
import Participant from "../Participants/Participants";
import Calender from "../Calender/Calender";
import Labs from "../Labs/Labs";
import Support from "../Support/Support";
import BatchesDetails from "../Batches/BatchDetails";
import ParticipantsDetails from "../Participants/ParticipantsDetails";
import LabStore from "../LabStore.js/LabStore";
import LabList from "../LabStore.js/LabList";
import Course from "../Course/Course";


const Dashboard = ({location}) => {
    console.log(location)
    return (
        
        <div className="main-page">
            <div><Sidebar /></div>
            <div className="dashboard-page">
                <Header {...{location}} />
                <div className="dashboard-container">
                    <Router>
                        <Home path="/" />
                        <Report path="report" />
                        <Setting path="setting" />
                        <Batches path="batches/*"/>
                        <Course path="course/*"/>
                        <Participant path="participant/*"/>
                        <Calender path="calender/*"/>
                        <Labs path="labs/*"/>
                        <Support path="support/*"/>
                        <LabStore path="labstore/*"/>
                        {/* <ParticipantsDetails path="participants-details"/> */}
                    </Router>
                </div>
            </div>
        </div>)
}

export default Dashboard