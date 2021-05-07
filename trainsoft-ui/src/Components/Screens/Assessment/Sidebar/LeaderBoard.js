import React from 'react';
import LeaderBoardItem from './LeaderBoardItem';

const LeaderBoard = () => {
    const leaders = [
        { percent: 99, name: "Karen" },
        { percent: 98, name: "John" },
        { percent: 98, name: "Arthur" },
    ];
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
            LeaderBoard: {leaders.length}
        </div>
        <div
            style={{
                width: "150px",
                display: "flex",
                marginTop: "25px",
                justifyContent: "space-between",
            }}
        >
            <div
                style={{
                    font: " normal normal 600 13px/26px Montserrat",
                    color: "#111111",
                    borderBottom: "3px solid #FECD48",
                    cursor: "pointer",
                }}
            >
                Today
            </div>
            <div className="pointer">All Time</div>
        </div>
        <div style={{ width: "100%", marginTop: "20px" }}>
            {
                leaders.map((_leader, index) => <LeaderBoardItem {..._leader} index={index} />)
            }
        </div>
    </div>;
}

export default LeaderBoard;