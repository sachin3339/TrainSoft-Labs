import { Form } from 'react-bootstrap';
import { ICN_ARROW_DOWN, ICN_MARK, ICN_PARTICIPANT } from '../../../Common/Icon';
import { Router } from '../../../Common/Router';
import SearchBox from '../../../Common/SearchBox/SearchBox';
import '../assessment.css'
import AssessmentRender from './AssessmentRender';


const data = [
    {title: "Advanced Java",desc:"This assessment lets you test your basic understanding of the Java programming language.",deficulty: "Beginner",question:10,duration:"30 Mins",status:"progress"},
    {title: "Java Essesntials",desc:"This assessment lets you test your basic understanding of the Java programming language.",deficulty: "Beginner",question:10,duration:"30 Mins",status:"ongoing"},
    {title: "Object Oriented Programming with Java",desc:"This assessment lets you test your basic understanding of the Java programming language.",deficulty: "Beginner",question:10,duration:"30 Mins",status:"quit"},
    {title: "Personality Index",desc:"This assessment lets you test your basic understanding of the Java programming language.",deficulty: "Beginner",question:10,duration:"30 Mins",status:"completed"},
    {title: "Angular JS Fundamentals",desc:"This assessment lets you test your basic understanding of the Java programming language.",deficulty: "Beginner",question:10,duration:"30 Mins",status:"ongoing"},
    {title: "Domain Tests",desc:"This assessment lets you test your basic understanding of the Java programming language.",deficulty: "Beginner",question:10,duration:"30 Mins",status:"completed"},
]



const CatalogueDetails = ({location})=>{

    return(<>
        <div className="row">
          <div className="col-sm-3 jcb border-bottom px-3">
            <div className="title-md">
                Filter
            </div>
            <div className="">
                Clear
            </div>
         </div>
          <div className="col-sm-9 jcb mb-3">
            <div> 432 Assessments </div>
            <div> <SearchBox/> </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <div className="title-sm jcb my-3">
                <div>Technology</div>
                    <div>{ICN_ARROW_DOWN}</div>
             </div>

             <div className="jcb">
                      <Form.Check custom inline label="Java" type="checkbox" id={`custom-Beginner`}/>
                      <div>24</div>
                    </div>
                    <div className="jcb my-2">
                       <Form.Check custom inline label="Angular" type="checkbox" id={`custom-Intermediate`}/>
                    <div>23</div>
                    </div>
                    <div className="jcb">
                        <Form.Check custom inline label="React Js" type="checkbox" id={`custom-Expert`}/>
                    <div>22</div>
                     </div>
                     <div className="jcb">
                        <Form.Check custom inline label="Python" type="checkbox" id={`custom-Expert`}/>
                    <div>22</div>
                     </div>

             <div className="title-sm jcb my-3">
                <div>Difficulty</div>
                    <div>{ICN_ARROW_DOWN}</div>
             </div>
                    <div className="jcb">
                      <Form.Check custom inline label="Beginner" type="checkbox" id={`custom-Beginner`}/>
                      <div>224</div>
                    </div>
                    <div className="jcb my-2">
                       <Form.Check custom inline label="Intermediate" type="checkbox" id={`custom-Intermediate`}/>
                    <div>22</div>
                    </div>
                    <div className="jcb">
                        <Form.Check custom inline label="Expert" type="checkbox" id={`custom-Expert`}/>
                    <div>22</div>
                    </div>
                    
         </div>
          <div className="col-sm-9">
            <div className="">
                <AssessmentRender {...{data}}/>
            </div>
          </div>
        </div>

    </>
    )

}

export default CatalogueDetails;

