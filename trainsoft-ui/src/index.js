import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/css/index.css';
import App from './App';
import { AppProvider } from './Store/AppContext';
import AxiosService from './Services/axios.service';
import GLOBELCONSTANT from './Constant/GlobleConstant';
import { ReactBootstrapAlert } from "rct-bs-alert";
import * as serviceWorker from './serviceWorker';
// import { ZoomMtg } from "@zoomus/websdk";
// For Local module default:
// ZoomMtg.setZoomJSLib('node_modules/@zoomus/websdk/dist/lib', '/av');
// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareJssdk();
// const zoomMeeting = document.getElementById("zmmtg-root")
// ZoomMtg.init()

AxiosService.init(GLOBELCONSTANT.BASE_URL);

ReactDOM.render(
  <React.StrictMode>
    <ReactBootstrapAlert>
          <AppProvider>
        <App />
    </AppProvider>
    </ReactBootstrapAlert>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

