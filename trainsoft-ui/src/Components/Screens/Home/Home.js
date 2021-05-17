import React, { useContext, useEffect, useState } from 'react'
import Charts from '../../Charts/Charts'
import Table from 'react-bootstrap/Table'
import { ICN_COPY, ICN_COMING_BATCHES } from '../../Common/Icon';
import { Progress, Card } from '../../Common/BsUtils';
import {CircularProgressbar, buildStyles } from "react-circular-progressbar";
import CalenderGraph from '../../Common/CalenderGraph/CalenderGraph';
import AppContext from '../../../Store/AppContext';
import useFetch from "../../../Store/useFetch";
import GLOBELCONSTANT from "../../../Constant/GlobleConstant";
import { Router } from '../../Common/Router';
import "react-circular-progressbar/dist/styles.css";
import './home.css'
import RestService from '../../../Services/api.service';
import AssessmentContext from '../../../Store/AssessmentContext';



const AdminHome = () => {
    const { user, batches, course , ROLE, spinner,setCategory} = useContext(AppContext)
    const [batchCount,setBatchCount]  = useState(0)

      // get batches by sid

      const getBatchCount = async () => {
        try {
            RestService.getCount("vw_batch").then(
                response => {
                    setBatchCount(response.data);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getAllBatch()", err)
        }
    }

// get All topic
const getAllCategory = async () => {
    spinner.show("Loading... wait");
    try {
      let { data } = await RestService.getAllCategory()
      setCategory(data)
      spinner.hide();
    } catch (err) {
      spinner.hide();
      console.error("error occur on getAllTopic()", err)
    }
  }
    useEffect(() => {
        getBatchCount();
        getAllCategory()

    }, [])

    return (<div>
        <div className="row">
            <div className="col-md-8">
                {/* ..........user info......... */}
                <Card title="">
                    <div className="user-info">
                        <div className="title-lg">Welcome back {user.name}!</div>
                        <div>
                            <p className="mb-2">Since your last login on the system, there were:</p>
                               <div>
                                <div className="aic"><div className="red-circle"></div> <div>21 new enrollment</div></div>
                                <div className="aic"><div className="red-circle"></div> <div>15 courses completed </div></div>
                                <div className="aic"><div className="red-circle"></div> <div>45 new messages </div></div>

                            </div>
                        </div>
                    </div>
                </Card>
                {/* ..........End user info......... */}

            </div>
            <div className="col-md-4 ">
                {/* ..........Lms insight......... */}
                <Card title={`${user.role === ROLE.SUPERVISOR ? 'Lms insight' : 'Attendance Rate'} `} action={true}>
                    <div className="">
                        <div className="lms-card"><div className="lms-card-g">AWS Solution Architect</div><div>45 Enrolled <span></span></div></div>
                        <div className="lms-card"><div className="lms-card-p">Machine Learning</div><div>40 Enrolled</div> <span></span></div>
                        <div className="lms-card"><div className="lms-card-g">Splunk</div><div>40 Enrolled</div> <span></span></div>
                    </div>
                </Card>
                {/* ..........End Lms insight......... */}
            </div>
        </div>
        <div className="row mt-3">
            <div className="col-md-8">
                <div className="row">
                    <div className="col-md-7 pr-0">
                        {/* ..........Technology Activity......... */}
                        <Card title="Technology Activity" action={true}>
                            <Charts ChartType="activities" labelLeft="Employee percentile" />
                        </Card>
                        {/* ..........End Technology Activity......... */}

                        {/* ..........Analytic......... */}
                        <Card title="Analytic" className="mt-3" action={true}>
                            <div className="flx">
                                <div className="text-center ">
                                    <CircularProgressbar
                                        maxValue="1000"
                                        minValue="1" value="580"
                                        text={`580`}
                                        styles={buildStyles({
                                            trailColor: "#F5FBFF",
                                            pathColor: "#2D62ED",
                                        })} />
                                    <div className="mt-2">Active Learner</div>
                                </div>
                                <div className="text-center mx-4">
                                    <CircularProgressbar
                                        value="70"
                                        text={`70%`}
                                        styles={buildStyles({
                                            trailColor: "#F5FBFF",
                                            pathColor: "#7D00B5",
                                        })} />
                                    <div className="mt-2">Visitor Rate</div>
                                </div>

                                <div className="text-center">
                                    <CircularProgressbar
                                        maxValue="1000"
                                        minValue="1" value="789"
                                        text={`789`}
                                        styles={buildStyles({
                                            trailColor: "#F5FBFF",
                                            pathColor: "#00CCF2",
                                        })} />
                                    <div className="mt-2">Total Learners</div>
                                </div>

                            </div>
                        </Card>
                        {/* ..........End Analytic......... */}
                    </div>

                    <div className="col-md-5">
                        {/* ..........Batches......... */}
                        <Card className="full-h" title="Batches Stats" action={true}>
                            <div className="table-bless">
                                <Table className="table-borderless">
                                    <thead>
                                        <tr>
                                            <td>Name</td>
                                            <td className="progress-w">Progress</td>
                                            <td className="avgScore-w">Avg score</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {batches.slice(0, 10).map((res, i) =>
                                            <tr key={i}>
                                                <td>{res.name}</td>
                                                <td><Progress className="mb-2" className="progress-sh" variant={i % 2 === 0 ? 'secondary' : 'danger'} value={50} /></td>
                                                <td className="text-right">{50}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </Card>
                        {/* ..........End Batches......... */}
                    </div>
                </div>
            </div>
            <div className="col-md-4 column">
                <div className="mb-3">
                    <div className="row">
                            <div className="col-6">
                                <div className="grid-batch">
                                    <div className="mb10">{ICN_COPY}</div>
                                    <div>
                                        <div className="batch-title">{batchCount}</div>
                                        <div className="batch-label">On-going batches</div>
                                    </div>
                                    <div className="jce">
                                        <div className="grid-batch-icon">
                                            <i className="bi bi-arrows-angle-expand"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="grid-batch bg-purple">
                                    <div className="mb10">{ICN_COMING_BATCHES}</div>
                                    <div>
                                        <div className="batch-title">{course.length}</div>
                                        <div className="batch-label">Total Course</div>
                                                </div>
                                    <div className="jce">
                                        <div className="grid-batch-icon">
                                            <i className="bi bi-arrows-angle-expand"></i>
                                        </div>
                                    </div>
                                </div>  
                            </div> 
                    </div>
                </div>
                {/* ..........Calender......... */}
                <Card title="Calender" className="full-h">
                    <CalenderGraph />
                </Card>
                {/* ..........End Calender......... */}
            </div>
        </div>
    </div>)
}

const Home = () => {
    const { setCourse,setBatches,setDepartment,spinner } = useContext(AppContext)
    const {setCategory} = useContext(AssessmentContext)

        // get All topic
const getAllCategory = async () => {
    spinner.show("Loading... wait");
    try {
      let { data } = await RestService.getAllCategory()
      setCategory(data)
      spinner.hide();
    } catch (err) {
      spinner.hide();
      console.error("error occur on getAllTopic()", err)
    }
  }
    // get all courses
    const allCourse = useFetch({
        method: "get",
        url: GLOBELCONSTANT.COURSE.GET_COURSE,
        errorMsg: 'error occur on get course'
    });
    // get all batches
    const allBatches = useFetch({
        method: "get",
        url: GLOBELCONSTANT.BATCHES.GET_BATCH_LIST,
        errorMsg: 'error occur on get Batches'
     });

 // get all batches
 const  allDepartment= useFetch({
    method: "get",
    url: GLOBELCONSTANT.INSTRUCTOR.GET_INSTRUCTOR,
    errorMsg: 'error occur on get Batches'
 });


  

    useEffect(() => {
        getAllCategory()
        allCourse.response && setCourse(allCourse.response)
        allBatches.response && setBatches(allBatches.response)
        allDepartment.response && setDepartment(allDepartment.response)
    }, [allCourse.response,allBatches.response,allDepartment.response])

    return (<>
    <Router>
         <AdminHome path="/" />
    </Router>
    </>)

}
export default Home