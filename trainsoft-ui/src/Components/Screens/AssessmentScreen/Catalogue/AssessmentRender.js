import React, { useContext } from 'react'
import { ICN_CIRCLE_C, ICN_DOWNLOADS, ICN_MARK } from "../../../Common/Icon"
import { Button } from '../../../Common/Buttons/Buttons';
import { userConfig } from "../../../Layout/Sidebar/SidebarConfig";
import AppContext from "../../../../Store/AppContext";
import { Link, navigate } from "../../../Common/Router";
import NoDataFound from '../../../Common/NoDataFound/NoDataFound';
import PaginationOne from '../../../Common/Pagination';
import RestService from '../../../../Services/api.service';
import useToast from '../../../../Store/ToastHook';
import AssessmentContext from '../../../../Store/AssessmentContext';


const AssessmentRender = ({ data, fromMyAt = false, count, setPageNo, key = "" }) => {
    const { user, spinner, setFromLogin } = useContext(AppContext)
    const { bookmark, setBookmark, myAssessment } = useContext(AssessmentContext)
    const Toast = useToast()


    // add to bookmark
    const createBookmark = async (sid) => {
        spinner.show("Loading... wait");
        try {
            let payload = {
                "assessmentSid": sid,
                "virtualAccountSid": user.sid
            }
            let { data } = await RestService.createBookmark(payload)
            Toast.success({ message: "Bookmark successfully" })
            getBookmark()
            spinner.hide();
        } catch (err) {
            spinner.hide();
            console.error("error occur on createBookmark()", err)
        }
    }

    //  getBookmark 
    const getBookmark = async (categorySid) => {
        spinner.show("Loading... wait");
        try {
            let { data } = await RestService.getBookmark(user.sid)
            setBookmark(data);
            spinner.hide();
        } catch (err) {
            spinner.hide();
            console.error("error occur on getBookmark()", err)
        }
    }

    // remove from bookmark
    const removeBookmark = async (sid) => {
        spinner.show("Loading... wait");
        try {
            let payload = {
                "assessmentSid": sid,
                "virtualAccountSid": user.sid
            }
            let { data } = await RestService.removeBookmark(payload)
            setBookmark(bookmark.filter(res => res.sid !== sid))
            Toast.success({ message: "Bookmark removed successfully" })
            spinner.hide();
        } catch (err) {
            spinner.hide();
            console.error("error occur on removeBookmark()", err)
        }
    }

    return (<>
        {data.map(res =>
            <div className="assList" key={res.sid}>
                <div>
                    <div className="title-md"> {res?.title} </div>
                    <div className=""> {res?.description} </div>
                    <div className="mt-2 aic">
                        <span className="text-capitalize"> {res?.difficulty?.toLowerCase()}</span><div className="list-circle"></div> <span className="">{res?.noOfQuestions} Question</span> <div className="list-circle"></div> <span>{res?.duration} Mins</span>
                    </div>
                </div>
                <div className="assestRight text-bold">
                    {!fromMyAt ? <>
                        {myAssessment.some(resp => resp?.quizSetSid === res.sid) ? <div className="text-danger"></div>: <div className={`pointer ${bookmark.some(resp => resp.sid === res.sid) ? 'bookMarkColor' : ''}`} onClick={() => { bookmark.some(resp => resp.sid === res.sid) ? removeBookmark(res.sid) : createBookmark(res.sid) }}> {ICN_MARK} </div>}
                        <div>
                            {myAssessment.some(resp => resp?.quizSetSid === res.sid) ? <> <Button disabled={true} onClick={() => { setFromLogin(true); navigate(`../assessment/${res.sid}/${user.companySid}/${user.sid}`, { state: { from: "assessmentDashboard" } }) }}> Already Taken </Button> </> : <> <Button onClick={() => { setFromLogin(true); navigate(`../assessment/${res.sid}/${user.companySid}/${user.sid}`, { state: { from: "assessmentDashboard" } }) }}>Take Now </Button></>}
                        </div>
                    </> : <>
                        {res.status === "STARTED" && <div className="Ongoing font-weight-bold">{ICN_CIRCLE_C} Ongoing </div>}
                        {res.status === "progress" && <div className="Ongoing font-weight-bold">{ICN_CIRCLE_C} Ongoing </div>}
                        {res.status === "COMPLETED" && <div className="text-success font-weight-bold">Completed </div>}
                        {res.status === "QUIT" && <div className="text-danger font-weight-bold">Quit</div>}
                        {res.status === "COMPLETED" && <div className="aic jce">
                            {/* <div className="nav-link text-primary pointer font-weight-bold">{ICN_DOWNLOADS} Download Certificate</div>  */}
                            <div>Score: <span className="title-md">{res.score}%</span></div></div>}
                        {res.status === "STARTED" && <Button className="disabled">Resume</Button>}
                        {res.status === "QUIT" &&<div> <Button onClick={() => { setFromLogin(true); navigate(`../assessment/${res.quizSetSid}/${user.companySid}/${user.sid}`, { state: { from: "assessmentDashboard" } }) }}>Try Again</Button></div>}

                    </>}
                </div>
            </div>
        )}
        <div className="jcc">
            <PaginationOne totalCount={count} onNavigate={setPageNo} />
        </div>
        {data.length === 0 && <NoDataFound title="No data found" />}
    </>)

}
export default AssessmentRender