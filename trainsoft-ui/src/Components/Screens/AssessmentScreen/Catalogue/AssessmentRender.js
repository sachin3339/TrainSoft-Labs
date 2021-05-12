import { ICN_CIRCLE_C, ICN_MARK } from "../../../Common/Icon"
import { Button } from '../../../Common/Buttons/Buttons';


const AssessmentRender =({data,fromMyAt=false}) =>{

    return(<>
        {data.map(res=>
                <div className="assList">
                    <div>
                        <div className="title-md"> {res.title} </div>
                        <div className=""> {res.desc} </div>
                        <div className="mt-2">
                            <span> {res.deficulty}</span> <span className="mx-2">{res.question} Question</span> <span>{res.duration}</span>
                        </div>
                    </div>
                    <div className="assestRight">
                        { !fromMyAt ? <>
                        <div> {ICN_MARK} </div>
                        <div><Button> Take Now</Button></div>
                        </>:<>
                            {res.status === "ongoing" && <div className="Ongoing">{ICN_CIRCLE_C} Ongoing </div>}
                            {res.status === "progress" && <div className="Ongoing">{ICN_CIRCLE_C} Ongoing </div>}
                            {res.status === "completed" && <div className="text-success">Completed </div>}
                            {res.status === "quit" && <div>Quit</div>}

                            {res.status === "completed" &&<div className="aic"><div className="nav-link">{"a"} Download Certificate</div> <div>Score: 95%</div></div>}
                            {res.status === "ongoing" && <Button>Resume</Button>}
                            {res.status === "quit" && <Button>Try Again</Button>}


                        </> }
                    </div>
                </div>
            )}
    </>)

}
export default AssessmentRender