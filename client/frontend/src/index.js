import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from "react-router-dom";
import App from './App';
import { Provider } from "react-redux";
import configureStore from "./store";


ReactDOM.render(

  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
 ,
  document.getElementById('root')
);


