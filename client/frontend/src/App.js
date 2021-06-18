import './App.css';
import { React } from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn.js';
import Signup from './components/Signup.js';
import HomePage from './components/HomePage';
import CreateProfile from './components/pet/CreateProfile';
import ShowAllPets from './components/pet/ShowAllPets';
import MainPage from './components/pet/MainPage';
import ViewProfile from './components/pet/ViewProfile';
import ViewFriendRequests from './components/pet/ViewFriendRequests';
import ViewFriends from './components/pet/ViewFriends';
import Signout from './components/Signout';
import ProtectedRoute from './components/ProtectedRoute';
import ArrangeMeet from './components/pet/ArrangeMeet';
import ViewMeetRequests from './components/pet/ViewMeetRequests';
import UpcomingMeets from './components/pet/UpcomingMeets';

export default function App () {
   
    return (
        <div className='green lighten-4'>
            <Switch>
                <Route  path='/signin' component={() => <SignIn />}/>
                <Route  path='/signup' component={() => <Signup />}/>
                <ProtectedRoute path='/create' component={() => <CreateProfile/>}/>
                <ProtectedRoute path='/showAllPets' component={() => <ShowAllPets />}/>
                <ProtectedRoute path='/main' component={() => <MainPage  />}/>
                <ProtectedRoute path = '/viewProfile' component = {() => <ViewProfile/>}/>
                <ProtectedRoute path = '/viewRequests' component={() => <ViewFriendRequests />  }/>
                <ProtectedRoute path='/viewFriends' component={() => <ViewFriends />}/>
                <ProtectedRoute path = '/signout' component={() => <Signout /> }/>
                <ProtectedRoute path = '/arrangeMeet' component ={() => <ArrangeMeet/> }/>
                <ProtectedRoute path = '/viewMeetRequests' component ={() => <ViewMeetRequests/> }/>
                <ProtectedRoute path = '/viewMeets' component ={() => <UpcomingMeets/> }/>
                <Route exact path='/' component={HomePage}/>
            </Switch>
        </div>
    );
}