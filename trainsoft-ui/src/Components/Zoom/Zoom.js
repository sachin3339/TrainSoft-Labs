// import "./Zoom.css";
import { ZoomMtg } from "@zoomus/websdk";
import { useEffect } from "react";
import './zoom.css'

const crypto = require("crypto"); // crypto comes with Node.js

// https://www.npmjs.com/package/jsrsasign


function generateSignature(apiKey, apiSecret, meetingNumber, role) {

  // Prevent time sync issue between client signature generation and zoom 
  const timestamp = new Date().getTime() - 30000
  const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
  const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
  const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')

  return signature
}

 // call the generateInstantToken function

var apiKey = "tGcuTNjdQUS3jkTw_eaz9g";
var apiSecret = "yaoH9H4cBmh1wgxXTkGqmGR8a65Qrwpu3sju";
var meetingNumber = 9329001255;
var leaveUrl = "http://localhost:3000"; // our redirect url
var userName = "vikash";
var userEmail = "vikash@akalmatechnolies.com";
var passWord = "kkd";



const Zoom = () => {
  // loading zoom libraries before joining on component did mount
  useEffect(() => {
    showZoomDIv();
    ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.0/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    initiateMeeting();
    return ()=> document.getElementById("zmmtg-root").style.display = "none";
  }, []);

  const showZoomDIv = () => {
    document.getElementById("zmmtg-root").style.display = "block";
  };

  const initiateMeeting = () => {
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: generateSignature(
             apiKey,
             apiSecret,
             meetingNumber,
            '0'
          ),
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  return <div className="App">Zoom</div>;
};

export default Zoom;