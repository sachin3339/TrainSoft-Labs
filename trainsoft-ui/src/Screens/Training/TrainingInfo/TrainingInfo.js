import '../training.css'
import { Button } from "../../../Components/Buttons/Buttons";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { ICN_TRASH, ICN_EDIT, ICN_BATCHES, ICN_ON_GOING, ICN_PROGRESS, ICN_COMPLETED, ICN_PASSED, ICN_EMAIL_W, ICN_TEXT_W } from "../../../Constant/Icon";

const TrainingInfo = ()=>{
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
    return(<>
       <div className="flx full-h">

<div className="box-shadow flx1 p-2 mr-3">
    {/* <div className="user-profile-container">
    <div className="jcb">
        <div className="user-pf">Us</div>
    </div>

    <div className="jcb mt-2">
        <Button>{ICN_EMAIL_W} <span className="pl-3">Email</span></Button>
        <Button>{ICN_TEXT_W} <span className="pl-3">Text</span></Button>

    </div>
</div> */}
    <div className="jcc my-4">
        <Button>{ICN_PROGRESS} Announcement</Button>
    </div>
    <div className="my-5 title-sm">
        <div className="row my-2">
            <div className="col-6">Training Name</div>
            <div className="col-6">ML_B1_B2_C1</div>
        </div>
        <div className="row my-2">
            <div className="col-6">Created by</div>
            <div className="col-6">Jack A</div>
        </div>
        <div className="row my-2">
            <div className="col-6">Email ID</div>
            <div className="col-6">jack@email.com</div>
        </div>
        <div className="row my-2">
            <div className="col-6">Phone Number</div>
            <div className="col-6">(231) 983 9872</div>
        </div>
        <div className="row my-2">
            <div className="col-6">Start Date</div>
            <div className="col-6">05/08/2020</div>
        </div>
        <div className="row my-2">
            <div className="col-6">End Date</div>
            <div className="col-6">05/09/2020</div>
        </div>
        <div className="row my-2">
            <div className="col-6">Course</div>
            <div className="col-6">c1</div>
        </div>
    </div>
    <div className="jcc mt-4">
        <div className="training-progress">
            <CircularProgressbar
                maxValue="100"
                minValue="1" value="75"
                text={`75%`}
                styles={buildStyles({
                    trailColor: "#F5FBFF",
                    pathColor: "#2D62ED",
                })} />
            <div className="title-md mt-2">Training progress</div>
            <div className="pointer">Download Report</div>
        </div>
    </div>
</div>
<div className="flx3">
    <div className="jcb">
        {activityData.map((p, i) => <div key={i} className="user-activity">
            <div className="activities-btn">
                {p.icon}
            </div>
            <div className="jcb-c text-right">
                <div className="title-lg">{p.data}</div>
                <div className="title-sm">{p.name}</div>
            </div>
        </div>)}

    </div>
    <div>
        {/* ..........Analytic......... */}
        <div className="box-shadow">
            <div className="jcb">
                <div className="aic title-lg">Activities</div>
                <div className="aic  title-md">
                    <div className="mr-4">Customized view</div>
                    <div className="flx"><div className="aic">
                        <div>From</div> <div className="checkbox-div"></div>
                    </div><div className="aic ml-4"><div>To</div> <div className="checkbox-div"></div> </div></div>
                </div>
            </div>
            {activityCard.map(res => <div className="activity-card">
                <div className="title-md text-white">{res.name}</div>
                <div className="text-sm text-white">{res.time}</div>
                <div className="mt-3">{res.label}</div>
            </div>)}

        </div>
    </div>
</div>
</div>
    </>)
}
export default TrainingInfo