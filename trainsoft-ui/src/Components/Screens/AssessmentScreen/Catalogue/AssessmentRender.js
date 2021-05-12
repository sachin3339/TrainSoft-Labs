import { ICN_MARK } from "../../../Common/Icon"
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
                        
                        </> }
                    </div>
                </div>
            )}
    </>)

}
export default AssessmentRender