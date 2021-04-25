import './App.css';
import {Component} from 'react';
import { BrowserRouter as Router, Route, Link,Switch} from "react-router-dom";
import SignIn from './components/SignIn.js';
import Signup from './components/Signup.js';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import CreateProfile from './components/CreateProfile';
import UploadPicture from './components/UploadPicture';


export  class App extends Component{
  render(){
    const notLogged=true;
  return (
    <div>
      <div>
        <Navbar/>
      </div>
    <Switch>
    <Route  path='/signin' component={SignIn}/>
    <Route  path='/signup' component={Signup}/>
    <Route path='/create' component={CreateProfile}/>
    <Route path='/upload' component={UploadPicture}/>
    <Route exact path='/' component={HomePage}/>
    </Switch>
    </div>
  );
  }

}


export default App;