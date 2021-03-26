import { TabBtn } from "../../Common/Buttons/Buttons"
import { navigate } from "../../Common/Router"

const TrainingRoute = ({location})=>{
    return(<>
              <div className="flx my-2 mb-4 tab-btn-group">
                <TabBtn active={location.state.subPath === "/"} onClick={() => navigate("/training/training-details", { state: { path:'training', title: 'Training',subTitle:"Training Info", subPath:"/" } })}>Training Info</TabBtn>
                <TabBtn active={location.state.subPath === "session"} onClick={() => navigate("/training/training-details/session", { state: {path:'training',sid:location.state.rowData, title: 'Training',subTitle:"Sessions",subPath:"session" } })}>Sessions</TabBtn>
                <TabBtn active={location.state.subPath === "assessment"} onClick={() => navigate("/training/training-details/assessment", {path:'training', state: {sid:location.state.rowData, title: 'Training',subTitle:"Assessments",subPath:"assessment" } })}>Assessments</TabBtn>
                <TabBtn active={location.state.subPath === "report"} onClick={() => navigate("/training/training-details/report", { state: {path:'training', title: 'Training',subTitle:"Report",subPath:"report" } })}>Report</TabBtn>
                <TabBtn active={location.state.subPath === "forum"} onClick={() => navigate("/training/training-details/forum", { state: {path:'training', title: 'Training',subTitle:"Discussion Forum",subPath:"forum" } })}>Discussion Forum</TabBtn>
            </div>
    </>)
}
export default TrainingRoute