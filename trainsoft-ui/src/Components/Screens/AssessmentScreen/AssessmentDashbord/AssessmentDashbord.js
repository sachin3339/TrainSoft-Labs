import React, { useState, useContext, useEffect } from 'react'
import { ICN_ARROW_DOWN, ICN_PARTICIPANT, ICN_USERS } from '../../../Common/Icon';
import SCORE_ICON from '../images/score.png'
import RestService from '../../../../Services/api.service';
import AssessmentContext from '../../../../Store/AssessmentContext';
import { CustomToggle } from '../../../../Services/MethodFactory';
import { Dropdown } from 'react-bootstrap';
import AppContext from '../../../../Store/AppContext';
import NoDataFound from '../../../Common/NoDataFound/NoDataFound';
import '../assessment.css'


const AssessmentDashboard = () => {
    const { category,setBookmark } = useContext(AssessmentContext)
    const { spinner, user } = useContext(AppContext)
    const [avgCategory, setAvgCategory] = useState()
    const [selectedCategory, setSelectedCategory] = useState('All Category')
    const [categoryUser, setCategoryUser] = useState([])
    const [dashboardInfo, setDashboardInfo] = useState()

    // search assessment 
    const getDashboardInfo = async (value) => {
        spinner.show("Loading... wait");
        try {
            let { data } = await RestService.getDashboardData(user.sid)
            setDashboardInfo(data);
            spinner.hide();
        } catch (err) {
            spinner.hide();
            console.error("error occur on getDashboardInfo()", err)
        }
    }

    // get avg. category 
    const getAvgCategory = async (value) => {
        spinner.show("Loading... wait");
        try {
            let { data } = await RestService.getAvgCategory(user.sid)
            setAvgCategory(data);
            spinner.hide();
        } catch (err) {
            spinner.hide();
            console.error("error occur on getAvgCategory()", err)
        }
    }

    // get avg. category 
    const getTopUsers = async (categorySid) => {
        spinner.show("Loading... wait");
        try {
            let { data } = await RestService.getTopUser(user.companySid, categorySid)
            setCategoryUser(data);
            spinner.hide();
        } catch (err) {
            spinner.hide();
            console.error("error occur on getAvgCategory()", err)
        }
    }

    // get category score by sid
    const getCategoryValue =(sid)=>{
        let val =""
        try{
            let values =  avgCategory.find(res=> res?.categoryTO.sid === sid)
           val = values ? `${values.averageScore?.toFixed(0)}%` : "-"

        }catch(err){
            console.error("error occur on getCategoryValue()",err)
        }
        return val 
    }
    //  getBookmark 
    const getBookmark = async () => {
        spinner.show("Loading... wait");
        try {
            let { data } = await RestService.getBookmark(user.sid)
            setBookmark(data);
            spinner.hide();
        } catch (err) {
            spinner.hide();
            console.error("error occur on getBookmark()", err)
        }
    }

    useEffect(() => {
        getAvgCategory()
        getDashboardInfo()
        getTopUsers("ALL")
        getBookmark()
    }, [])

    return (<>
        <div className="row">
            <div className="col-sm-8">
                <div className="box-shadow">
                    <div className="title-lg text-capitalize">Welcome Back {user?.appuser?.name}</div>
                    <div className="jcb mt-4 px-2">
                        <div className="column text-center">
                            <div className="title-lg ass">{dashboardInfo?.assessmentTaken}</div>
                            <div>Assessments Taken</div>
                        </div>
                        <div className="column text-center">
                            <div className="title-lg Ongoing">{dashboardInfo?.onGoing}</div>
                            <div>Ongoing</div>
                        </div>
                        <div className="column text-center">
                            <div className="title-lg comp">{dashboardInfo?.completed}</div>
                            <div>Completed</div>
                        </div>
                        <div className="column text-center">
                            <div className="title-lg quit">{dashboardInfo?.quit}</div>
                            <div>Quit</div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="box-shadow mark-color">
                    <div className="title-sm"> Your Score </div>
                    <div className="title-lg">{dashboardInfo?.yourScore ?? 0}%</div>
                    <div className="img-score">
                        <img src={SCORE_ICON} />
                    </div>
                </div>
            </div>
        </div>
        <div className="row mt-4">
            <div className="col-sm-8">
                <div className="box-shadow">
                    <div className="title-sm text-center my-3">Avg. Score by Category</div>
                    <div className="category-info-list">
                        {category.map(res =>
                            <div className="category-info" key={res.sid}>
                                <div className="catTitle"> {getCategoryValue(res.sid)} </div>
                                <div className=""> {res.name} </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="box-shadow">
                    <div>Leaderboard (Top 10)</div>
                    <Dropdown>
                        <Dropdown.Toggle as={CustomToggle}>
                            <div className="title-md">{selectedCategory} {ICN_ARROW_DOWN}</div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { getTopUsers('ALL');setSelectedCategory("All Category") }}>All Category</Dropdown.Item>
                            {category.map((res) => <Dropdown.Item onClick={() => { getTopUsers(res.sid);setSelectedCategory(res.name) }}>{res.name}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    {categoryUser.map((res, i) => <div className="user-score">
                        <div className="aic">
                            <div className="ass">#{i + 1}</div>
                            <div className="user-icon mx-2 ">{ICN_USERS}</div>
                            <div>{res.virtualAccountTO?.appuser?.name}</div>
                        </div>
                        <div className="title-sm">
                            {res.percentage}%
                        </div>
                    </div>)}
                    {categoryUser.length === 0 && <NoDataFound title="Data not found" />}

                </div>
            </div>
        </div>
    </>)

}
export default AssessmentDashboard;