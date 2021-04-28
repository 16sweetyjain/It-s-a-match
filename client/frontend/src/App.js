import './App.css';
import { React, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn.js';
import Signup from './components/Signup.js';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import CreateProfile from './components/CreateProfile';
import ShowAllPets from './components/ShowAllPets';
import ShowMatches from './components/ShowMatches';

export default class App extends Component {
  render() {
      return (
        <div>
      <div>
        <Navbar/>
      </div>
    <Switch>
    <Route  path='/signin' component={SignIn}/>
    <Route  path='/signup' component={Signup}/>
    <Route path='/create' component={CreateProfile}/>
    <Route path='/showAllPets' component={ShowAllPets}/>
    <Route path='/showMatches' component={ShowMatches}/>
    <Route exact path='/' component={HomePage}/>

    </Switch>
    </div>
  );
}
}