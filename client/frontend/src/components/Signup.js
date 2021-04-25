import { React,Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {TextInput, Button} from 'react-materialize';
import axios from 'axios';

export default class Signup extends Component {
    constructor(props){
        super(props);
        this.state={
            email:"kihar99@gmail.com",
            password:"123456",
            password_confirmation:"123456",
            name:"kush jain"
        }
        this.onChangeConfirmPassword=this.onChangeConfirmPassword.bind(this);
        this.onChangeName=this.onChangeName.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    onSubmit=e=>{
        e.preventDefault();
        const new_user={
        name:this.state.name,
        email:this.state.email,
        password:this.state.password,
        password_confirmation:this.state.password_confirmation
    };
        axios.post('http://localhost:8000/api/signup',new_user)
        .then((response)=>{
            console.log(response);
        },(error)=>{
            console.log(error);
                });

    }
    onChangeConfirmPassword=(e)=>{
        //this.setState({ this.state.confirm_password : e.target.value});
    }
    onChangeEmail=e=>{
        //this.setState({this.state.email:e.target.value});
    }
    onChangeName=e=>{
      
        //this.setState({this.state.name:e.target.value});
    }
    onChangePassword=e=>{
        //this.setState({this.state.password:e.target.value});
    }
    render(){
  return (
    <div>
        <div>Register here </div>
        <TextInput id="TextInput-1" label="Type your name" value={this.state.name} onChange={(e)=>this.onChangeName(e)}/>
        <TextInput  email id="TextInput-2" label="Type your email" value={this.state.email} onChange={(e)=>this.onChangeEmail(e)}/>
        <TextInput id="TextInput-3" label="Password" password value={this.state.password} onChange={(e)=>this.onChangePassword(e)}/>
        <TextInput id="TextInput-4" label=" Confirm Password" password value={this.state.password_confirmation} onChange={(e)=>this.onChangeConfirmPassword(e)}/>
        <Button href="http://localhost:3000/signin" node="a" waves="light" onClick={(e)=>this.onSubmit(e)}>
            Register
        </Button>
      
    </div>

  );
    }
}


