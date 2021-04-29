import { Component } from "react";
import { BrowserRouter as Router, Route,withRouter ,Link} from "react-router-dom";
import {TextInput} from 'react-materialize';
import axios from 'axios';
import { connect } from "react-redux";
import setUserEmail from '../actions/setUserEmail';
import CreateProfile from "./CreateProfile";
import setUserEmailReducer from "../reducers/setUserEmail";

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state={
      email:"",
      password:"",
      isLogged:false
  }
  this.onChangePassword=this.onChangePassword.bind(this);
  this.onChangeEmail=this.onChangeEmail.bind(this);
  this.onSubmit=this.onSubmit.bind(this);

  }
  onSubmit = e =>{
    e.preventDefault();
    this.setState({isLogged:true});
    const user = { 
      email:this.state.email,
      password:this.state.password
    }

    axios.post('http://localhost:8000/api/signin',user)
    .then((response)=>{
        console.log(response);
    },(error)=>{
        console.log(error);
    });
    console.log('user:',user);
    console.log('login success');
    
   this.props.setUserEmail(this.state.email)
  
}
  onChangeEmail=e=>{
    this.setState({email:e.target.value});
}
  onChangePassword=e=>{
  this.setState({password:e.target.value});
}
    render(){
     
  return (
    <div>
      {this.state.isLogged==false?
      <div>
        <div>Login</div>
        <TextInput id="TextInput-5" label="Type your email" value={this.state.email} onChange={e=>this.onChangeEmail(e)}/>
        <TextInput id="TextInput-6" label="Password" password value={this.state.password} onChange={e=>this.onChangePassword(e)}/>
        <Link to='/create'>
          <button    onClick = {(e)=>this.onSubmit(e)}>
            Login
          </button>
        </Link>
        </div>
        :<div>
          <CreateProfile email={this.state.email}/>
          </div>
      }
      
    </div>

  );
    }
}
const mapStateToProps= (state) => {
    const { userEmail } = state;
    return userEmail
};

const mapDispatchToProps = (dispatch) => {
  return{
    setUserEmail: email => dispatch(setUserEmail(email))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);



