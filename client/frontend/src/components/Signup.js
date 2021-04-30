import { React,Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";


 export default class Signup extends Component {
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            password_confirmation:"",
            name:""
        }
        this.onChangeConfirmPassword=this.onChangeConfirmPassword.bind(this);
        this.onChangeName=this.onChangeName.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    onSubmit=e=>{
        e.preventDefault();
        const new_user = {
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
        this.setState({ password_confirmation : e.target.value});
    }
    onChangeEmail=e=>{
        this.setState({email:e.target.value});
    }
    onChangeName=e=>{
        this.setState({name:e.target.value});
    }
    onChangePassword=e=>{
        this.setState({password:e.target.value});
    }
    render(){
        return(
            <div className="row"   style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
            <form class="col s6">
              <div className="row">
                <div className="input-field col s12">
                  <i class="material-icons prefix">account_circle</i>
                  <input id="name" type="text" className="validate" value={this.state.name} onChange={e=>this.onChangeName(e)}/>
                  <label for="name">Name</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                <i class="material-icons prefix">email</i>
                  <input id="email" type="email" className="validate" value={this.state.email} onChange={e=>this.onChangeEmail(e)}/>
                  <label for="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                <i class="material-icons prefix">lock</i>
                  <input id="password" type="password" className="validate" value={this.state.password} onChange={e=>this.onChangePassword(e)}/>
                  <label for="password">Password</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                <i class="material-icons prefix">lock</i>
                  <input id="password" type="password" className="validate" value={this.state.password_confirmation} onChangeName={e=>this.onChangeConfirmPassword(e)}/>
                  <label for="password">Confirm Password</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                <Link
                to="/signin"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                onClick={e=>this.onSubmit(e)}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
                </div>
              </div>
              </form>
          </div>
          );
    }
}



