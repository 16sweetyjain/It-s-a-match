import './App.css';
import { React, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn.js';
import Signup from './components/Signup.js';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import CreateProfile from './components/CreateProfile';
import ShowAllPets from './components/Pets/ShowAllPets';
import MainPage from './components/MainPage';
import ViewProfile from './components/ViewProfile';
import ViewRequests from './components/ViewRequests';
import ViewFriends from './components/ViewFriends';
import Signout from './components/Signout';

export default class App extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
      return (
        <div>
      <div>
        <Navbar/>
      </div>
    <Switch>
    <Route  path='/signin' component={() => <SignIn />}/>
    <Route  path='/signup' component={() => <Signup />}/>
    <Route path='/create' component={CreateProfile}/>
    <Route path='/showAllPets' component={() => <ShowAllPets />}/>
    <Route path='/main' component={() => <MainPage  />}/>
    <Route path = '/viewProfile' component = {ViewProfile}/>
    <Route path = '/viewRequests' component={() => <ViewRequests />  }/>
    <Route path='/viewFriends' component={() => <ViewFriends />}/>
    <Route path = '/signout' component={() => <Signout /> }/>
    <Route exact path='/' component={HomePage}/>
    </Switch>
    </div>
  );
}
}