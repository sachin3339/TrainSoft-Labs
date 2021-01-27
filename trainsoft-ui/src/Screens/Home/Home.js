import  Card  from '../../Components/Card/Card'
import Charts from '../../Components/Charts/Charts'
import './home.css'
import { ICN_COPY, ICN_COMING_BATCHES } from '../../Constant/Icon';

const Home = () => {
    return (<div>
            <div className="row">
                <div className="col-md-8">
                    {/* ..........user info......... */}
                    <Card title="">
                            <div className="user-info">
                               <div className="title-lg">Welcome back Julie!</div>
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
                        <Card title="Lms insight" action={true}>
                              <div className="">
                                    <div className="lms-card"><div className="lms-card-g">AWS Solution Architect</div><div>45 Enrolled <span>a</span></div></div>
                                    <div className="lms-card"><div className="lms-card-p">Machine Learning</div><div>40 Enrolled</div> <span>a</span></div>
                                    <div className="lms-card"><div className="lms-card-g">Splunk</div><div>40 Enrolled</div> <span>a</span></div>
                              </div>
                        </Card>
                    {/* ..........End Lms insight......... */}     
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-6">
                        {/* ..........Technology Activity......... */}
                        <Card title="Technology Activity" action={true}>
                           <Charts ChartType="activities"  labelLeft="Employee percentile"/>
                        </Card>
                    {/* ..........End Technology Activity......... */}  

                          {/* ..........Analytic......... */}
                        <Card title="Analytic" action={true}>
                              
                        </Card>
                    {/* ..........End Analytic......... */}    
                        </div>

                        <div className="col-md-6">
                              {/* ..........Batches......... */}
                        <Card title="Batches" action={true}>
                               
                         </Card>
                          {/* ..........End Batches......... */}   
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                        <div className="jcb pb-2">
                            <div className="grid-batch">
                                    <div>{ICN_COPY}</div>
                                    <div>
                                        <div className="title-lg mb-0 text-white">28</div>
                                         On-going batches
                                    </div>
                                    <div className="jce">
                                        <div className="grid-batch-icon">
                                                g
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
                                                g
                                        </div>
                                    </div>
                            </div>

                        </div>

                        <div>
                             {/* ..........Calender......... */}
                             <Card title="Calender">
                    
                              </Card>
                          {/* ..........End Calender......... */}  
                        </div>
                </div>
            </div>
    </div>)
}

export default Home