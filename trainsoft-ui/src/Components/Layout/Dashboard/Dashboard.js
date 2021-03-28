import { Router } from "../../Common/Router";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Home from "../../Screens/Home/Home";
import Report from "../../Screens/Report/Report";
import Setting from "../../Screens/Setting/Setting";
import Batches from "../../Screens/Batches/Batches";
import Calender from "../../Screens/Calender/Calender";
import Labs from "../../Screens/Labs/Labs";
import Support from "../../Screens/Support/Support";
import LabStore from "../../Screens/LabStore.js/LabStore";
import Course from "../../Screens/Course/Course";
import OrgMgmt from "../../Screens/OrgMgmt/OrgMgmt";
import Training from "../../Screens/Training/Traning";
import User from "../../Screens/Users/Users";
import UserHome from "../../Screens/Home/UserHome";
import CodeEditor from '../../Screens/ClassLab/CodeEditor/CodeEditor'
import Zoom from "../../Zoom/Zoom";
import VsCode from "../../Screens/VsCode/VsCode";


const Dashboard = ({location}) => {
    return (
        <div className="main-page">
            <div><Sidebar {...{location}} /></div>
            <div className={`dashboard-page`}>
                <Header {...{location}} />
                <div className="dashboard-container" className={`dashboard-container ${location.state.title === "VS Code" ? 'p-0 full-h': ''}`}>
                    <Router>
                        <Home path="dashboard" />
                        <UserHome path="home"/>
                        <Report path="report/*" />
                        <Setting path="setting" />
                        <Batches path="batches/*"/>
                        <OrgMgmt path="org-mgmt/*"/>
                        <Course path="course/*"/>
                        <Training path="training/*"/>
                        <Calender path="calender/*"/>
                        <Labs path="labs/*"/>
                        <User path="user"/>
                        <Support path="support/*"/>
                        <LabStore path="labstore/*"/>
                        <CodeEditor path="compiler/*"/>
                        <Zoom path="zoom"/>
                        <VsCode path="vscode"/>
                    </Router>
                </div>
            </div>
        </div>)
}

export default Dashboard