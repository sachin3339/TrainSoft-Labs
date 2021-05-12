import React, { useState } from 'react'
import { Form ,Tab , Nav} from 'react-bootstrap';
import { Button } from '../../../Common/Buttons/Buttons';
import { ICN_ARROW_DOWN, ICN_MARK, ICN_PARTICIPANT } from '../../../Common/Icon';
import { Router } from '../../../Common/Router';
import SearchBox from '../../../Common/SearchBox/SearchBox';
import '../assessment.css'
import AssessmentRender from '../Catalogue/AssessmentRender';


const data = [
    {title: "Advanced Java",desc:"This assessment lets you test your basic understanding of the Java programming language.",deficulty: "Beginner",question:10,duration:"30 Mins",status:"progress"},
    {title: "Java Essesntials",desc:"This assessment lets you test your basic understanding of the Java programming language.",deficulty: "Beginner",question:10,duration:"30 Mins",status:"ongoing"},
    {title: "Object Oriented Programming with Java",desc:"This assessment lets you test your basic understanding of the Java programming language.",deficulty: "Beginner",question:10,duration:"30 Mins",status:"quit"},
    {title: "Personality Index",desc:"This assessment lets you test your basic understanding of the Java programming language.",deficulty: "Beginner",question:10,duration:"30 Mins",status:"completed"},
    {title: "Angular JS Fundamentals",desc:"This assessment lets you test your basic understanding of the Java programming language.",deficulty: "Beginner",question:10,duration:"30 Mins",status:"ongoing"},
    {title: "Domain Tests",desc:"This assessment lets you test your basic understanding of the Java programming language.",deficulty: "Beginner",question:10,duration:"30 Mins",status:"completed"},
]




const MyAssessment = ({location})=>{
    const [key,setKey] = useState("allAssessment")

    return(<>
             <Tab.Container defaultActiveKey={key} onSelect={k => setKey(k)}>
                    <Nav variant="pills" className="flex-row">
                        <Nav.Item>
                            <Nav.Link eventKey="allAssessment">All Assessments (15)</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="ongoing">Ongoing (2)</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="completed">Completed (12)</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="quit">Quit(1)</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="bookmarked">Bookmarked</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="allAssessment">
                            {key === 'allAssessment' && <div className="p15">
                             <AssessmentRender {...{data,fromMyAt:true}}/>
                            </div>}
                        </Tab.Pane>
                        <Tab.Pane eventKey="ongoing">
                            {key === 'ongoing' && <div className="card-container d-flex">
                               
                            </div>}
                        </Tab.Pane>
                        <Tab.Pane eventKey="completed">
                            {key === 'completed' && <div className="card-container d-flex">
                                
                            </div>}
                        </Tab.Pane>
                        <Tab.Pane eventKey="quit">
                            {key === 'quit' && <div className="card-container d-flex">
                                
                            </div>}
                        </Tab.Pane>

                        <Tab.Pane eventKey="bookmarked">
                            {key === 'bookmarked' && <div className="card-container d-flex">
                                
                            </div>}
                        </Tab.Pane>
                      
                    </Tab.Content>
                </Tab.Container>
    </>
    )

}

export default MyAssessment;

