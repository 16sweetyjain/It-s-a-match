import './App.css';
import { React, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn.js';
import Signup from './components/Signup.js';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import CreateProfile from './components/pet/CreateProfile';
import ShowAllPets from './components/pet/ShowAllPets';
import MainPage from './components/pet/MainPage';
import ViewProfile from './components/pet/ViewProfile';
import ViewRequests from './components/pet/ViewRequests';
import ViewFriends from './components/pet/ViewFriends';
import Signout from './components/Signout';
import ProtectedRoute from './components/ProtectedRoute';

export default class App extends Component {
    constructor(props){
        super(props);
    }
  
    render() {
        return (
            <div>
                <Navbar/>
                <Switch>
                    <Route  path='/signin' component={() => <SignIn />}/>
                    <Route  path='/signup' component={() => <Signup />}/>
                    <ProtectedRoute path='/create' component={() => <CreateProfile/>}/>
                    <ProtectedRoute path='/showAllPets' component={() => <ShowAllPets />}/>
                    <ProtectedRoute path='/main' component={() => <MainPage  />}/>
                    <ProtectedRoute path = '/viewProfile' component = {() => <ViewProfile/>}/>
                    <ProtectedRoute path = '/viewRequests' component={() => <ViewRequests />  }/>
                    <ProtectedRoute path='/viewFriends' component={() => <ViewFriends />}/>
                    <ProtectedRoute path = '/signout' component={() => <Signout /> }/>
                    <Route exact path='/' component={HomePage}/>
                </Switch>
            </div>
        );
    }
}