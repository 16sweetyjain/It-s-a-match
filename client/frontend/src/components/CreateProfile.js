import { React, Component } from "react";
import { BrowserRouter as Router, Route,Link } from "react-router-dom";
import {TextInput, Button, Textarea} from 'react-materialize';
import axios from 'axios';
import { connect } from "react-redux";
import UploadPicture from './UploadPicture';

export default class CreateProfile extends Component {
  constructor(props){
    super(props);
    this.state={
      pet_name:"",
      interests:"",
      dislikes:"",
      short_description:"",
      image_of_pet:null
    }
    this.handleDescriptionChange=this.handleDescriptionChange.bind(this);
    this.handleDislikesChange=this.handleDislikesChange.bind(this);
    this.handleInterestsChange=this.handleInterestsChange.bind(this);
    this.handlePetNameChange=this.handlePetNameChange.bind(this);
    this.handleClick=this.handleClick.bind(this);
    this.imageFileChangedHandler=this.imageFileChangedHandler.bind(this);
    this.imageUploadHandler=this.imageUploadHandler.bind(this);
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
  imageFileChangedHandler=e=>{
    const file = e.target.files[0];
    this.setState({ image_of_pet: URL.createObjectURL(e.target.files[0]) })
  }
  imageUploadHandler=e=>{
    console.log(this.state.image_of_pet);
  }
  handleClick=e=>{
    console.log('email:',this.props.email);

    const pet_profile = {
      email:this.props.email,
      profile:{
        pet_name:this.state.pet_name,
        interests:this.state.interests,
        dislikes:this.state.dislikes,
        short_description:this.state.short_description,
        image_of_pet:this.state.image_of_pet
      }
    }
    console.log('pet_profile:',pet_profile);
    axios.put('http://localhost:8000/api/create',pet_profile)
    .then((response)=>{
        console.log(response);
    },(error)=>{
        console.log(error);
    });
    console.log('profile created');
  }

  render(){

  return (
    <div>
        <div>Create profile of your pet</div>
        <TextInput id="TextInput-7" label="Type name of your pet" value={this.state.pet_name} onChange={e=>this.handlePetNameChange(e)}/>
        <TextInput id="TextInput-8" label="Interests"value={this.state.interests} onChange={e=>this.handleInterestsChange(e)}/>
        <TextInput id="TextInput-9" label="Dislikes" value={this.state.dislikes} onChange={e=>this.handleDislikesChange(e)}/>
        <Textarea id="Textarea-12" l={12} m={2} s={3} xl={12} placeholder="write a short intro of your pet" value={this.state.short_description} onChange={e=>this.handleDescriptionChange(e)}/>
        <div>
         <input type="file" left="200" onChange={this.imageFileChangedHandler}/>
        <button onClick={this.imageUploadHandler} left="200">Upload!</button>
        <img alt="" src={this.state.image_of_pet} width="400" left="1000"/>
        </div>
        <Link to='/showAllPets'>
          <button    onClick = {(e)=>this.handleClick(e)}>
            Create Profile
          </button>
        </Link>
    </div>

  );
    }
}





