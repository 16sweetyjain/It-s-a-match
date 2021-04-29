import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from "react-router-dom";
import App from './App';
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store = {store}>
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
  </Provider>
 ,
  document.getElementById('root')
);


