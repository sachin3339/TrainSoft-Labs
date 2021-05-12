import { ICN_PARTICIPANT, ICN_USERS } from '../../../Common/Icon';
import SCORE_ICON from '../images/score.png'
import '../assessment.css'

const data = [
    {name: "Rohan Kumar",mark:"70"},
    {name: "Pankaj Singh",mark:"60"},
    {name: "Rohit Kumar",mark:"78"},
    {name: "Ranjan Rohan",mark:"55"},
    {name: "Vikash Kumar",mark:"99"},
    {name: "Ranjeet Kumar",mark:"89"},
]

const AssessmentDashboard = () =>{

    return(<>
        <div className="row">
            <div className="col-sm-8">
                <div className="box-shadow">
                    <div className="title-lg">Welcome Back John!</div>
                    <div className="jcb mt-4 px-2">
                        <div className="column text-center">
                            <div className="title-lg ass">15</div>
                            <div>Assessments Taken</div>
                        </div>
                        <div className="column text-center">
                            <div className="title-lg Ongoing">10</div>
                            <div>Ongoing</div>
                        </div>
                        <div className="column text-center">
                            <div className="title-lg comp">5</div>
                            <div>Completed</div>
                        </div>
                        <div className="column text-center">
                            <div className="title-lg quit">1</div>
                            <div>Quit</div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="col-sm-4">
            <div className="box-shadow mark-color">
                    <div className="title-sm"> Your Score </div>
                    <div className="title-lg">94%</div>
                    <div className="img-score">
                        <img src={SCORE_ICON}/>
                    </div>

            </div>
            </div>
        </div>
        <div className="row mt-4">
            <div className="col-sm-8">
            <div className="box-shadow">
                <div className="title-sm text-center my-3">Avg. Score by Category</div>
                <div className="category-info-list">
                    <div className="category-info">
                        <div className="catTitle"> 98% </div>
                        <div className=""> Technological </div>
                    </div>
                    <div className="category-info">
                        <div className="catTitle"> 97% </div>
                        <div className=""> Psychometric </div>
                    </div>
                    <div className="category-info">
                        <div className="catTitle"> 89% </div>
                        <div className=""> Skills </div>
                    </div>
                    <div className="category-info">
                        <div className="catTitle"> 95% </div>
                        <div className=""> Personality Index </div>
                    </div>
                    <div className="category-info">
                        <div className="catTitle"> 95% </div>
                        <div className=""> Aptitude </div>
                    </div>
                    <div className="category-info">
                        <div className="catTitle"> 91% </div>
                        <div className=""> Domain </div>
                    </div>
                    
                </div>
            </div>
            </div>
            <div className="col-sm-4">
            <div className="box-shadow">
                <div>Leaderboard (Top 10)</div>
                <div className="title-md">All Categories</div>
                {data.map((res,i)=> <div className="user-score">
                       <div className="aic">
                            <div className="ass">#{i+1}</div>
                            <div className="user-icon mx-2 ">{ICN_USERS}</div>
                            <div>{res.name}</div> 
                        </div>

                         <div className="title-sm">
                            {res.mark}
                        </div>
                </div>)}
                
            </div>
            </div>
        </div>
    </>)

}
export default AssessmentDashboard;