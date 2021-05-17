import React, { useState,useContext,useEffect } from 'react'
import { Form ,Tab , Nav} from 'react-bootstrap';
import RestService from '../../../../Services/api.service';
import AppContext from '../../../../Store/AppContext';
import AssessmentContext from '../../../../Store/AssessmentContext';
import '../assessment.css'
import AssessmentRender from '../Catalogue/AssessmentRender';

const MyAssessment = ({location})=>{
    const {user,spinner} =  useContext(AppContext)
    const {bookmark} = useContext(AssessmentContext)
    const [key,setKey] = useState("ALL")
    const [myAssessment,setMyAssessment] = useState([])
    const [asseValue,setAsseValue] = useState([])

     // get avg. category 
   const getMyAssessment = async () => {
    spinner.show("Loading... wait");
    try {
      let { data } = await RestService.getMyAssessment(key,user.sid)
      setMyAssessment(data);
      key === "ALL" && setAsseValue(data)
      spinner.hide();
    } catch (err) {
      spinner.hide();
      console.error("error occur on getAvgCategory()", err)
    }
  }

  useEffect(() => {
    key === "bookmarked" ? setMyAssessment(bookmark): getMyAssessment()
  }, [key])
    return(<>
             <Tab.Container defaultActiveKey={key} onSelect={k => setKey(k)}>
                    <Nav variant="pills" className="flex-row">
                        <Nav.Item>
                            <Nav.Link eventKey="ALL">All Assessments ({asseValue.length})</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="STARTED">Ongoing ({asseValue.filter(res=>res.status ==="STARTED").length})</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="COMPLETED">Completed ({asseValue.filter(res=>res.status ==="COMPLETED").length})</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="QUIT">Quit ({asseValue.filter(res=>res.status ==="QUIT").length})</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="bookmarked">Bookmarked</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="ALL">
                            {key === 'ALL' && <div className="p15">
                             <AssessmentRender {...{data:myAssessment,fromMyAt:true}}/>
                            </div>}
                        </Tab.Pane>
                        <Tab.Pane eventKey="STARTED">
                            {key === 'STARTED' && <div className="card-container mt-3">
                             <AssessmentRender {...{data:myAssessment,fromMyAt:true}}/>
                               
                            </div>}
                        </Tab.Pane>
                        <Tab.Pane eventKey="COMPLETED">
                            {key === 'COMPLETED' && <div className="card-container mt-3">
                             <AssessmentRender {...{data:myAssessment,fromMyAt:true}}/>
                                
                            </div>}
                        </Tab.Pane>
                        <Tab.Pane eventKey="QUIT">
                            {key === 'QUIT' && <div className="card-container mt-3">
                             <AssessmentRender {...{data:myAssessment,fromMyAt:true}}/>
                                
                            </div>}
                        </Tab.Pane>

                        <Tab.Pane eventKey="bookmarked">
                            {key === 'bookmarked' && <div className="card-container mt-3">
                             <AssessmentRender {...{data:myAssessment,fromMyAt:false}}/>
                            </div>}
                        </Tab.Pane>
                      
                    </Tab.Content>
                </Tab.Container>
    </>
    )

}

export default MyAssessment;

