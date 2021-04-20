import { useContext,useEffect,useState } from 'react';
import { Button } from "../../../Common/Buttons/Buttons";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { ICN_TRASH, ICN_EDIT, ICN_BATCHES, ICN_ON_GOING, ICN_PROGRESS, ICN_COMPLETED, ICN_PASSED, ICN_EMAIL_W, ICN_TEXT_W } from '../../../Common/Icon';
import TrainingContext from '../../../../Store/TrainingContext';
import moment from 'moment'
import TrainingRoute from '../TrainingRoute';
import CardHeader from '../../../Common/CardHeader';
import RestService from '../../../../Services/api.service';
import AppContext from '../../../../Store/AppContext';
import '../training.css'


const TrainingInfo = ({location}) => {
     const {user, spinner} = useContext(AppContext)
    const {training} =  useContext(TrainingContext)
    const [trainingSession,setTrainingSession] = useState([])
    const activityData = [
        { icon: ICN_ON_GOING, name: 'Batch enrolled', data: '15' },
        { icon: ICN_PROGRESS, name: 'Total Training', data: '10' },
        { icon: ICN_COMPLETED, name: 'Average Attendance', data: '8' },
        { icon: ICN_PASSED, name: 'Labs', data: '7' },
    ]
    const activityCard = [
        { name: "OOAD session", time: 'Mon, 20 Jun 2020 12:03:05', label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.' },
        { name: "Assessment 1", time: 'Mon, 20 Jun 2020 12:03:05', label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.' },
        { name: "OOAD session", time: 'Mon, 20 Jun 2020 12:03:05', label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.' },

    ]


      // get All session
      const getSessionByPage = async (pagination = "1") => {
        try {
            let pageSize = 10;
            spinner.show();
            RestService.getTrainingSession(training.sid, training.courseSid).then(
                response => {
                    setTrainingSession(response.data);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getSession()", err)
        }
    }

    useEffect(() => {
        getSessionByPage()
    }, [])
    return (<>
          <CardHeader {...{
                    location,
                    onChange: (e) => {},
                    onEnter: (e) => {},
                }}>
                </CardHeader>
        <TrainingRoute {...{location}}/>
        <div className="flx full-h">

            <div className="left-details">
                {/* <div className="user-profile-container">
                <div className="jcb">
                    <div className="user-pf">Us</div>
                </div>

                <div className="jcb mt-2">
                    <Button>{ICN_EMAIL_W} <span className="pl-3">Email</span></Button>
                    <Button>{ICN_TEXT_W} <span className="pl-3">Text</span></Button>

                </div>
            </div> */}
                <div className="jcc my-2">
                    <Button>{ICN_PROGRESS} Announcement</Button>
                </div>
                <div className="my-3 mb-4">
                    <div className="row my-2">
                        <div className="col-12 form-lbl1">Training Name</div>
                        <div className="col-12 form-cont1">{training.name}</div>
                    </div>
                    <div className="row my-2">
                        <div className="col-12 form-lbl1">Instructor </div>
                        <div className="col-12 form-cont1">{training.instructor}</div>
                    </div>
                    <div className="row my-2">
                        <div className="col-12 form-lbl1">Start Date</div>
                        <div className="col-12 form-cont1">{moment(training.startDate).format('Do MMMM YYYY')}</div>
                    </div>
                    <div className="row my-2">
                        <div className="col-12 form-lbl1">End Date</div>
                        <div className="col-12 form-cont1">{moment(training.endDate).format('Do MMMM YYYY')}</div>
                    </div>
                    <div className="row my-2">
                        <div className="col-12 form-lbl1">Course</div>
                        <div className="col-12 form-cont1">{training.course}</div>
                    </div>
                </div>
                <div className="jcc mt-2">
                    <div className="training-progress">
                        <CircularProgressbar
                            maxValue="100"
                            minValue="1" value="75"
                            text={`75%`}
                            styles={buildStyles({
                                trailColor: "#F5FBFF",
                                pathColor: "#2D62ED",
                            })} />
                    </div>
                </div>
                <div className="text-center mt-2">
                    <div className="title-md ">Training progress</div>
                    <div className="pointer">Download Report</div>
                </div>
            </div>
            <div className="flx3">
                <div className="flx mb-3">
                   <div  className="user-activity">
                        <div className="flx mb-2">
                            <div className="activities-btn">
                                {ICN_ON_GOING}
                            </div>
                            <div className="jcb-c text-right flx1">
                                <div className="title-lg">{training.noOfBatches}</div>
                            </div>
                        </div>
                        <div className="title-sm">Batch enrolled</div>
                    </div>
                    {/* <div  className="user-activity">
                        <div className="flx mb-2">
                            <div className="activities-btn">
                                {ICN_PASSED}
                            </div>
                            <div className="jcb-c text-right flx1">
                                <div className="title-lg">{10}</div>
                            </div>
                        </div>
                        <div className="title-sm">Total Session</div>
                    </div> */}

                </div>
                <div>
                    {/* ..........Analytic......... */}
                    <div className="">
                        <div className="jcb">
                            <div className="aic title-lg">Activities</div>
                            <div className="aic  title-md f13">
                                <div className="mr-4">Customized view</div>
                                <div className="flx"><div className="aic">
                                    <div>From</div> <div className="checkbox-div"></div>
                                </div><div className="aic ml-4"><div>To</div> <div className="checkbox-div"></div> </div></div>
                            </div>
                        </div>
                        {trainingSession.map(res => <div className="activity-card" key={res.sid}>
                            <div className="cat-title-md">{res.topic}</div>
                            <div className="cat-title-sm">{ moment(res.createdOn).format("DD/MM/YYYY")}</div>
                            <div className="mt-3">{res.agenda}</div>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default TrainingInfo