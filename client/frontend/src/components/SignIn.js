import { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {TextInput, Button} from 'react-materialize';

export default class SignIn extends Component {
    render(){
  return (
    <div>
        <div>Login</div>
        <TextInput id="TextInput-5" label="Type your email"/>
        <TextInput id="TextInput-6" label="Password" password/>
        <Button href="http://localhost:3000/create" node="a" waves="light">
            Login
        </Button>
      
    </div>

  );
    }
}


