import { React, Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {TextInput, Button, TextArea} from 'react-materialize';
import axios from 'axios';

export default class CreateProfile extends Component {
  constructor(props){
    super(props);
    this.state={
      pet_name:"",
      interests:"",
      dislikes:"",
      short_description:"",
      email:"16jainsweety@gmail.com"
    }
    this.handleDescriptionChange=this.handleDescriptionChange.bind(this);
    this.handleDislikesChange=this.handleDislikesChange.bind(this);
    this.handleInterestsChange=this.handleInterestsChange.bind(this);
    this.handlePetNameChange=this.handlePetNameChange.bind(this);
    this.handleClick=this.handleClick.bind(this);
  }

  handleDescriptionChange=e=>{
    this.setState({short_description:e.target.value});
  }
  handleDislikesChange=e=>{
    this.setState({dislikes:e.target.value});
  }
  handleInterestsChange=e=>{
    this.setState({interests:e.target.value});
  }
  handlePetNameChange=e=>{
    this.setState({pet_name:e.target.value});
  }
  handleClick=e=>{
    const pet = {
      pet_name:this.state.pet_name,
      interests:this.state.interests,
      dislikes:this.state.dislikes,
      short_description:this.state.short_description
    };
    const pet_profile = {
      email:email,
      profile:pet_profile
    }
    axios.post('http://localhost:8000/api/create',pet_profile)
    .then((response)=>{
        console.log(response);
    },(error)=>{
        console.log(error);
    });
  }

  render(){
  return (
    <div>
        <div>Create profile of your pet</div>
        <TextInput id="TextInput-7" label="Type name of your pet" value={this.state.pet_name} onChange={e=>this.handlePetNameChange(e)}/>
        <TextInput id="TextInput-8" label="Interests"value={this.state.interests} onChange={e=>this.handleInterestsChange(e)}/>
        <TextInput id="TextInput-9" label="Dislikes" value={this.state.dislikes} onChange={e=>this.handleDislikesChange(e)}/>
        <Textarea id="Textarea-12" l={12} m={2} s={3} xl={12} placeholder="write a short intro of your pet" value={this.state.short_description} onChange={e=>this.handleDescriptionChange(e)}/>
        <Button href="http://localhost:3000/upload" node="a" waves="light" onClick={e=>this.handleClick(e)}>
            Create Profile
        </Button> 
    </div>

  );
    }
}


