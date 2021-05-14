import React, { useContext } from 'react'
import { ICN_CIRCLE_C, ICN_MARK } from "../../../Common/Icon"
import { Button } from '../../../Common/Buttons/Buttons';
import { userConfig } from "../../../Layout/Sidebar/SidebarConfig";
import AppContext from "../../../../Store/AppContext";
import { Link, navigate } from "../../../Common/Router";
import NoDataFound from '../../../Common/NoDataFound/NoDataFound';
import PaginationOne from '../../../Common/Pagination';


const AssessmentRender =({data,fromMyAt=false,count,setPageNo}) =>{
    const {user} = useContext(AppContext)

    return(<>
        {data.map(res=>
                <div className="assList">
                    <div>
                        <div className="title-md"> {res?.title} </div>
                        <div className=""> {res?.description} </div>
                        <div className="mt-2">
                            <span className="text-capitalize"> {res?.difficulty?.toLowerCase()}</span> <span className="mx-2">{res?.noOfQuestions} Question</span> <span>{res?.duration}</span>
                        </div>
                    </div>
                    <div className="assestRight">
                        { !fromMyAt ? <>
                        <div> {ICN_MARK} </div>
                        <div><Button onClick={()=>navigate(`../assessment/${res.sid}/${user.companySid}/${user.sid}`)}>Take Now </Button></div>
                        </>:<>
                            {res.status === "ongoing" && <div className="Ongoing">{ICN_CIRCLE_C} Ongoing </div>}
                            {res.status === "progress" && <div className="Ongoing">{ICN_CIRCLE_C} Ongoing </div>}
                            {res.status === "completed" && <div className="text-success">Completed </div>}
                            {res.status === "quit" && <div>Quit</div>}
                            {res.status === "completed" &&<div className="aic"><div className="nav-link">{"a"} Download Certificate</div> <div>Score: 95%</div></div>}
                            {res.status === "ongoing" && <Button>Resume</Button>}
                            {res.status === "quit" && <Button onClick={()=>navigate(`../assessment/${res.sid}/${user.companySid}/${user.sid}`)}>Try Again</Button>}
                        </> }
                    </div>
                </div>
            )}
           <div className="jcc"> 
               <PaginationOne totalCount={count} onNavigate={setPageNo}/>
           </div>
            {data.length === 0 && <NoDataFound title="No data found"/>}
    </>)

}
export default AssessmentRender