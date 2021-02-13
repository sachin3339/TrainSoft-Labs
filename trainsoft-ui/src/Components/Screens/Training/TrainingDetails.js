import { useState } from "react";
import '../Batches/batches.css'
import './training.css'
import { TabBtn } from "../../Common/Buttons/Buttons";
import SearchBox from "../../Common/SearchBox/SearchBox";
import TrainingInfo from "./TrainingInfo/TrainingInfo";
import { navigate, Router } from "../../Common/Router";
import Session from "./Session/Session";


const TrainingDetails = ({location}) => {
    console.log(location)
    return (<>
        <div className="table-shadow p-3">
        <div className="jcb ">
                <div className="">Training</div>
                <SearchBox/>
            </div>
            <div className="flx my-2">
                <TabBtn onClick={()=>navigate("/training/training-details")}>Training Info</TabBtn>
                <TabBtn onClick={()=>navigate(location.pathname + "/session")}>Sessions</TabBtn>
                <TabBtn>Labs</TabBtn>
                <TabBtn>Assessments</TabBtn>
                <TabBtn>Reports</TabBtn>
            </div>
           <Router>
                  <TrainingInfo path="/"/>
                  <Session path="session"/>
           </Router>
           
        </div></>)
}
export default TrainingDetails