import React, { useState,useContext } from 'react'
import { BtnPrimary, TabBtn } from "../../Common/Buttons/Buttons";
import SearchBox from "../../Common/SearchBox/SearchBox"
import { ICN_TRASH, ICN_EDIT, ICN_BOOK, ICN_LIBRARY, ICN_PROGRESS, ICN_STORE } from "../../Common/Icon";
import { navigate, Router, Link } from "../../Common/Router";
import CardHeader from '../../Common/CardHeader'
import { TextInput, SelectInput } from '../../Common/InputField/InputField'
import ReportChart from '../../Charts/ReportChart';
import ReportDownload from './ReportDownload';
import AppContext from '../../../Store/AppContext';
import './report.css'

const Report = ({ location }) => {
    const {user} = useContext(AppContext)
    return (
        <div className="table-shadow p-3">
            <CardHeader {...{ location }} />
            <div className="flx tab-btn-group mb-3">
                <TabBtn active={location.state.subPath === "batch"} onClick={() => navigate("/report", { state: { title: 'Report', subTitle: "Batch", subPath: "batch" } })}>Batch</TabBtn>
                <TabBtn active={location.state.subPath === "course"} onClick={() => navigate("/report/course", { state: { title: 'Report', subTitle: "Course", subPath: "course" } })}>Course</TabBtn>
               {user.role !== "user" &&  <TabBtn active={location.state.subPath === "participants"} onClick={() => navigate("/report/participants", { state: { title: 'Report', subTitle: "Participants", subPath: "participants" } })}>Participants</TabBtn>}
               {user.role !== "user" &&  <TabBtn active={location.state.subPath === "download"} onClick={() => navigate("/report/download", { state: { title: 'Report', subTitle: "Download", subPath: "download" } })}>Download</TabBtn>}

            </div>
            <Router>
                <Batch path="/" />
                <Course path="course" />
                <Participants path="participants" />
                <ReportDownload path="download" />
            </Router>
        </div>)
}
export default Report

const Batch = ({ label = "Progress Overview" }) => {
    return (<>
        <div className="report-container">
            <div className="chart-report">
                <div className="mb-3">{label}</div>
                <ReportChart ChartType="report" labelLeft="Employee percentile" />
            </div>
            <div className="report-action">
                <div className="action-list action-list-top ">
                    <div className="aic">{ICN_BOOK}</div>
                    <div className="text-center">
                        <div className="title-lg">ITU_1</div>
                        <div>Explore More</div>
                    </div>
                </div>
                <div className="action-list">
                    <div className="text-center">
                        <div>Progress</div>
                        <div>{ICN_PROGRESS}</div>
                    </div>
                    <div>
                        <div className="title-lg">60%</div>
                    </div>
                </div>
                <div className="action-list">
                    <div className="text-center">
                        <div>Score</div>
                        <div>{ICN_STORE}</div>
                    </div>
                    <div className="text-center">
                        <div className="title-lg">65%</div>
                    </div>
                </div>
                <div className="action-list">
                    <div className="text-center">
                        <div >Lab</div>
                        <div>{ICN_LIBRARY}</div>
                    </div>
                    <div>
                        <div className="title-lg">60%</div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

const Course = () => {
    return (<>
        <Batch label="Technology Overview" />
    </>)
}

const Participants = () => {
    return (<>
        <Batch label="Participants Overview" />
    </>)
}

