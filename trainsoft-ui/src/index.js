import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/css/index.css';
import App from './App';
import { AppProvider } from './Store/AppContext';
import AxiosService from './Services/axios.service';
import GLOBELCONSTANT from './Constant/GlobleConstant';
import { ReactBootstrapAlert } from "rct-bs-alert";
import * as serviceWorker from './serviceWorker';

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

