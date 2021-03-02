import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/css/index.css';
import App from './App';
import { AppProvider } from './Store/AppContext';
import AxiosService from './Services/axios.service';
import GLOBELCONSTANT from './Constant/GlobleConstant';
import { ReactBootstrapAlert } from "rct-bs-alert";
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

