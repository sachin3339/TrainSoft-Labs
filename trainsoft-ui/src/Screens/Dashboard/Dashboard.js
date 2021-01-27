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


const Dashboard = () => {
    return (
        <div className="main-page">
            <div><Sidebar /></div>
            <div className="dashboard-page">
                <Header />
                <div className="dashboard-container">
                    <Router>
                        <Home path="/" />
                        <Report path="report" />
                        <Setting path="setting" />
                        <Batches path="batches"/>
                        <Participant path="participant"/>
                        <Calender path="calender"/>
                        <Labs path="labs"/>
                        <Support path="support"/>
                    </Router>
                </div>
            </div>
        </div>)
}

export default Dashboard