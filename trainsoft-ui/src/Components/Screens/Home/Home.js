import React, { useContext } from 'react'
import Charts from '../../Charts/Charts'
import Table from 'react-bootstrap/Table'
import { ICN_COPY, ICN_COMING_BATCHES } from '../../Common/Icon';
import { Progress, Card} from '../../Common/BsUtils';
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CalenderGraph from '../../Common/CalenderGraph/CalenderGraph';
import AppContext from '../../../Store/AppContext';
import './home.css'
import UserHome from './UserHome';

const tableData = [
    { name: "ITU_01", avgScr: 50 },
    { name: "ITU_02", avgScr: 70 },
    { name: "ITU_03", avgScr: 100 },
    { name: "ITU_05", avgScr: 60 },
    { name: "ITU_01", avgScr: 50 },
    { name: "ITU_02", avgScr: 70 },
    { name: "ITU_03", avgScr: 100 },
    { name: "ITU_05", avgScr: 60 },
    { name: "ITU_01", avgScr: 90 }

]

const AdminHome = () => {
    const {user} = useContext(AppContext)
    
    return (<div>
        <div className="row">
            <div className="col-md-8">
                {/* ..........user info......... */}
                <Card title="">
                    <div className="user-info">
                        <div className="title-lg">Welcome back {user.name}!</div>
                        <div>
                            Since your last login on the system, there were:
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
                <Card title={`${user.role === 'admin' ? 'Lms insight' : 'Attendance Rate'} `} action={true}>
                    <div className="">
                        <div className="lms-card"><div className="lms-card-g">AWS Solution Architect</div><div>45 Enrolled <span>a</span></div></div>
                        <div className="lms-card"><div className="lms-card-p">Machine Learning</div><div>40 Enrolled</div> <span>a</span></div>
                        <div className="lms-card"><div className="lms-card-g">Splunk</div><div>40 Enrolled</div> <span>a</span></div>
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
                                <Table className="table-borderless ">
                                    <thead>
                                        <tr>
                                            <td>Name</td>
                                            <td className="progress-w">Progress</td>
                                            <td className="avgScore-w">Avg score</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((res, i) =>
                                            <tr>
                                                <td>{res.name}</td>
                                                <td><Progress className="mb-2" className="progress-sh" variant={i % 2 === 0 ? 'secondary' : 'danger'} value={res.avgScr} /></td>
                                                <td className="text-right">{res.avgScr}</td>
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
                <div className="jcb pb-2">
                    <div className="grid-batch">
                        <div>{ICN_COPY}</div>
                        <div>
                            <div className="title-lg mb-0 text-white">28</div>
                                         On-going batches
                                    </div>
                        <div className="jce">
                            <div className="grid-batch-icon">
                            <i className="bi bi-arrows-angle-expand"></i>
                                        </div>
                        </div>
                    </div>

                    <div className="grid-batch bg-purple">
                        <div>{ICN_COMING_BATCHES}</div>
                        <div>
                            <div className="title-lg mb-0 text-white">28</div>
                                         On-going batches
                                    </div>
                        <div className="jce">
                            <div className="grid-batch-icon">
                            <i className="bi bi-arrows-angle-expand"></i>
                                        </div>
                        </div>
                    </div>

                </div>

                
                    {/* ..........Calender......... */}
                    <Card title="Calender" className="full-h">
                        <CalenderGraph/>
                    </Card>
                    {/* ..........End Calender......... */}
            </div>
        </div>
    </div>)
}

const Home = ()=> {
    const {user} = useContext(AppContext)
    return(<>
        <AdminHome/>
    </>)

}
export default Home