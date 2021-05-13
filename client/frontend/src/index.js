import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import 'materialize-css/dist/css/materialize.min.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/';
ReactDOM.render(
    <Provider store = { store }>
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </Provider>
 ,
  document.getElementById('root')
);
