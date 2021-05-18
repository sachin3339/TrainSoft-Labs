import React from 'react';
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import { IcnUser } from '../../../Common/Icon';

const LeaderBoardItem = ({ virtualAccountTO, index, percentage }) => {
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
                <IcnUser style={{ fontSize: "14px" }} />
            </div>
            <div style={{ font: "normal normal normal 12px/26px Montserrat" }}>
                {virtualAccountTO.appuser?.name}
            </div>
        </div>
        <div style={{ font: "normal normal 600 12px/26px Montserrat" }}>{percentage ? percentage : 0}%</div>
    </div>;
}

export default LeaderBoardItem;