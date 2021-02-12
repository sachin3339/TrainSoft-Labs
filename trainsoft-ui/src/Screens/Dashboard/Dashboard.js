import { Router } from "../../Shared/Router";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import Home from "../Home/Home";
import Report from "../Report/Report";
import Setting from "../Setting/Setting";
import Batches from "../Batches/Batches";
import Calender from "../Calender/Calender";
import Labs from "../Labs/Labs";
import Support from "../Support/Support";
import LabStore from "../LabStore.js/LabStore";
import Course from "../Course/Course";
import OrgMgmt from "../OrgMgmt/OrgMgmt";
import Training from "../Training/Traning";

const Dashboard = ({location}) => {
    console.log(location)
    return (
        
        <div className="main-page">
            <div><Sidebar {...{location}} /></div>
            <div className="dashboard-page">
                <Header {...{location}} />
                <div className="dashboard-container">
                    <Router>
                        <Home path="/" />
                        <Report path="report" />
                        <Setting path="setting" />
                        <Batches path="batches/*"/>
                        <OrgMgmt path="org-mgmt/*"/>
                        <Course path="course/*"/>
                        <Training path="training/*"/>
                        <Calender path="calender/*"/>
                        <Labs path="labs/*"/>
                        <Support path="support/*"/>
                        <LabStore path="labstore/*"/>
                    </Router>
                </div>
            </div>
        </div>)
}

export default Dashboard