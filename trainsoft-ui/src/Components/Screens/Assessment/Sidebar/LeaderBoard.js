import React, { useContext, useEffect, useState } from 'react';
import LeaderBoardItem from './LeaderBoardItem';
import AppContext from '../../../../Store/AppContext';
import RestService from '../../../../Services/api.service';
import AppUtils from '../../../../Services/Utils';
import { AssessmentContext } from '../AssesementContext';

const LeaderBoard = () => {
    const {
        instruction
      } = useContext(AssessmentContext);
    const { spinner } = useContext(AppContext)
    const [todayLeaders, setTodayLeaders] = useState([]);
    const [allTimeLeaders, setAllTimeLeaders] = useState([]);
    const [viewType, setViewType] = useState("today");

    // get user by virtual account sid
    const getTodayLeaders = async () => {
        try {
        spinner.show("Loading... Please wait...");
        RestService.getTodayLeaders(instruction.sid).then(
            response => {
                spinner.hide();
                setTodayLeaders(response.data);
            },
            err => {
                spinner.hide();
            }
        ).finally(() => {
            spinner.hide();
        });
        } catch (err) {
            spinner.hide();
            console.error("error occur on getTodayLeaders()--", err);
        }
    }

     // get user by virtual account sid
     const getAllTimeLeaders = async () => {
        try {
        spinner.show("Loading... Please wait...");
        RestService.getAllTimeLeaders(instruction?.sid).then(
            response => {
                spinner.hide();
                setAllTimeLeaders(response.data);
            },
            err => {
                spinner.hide();
            }
        ).finally(() => {
            spinner.hide();
        });
        } catch (err) {
            spinner.hide();
            console.error("error occur on getAllTimeLeaders()--", err);
        }
    }

    // initialize component
    useEffect(() => {
        getTodayLeaders();
        getAllTimeLeaders();
      }, [])


    return <div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
        }}
    >
        <div
            style={{
                color: "#49167E",
                font: "normal normal 600 16px/26px Montserrat",
                marginTop: "20px",
            }}
        >
            Leaderboard: Top {viewType === "today" ? todayLeaders.length : allTimeLeaders.length}
        </div>
        <div
            style={{
                width: "150px",
                display: "flex",
                marginTop: "25px",
                justifyContent: "space-between",
            }}
        >
            <div className={viewType === "today" ? "active-l leader-tab" : "leader-tab"}
                onClick={() => setViewType("today")}
            >
                Today
            </div>
            <div className={viewType === "allTime" ? "active-l leader-tab" : "leader-tab"}
                onClick={() => setViewType("allTime")}
            >All Time</div>
        </div>
        <div style={{ width: "100%", marginTop: "20px" }}>
            {
                viewType === "today"
                && todayLeaders.map((_leader, index) => <LeaderBoardItem {..._leader} index={index} />)
            }
            {
                viewType === "allTime"
                && allTimeLeaders.map((_leader, index) => <LeaderBoardItem {..._leader} index={index} />)
            }
        </div>
    </div>;
}

export default LeaderBoard;