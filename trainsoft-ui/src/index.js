import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/css/index.css';
import App from './App';
import { AppProvider } from './Store/AppContext';
import { ReactBootstrapAlert } from "rct-bs-alert";
import * as serviceWorker from './serviceWorker';
import { HelmetProvider } from 'react-helmet-async';



ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
    <ReactBootstrapAlert>
          <AppProvider>
                <App />
        </AppProvider>
    </ReactBootstrapAlert>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

