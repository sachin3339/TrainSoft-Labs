import React, { useContext ,useEffect} from 'react'
import Charts from '../../Charts/Charts'
import {  Card} from '../../Common/BsUtils';
import "react-circular-progressbar/dist/styles.css";
import CalenderGraph from '../../Common/CalenderGraph/CalenderGraph';
import AppContext from '../../../Store/AppContext';
import './home.css'
import RestService from '../../../Services/api.service';
import AssessmentContext from '../../../Store/AssessmentContext';

const UserHome = () => {
    const {user,spinner} = useContext(AppContext)
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
  useEffect(() => {
     getAllCategory()
  }, [])
    
    return (<div>
        <div className="row">
            <div className="col-md-6">
                {/* ..........user info......... */}
                <Card title="">
                    <div className="user-info">
                        <div className="title-lg">Welcome back {user.name}!</div>
                        <div>
                               <div>
                                <div className="jcb"> <div className="aic"> <div className="red-circle"></div> Quiz - AWS</div> <div>3 Jul 2020</div></div>
                                <div className="jcb"> <div className="aic"> <div className="red-circle"></div>Course - Python fundamentals </div> <div>5 Jul 2020</div></div>
                                <div className="jcb"> <div className="aic"><div className="red-circle"></div> Final assessment - AWS </div><div>6 Jul 2020</div></div>


                            </div>
                        </div>
                    </div>
                </Card>
                {/* ..........End user info......... */}
                   {/* ..........Technology Activity......... */}
                   <Card title="Course Progress" action={true} className="mt-2">
                            <Charts ChartType="course" labelLeft="Progress" />
                        </Card>
                        {/* ..........End Technology Activity......... */}

            </div>
            <div className="col-md-6 ">
                {/* ..........Lms insight......... */}
                <Card title="Feed" action={true}>
                    <div className="feed-list">
                        <div className="title-md tw">New course update</div>
                        <div className="f12 op5">Mon, 20 Jun 2020 12:03:05</div>
                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                             Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</div>
                    </div>
                </Card>
                {/* ..........End Lms insight......... */}
                 {/* ..........Calender......... */}
                 <Card title="Calender" className=" mt-2">
                        <CalenderGraph/>
                    </Card>
                    {/* ..........End Calender......... */}
            </div>
        </div>
    </div>)
}

export default UserHome