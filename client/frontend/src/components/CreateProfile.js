
import { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {TextInput, Button} from 'react-materialize';

export default class CreateProfile extends Component {
    render(){
  return (
    <div>
        <div>Create profile of your pet</div>
        <TextInput id="TextInput-7" label="Type name of your pet"/>
        <TextInput id="TextInput-8" label="Hobbies"/>
        <TextInput id="TextInput-9" label="Dislikes"/>
        <TextInput id="TextInput-10" label="Likes( e.g. favourite food)"/>
        <Button href="http://localhost:3000/upload" node="a" waves="light">
            Create Profile
        </Button>
      
    </div>

  );
    }
}


