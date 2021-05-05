import React from 'react';
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

const LeaderBoardItem = ({ name, index, percent }) => {
    return <div
        style={{
            background: "white",
            display: "flex",
            margin: "5px 10px",
            width: "100%",
            padding: "10px 15px",
            borderRadius: "6px",
            border: "1px solid #DBDBDB",
            justifyContent: "space-between",
            alignItems: "center",
        }}
    >
        <div style={{ display: "flex" }}>
            <div
                style={{
                    marginRight: "10px",
                    color: "#49167E",
                    font: "normal normal 600 12px/26px Montserrat",
                    alignItems: "center",
                }}
            >
                #{index + 1}
            </div>
            <div
                style={{
                    marginRight: "10px",
                    width: "28px",
                    height: "28px",
                    borderRadius: "14px",
                    border: "1px solid #CCC",
                    background: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <PersonOutlineOutlinedIcon style={{ fontSize: "14px" }} />
            </div>
            <div style={{ font: "normal normal normal 12px/26px Montserrat" }}>
                {name}
            </div>
        </div>
        <div style={{ font: "normal normal 600 12px/26px Montserrat" }}>{percent}%</div>
    </div>;
}

export default LeaderBoardItem;