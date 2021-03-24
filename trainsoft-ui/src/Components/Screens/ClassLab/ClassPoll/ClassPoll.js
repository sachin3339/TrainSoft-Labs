import { useState } from 'react';

import { Formik } from 'formik';
import { BtnRound, Button } from "../../../Common/Buttons/Buttons";
import { Form } from 'react-bootstrap';
import { ICN_ASSESSMENT, ICN_RECORD } from '../../../Common/Icon';
import { BsModal, Progress } from '../../../Common/BsUtils';
import { Pie } from 'react-chartjs-2';

const createBatches = {
    batchName: '',
    duration: '',
    question: '',
    course: '',
    instructor: ''

}


const ClassPoll = ({ show, setShow }) => {

    const [record, setRecord] = useState(false)
    const [assessment, setAssessment] = useState(true)
    const [doughnutData,setDoughnutData] = useState({
        labels: ['Androids', 'iOS'],
        datasets: [{
            data: [70,30],
            backgroundColor: ['#FF007C', '#FFFFFF'],
            hoverBackgroundColor: ['#FF007C', '#FFFFFF'],
            borderColor: '#ddd',
        }],
        text: '23%'
    })

    return (<div>
        <BsModal {...{ show, setShow, headerTitle: "Create a Knowledge Check Poll", size: "lg" }}>
            {/* <div className="form-container">
            <Formik
                onSubmit={()=>console.log('a')}
                initialValues={createBatches}
            >
                {({ handleSubmit, isSubmitting, dirty }) => <form onSubmit={handleSubmit} className="create-batch" >
                        <div className="edit-shipping">
                            <Form.Group className="row">
                                <div className="col-8">
                                    <TextInput label="Poll Name" name="batchName"/>
                                </div>
                                <div className="col-4">
                                   <TextInput label="Duration" name="duration"/>
                                </div>
                            </Form.Group>
                            <Form.Group className="row">
                                <div className="col-12">
                                  <TextInput label="Question" name="question"/>
                                </div>
                            
                            </Form.Group>
                            <div className="">
                            <label className="label form-label">Options</label>
                            <div className="row">
                               <div className="col-1">
                                 <div className="check-box"></div>
                                </div>
                                <div className="col-11">
                                  <TextInput  name="instructor"/>
                                </div>
                            </div>
                            <div className="row mt-2">
                               <div className="col-1">
                                 <div className="check-box"></div>
                                </div>
                                <div className="col-11">
                                  <TextInput  name="instructor"/>
                                </div>
                            </div>
                            </div>
                            <div><BtnRound>+</BtnRound></div>
                    </div>
                    <footer className="jcb">
                        <div></div>
                        <div>
                           <Button type="submit">Publish</Button>
                        </div>
                    </footer>
                </form>
                }
            </Formik>
            </div> */}
            <div>
                <div className="row">
                    <div className="col-6">
                        <div className="title-sm">Poll Name</div>
                        <div className="pb-2">Operating System preference</div>
                        <div className="title-sm">Question</div>
                        <div className="pb-2">What is your preferred OS?</div>
                        <div className="flx mt-3">
                            <div>
                                <div className={`btn-square ${assessment ? 'btn-active': ''}`} onClick={() => { setAssessment(true); setRecord(false) }}>
                                    {ICN_ASSESSMENT}
                                </div>
                                <div className="title-sm">Option</div>
                            </div>
                            <div className={`btn-square mx-2 ${record ? 'btn-active': ''}`} onClick={() => { setAssessment(false); setRecord(true) }}>
                                {ICN_RECORD}
                            </div>
                        </div>
                        <div className="title-lg my-4">00:05 MM:SS</div>
                    </div>
                    <div className="col-6 jcc-c">
                        {assessment && <>
                            <Progress className="mb-2" label="Androids" variant="secondary" value="80" />
                            <Progress variant="danger" label="iOS" value="40" />
                        </>
                        }
                        {record && <>  {doughnutData &&
                                        <Pie
                                            data={doughnutData}
                                            option={{
                                                title: { display: true, text: 'Connected, Abandoned', fontSize: '25px' },
                                                legend: {
                                                    display: false,
                                                    labels: {
                                                        boxWidth: 18
                                                    }
                                                },
                                            }}
                                        />
                                    }
                        </>
                        }

                    </div>
                </div>
                <div className="jcse">
                    <div><Button className="px-4">End Poll</Button></div>
                    <div><Button className="px-4">Delete Poll</Button></div>
                    <div><Button className="px-4">Publish Poll</Button></div>
                </div>
            </div>
        </BsModal>
    </div>)
}

export default ClassPoll