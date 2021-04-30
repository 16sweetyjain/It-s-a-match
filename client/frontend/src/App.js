import './App.css';
import { React, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn.js';
import Signup from './components/Signup.js';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import CreateProfile from './components/CreateProfile';
import ShowAllPets from './components/Pets/ShowAllPets';
import ShowMatches from './components/Pets/ShowMatches';
import SendRequest from './components/Notifications/SendRequest';
import MainPage from './components/MainPage';
import NotificationsHomePage from './components/Notifications/NotificationsHomePage';

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
    <Route path = '/sendRequest' component = {SendRequest}/>
    <Route path='/main' component={MainPage}/>
    <Route path= '/notifications' component={NotificationsHomePage}/>
    <Route exact path='/' component={HomePage}/>

    </Switch>
    </div>
  );
}
}