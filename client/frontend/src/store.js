import { createStore } from "redux";
import setUserEmailReducer from './reducers/setUserEmail';

function configureStore() {
  //const initialState={};
  const initialState={
    email:null
  }
  return createStore(setUserEmailReducer,initialState);
}

export default configureStore;