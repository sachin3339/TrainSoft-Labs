import { useContext, useState,useEffect } from "react";
import '../Batches/batches.css'
import './training.css'
import { TabBtn } from "../../Common/Buttons/Buttons";
import SearchBox from "../../Common/SearchBox/SearchBox";
import TrainingInfo from "./TrainingInfo/TrainingInfo";
import { Router } from "../../Common/Router";
import Session from "./Session/Session";
import Assessment from "./Assessment/Assessment";
import Forum from "./Forum/Forum";
import Report from "./Report/Report";
import { useNavigate } from "@reach/router"
import CardHeader from "../../Common/CardHeader";
import useToast from "../../../Store/ToastHook";
import moment from 'moment'
import AppContext from "../../../Store/AppContext";
import TrainingContext from "../../../Store/TrainingContext";
import RestService from "../../../Services/api.service";

const TrainingDetails = ({ location }) => {
    // const {spinner} = useContext(AppContext)
    // const {setTraining,training} = useContext(TrainingContext)
    // const Toast = useToast()
    const navigate = useNavigate();
    // get all training
    // const getTrainingsBySid = async () => {
    //     try {
    //         spinner.show();
    //         RestService.getTrainingBySid(location.state.sid).then(
    //             response => {
    //                 response && response.data && setTraining(...response.data);
    //                 spinner.hide();
    //             },
    //             err => {
    //                 spinner.hide();
    //             }
    //         )
    //     } catch (err) {
    //         spinner.hide();
    //         console.error("error occur on getTrainings()", err)
    //     }
    // }


    return (<>
        <div className="table-shadow p-3">
            <CardHeader {...{location}}/>
            <div className="flx my-2 mb-4 tab-btn-group">
                <TabBtn active={location.state.subPath === "/"} onClick={() => navigate("/training/training-details", { state: { path:'training', title: 'Training',subTitle:"Training Info", subPath:"/" } })}>Training Info</TabBtn>
                <TabBtn active={location.state.subPath === "session"} onClick={() => navigate("/training/training-details/session", { state: {path:'training',sid:location.state.rowData, title: 'Training',subTitle:"Sessions",subPath:"session" } })}>Sessions</TabBtn>
                <TabBtn active={location.state.subPath === "assessment"} onClick={() => navigate("/training/training-details/assessment", {path:'training', state: {sid:location.state.rowData, title: 'Training',subTitle:"Assessments",subPath:"assessment" } })}>Assessments</TabBtn>
                <TabBtn active={location.state.subPath === "report"} onClick={() => navigate("/training/training-details/report", { state: {path:'training', title: 'Training',subTitle:"Report",subPath:"report" } })}>Report</TabBtn>
                <TabBtn active={location.state.subPath === "forum"} onClick={() => navigate("/training/training-details/forum", { state: {path:'training', title: 'Training',subTitle:"Discussion Forum",subPath:"forum" } })}>Discussion Forum</TabBtn>
            </div>
            <Router>
                <TrainingInfo path="/"/>
                <Session path="session" />
                <Assessment path="assessment" />
                <Report path="report" />
                <Forum path="forum" />
            </Router>

        </div></>)
}
export default TrainingDetails