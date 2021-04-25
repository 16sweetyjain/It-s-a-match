import './App.css';
import {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import SignIn from './components/SignIn.js';
import Signup from './components/Signup.js';

export  class App extends Component{
  render(){
  return (
    <div>
      <Route to='/signin' component={SignIn}/>
      <Route to='/signup' component={Signup}/>
      <div>
      Welcome to It-s-a-match.We hope you find the perfect match for your pet.
      Start exploring now.
    </div>
    <Link to='/signin'>login</Link>
    <Link to='/signup'>register</Link>
    </div>
  );
  }

}


export default App;