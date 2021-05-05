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
import axios from 'axios';
import Signout from './components/Signout';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      users:[]
    }
  }
  componentDidMount(){
    axios.get('api/getAllUsers')
    .then((response)=>{
        this.setState({users:response.data.result});
    },(error)=>{
        console.log(error);
    });  
}
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
    <Route path='/showAllPets' component={() => <ShowAllPets users = {this.state.users}/>}/>
    <Route path='/main' component={() => <MainPage users={this.state.users}/>}/>
    <Route path = '/viewProfile' component = {ViewProfile}/>
    <Route path = '/viewRequests' component={() => <ViewRequests users = {this.state.users}/>  }/>
    <Route path='/viewFriends' component={() => <ViewFriends users = {this.state.users}/>}/>
    <Route path = '/signout' component={Signout}/>
    <Route exact path='/' component={HomePage}/>
    </Switch>
    </div>
  );
}
}