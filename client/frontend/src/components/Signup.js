
import { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {TextInput, Button} from 'react-materialize';

export default class Signup extends Component {
    render(){
  return (
    <div>
        <div>Register here </div>
        <TextInput id="TextInput-1" label="Type your name"/>
        <TextInput id="TextInput-2" label="Type your email"/>
        <TextInput id="TextInput-3" label="Password" password/>
        <TextInput id="TextInput-4" label=" Confirm Password" password/>
        <Button href="http://localhost:3000/signin" node="a" waves="light">
            Register
        </Button>
      
    </div>

  );
    }
}


