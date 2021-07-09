import { combineReducers, applyMiddleware, createStore } from 'redux';
import  { setUserEmail }  from '../reducers/setUserEmail.js';
import logger from 'redux-logger';
const rootReducer = combineReducers({
    userEmail: setUserEmail
});
const middleware = [logger];
const store =  createStore(rootReducer, applyMiddleware(...middleware));

export default store;