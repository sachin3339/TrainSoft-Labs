import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/css/index.css';
import App from './App';
import { AppProvider } from './Store/AppContext';
import AxiosService from './Services/axios.service';
import GLOBELCONSTANT from './Constant/GlobleConstant';
AxiosService.init(GLOBELCONSTANT.BASE_URL);

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
        <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

