import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import auth from './Auth';
import setUserEmail from '../actions/setUserEmail';

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            isLogged:false
        };
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

  onSubmit = e => {
      e.preventDefault();
      this.setState({ isLogged:true });
      const user = { 
          email:this.state.email,
          password:this.state.password,
      };
      let val;
      axios.post('api/signin',user)
          .then((response) => {
              console.log(response.data.message);
              val = response.data.message;
              console.log('user:',user);
              console.log('login success');
              this.props.setUserEmail(this.state.email);
              //console.log(route.isProfileCreated());
              auth.signin(() => {
                  if(Object.prototype.hasOwnProperty.call(val,'profile')){
                      this.props.history.push('/showAllPets');   
                  }
                  else{
                      this.props.history.push('/create');
                  }
              });
          },(error) => {
              console.log(error);
          });
  }

  onChangeEmail= e => {
      this.setState({ email:e.target.value });
  }

  onChangePassword = e => {
      this.setState({ password:e.target.value });
  } 

  render(){
      return(
          <div className="row"  style={ { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
              <form className="col s6">
                  <div className="row">
                      <div className="input-field col s12">
                          <i className="material-icons prefix">email</i>
                          <input id="email" type="email" className="validate" value={ this.state.email } onChange={ e => this.onChangeEmail(e) }/>
                          <label>Email</label>
                      </div>
                  </div>
                  <div className="row">
                      <div className="input-field col s12">
                          <i className="material-icons prefix">lock</i>
                          <input id="password" type="password" className="validate" value={ this.state.password } onChange={ e => this.onChangePassword(e) }/>
                          <label>Password</label>
                      </div>
                  </div>
                  <div className="row">
                      <div className="input-field col s12">
                          <button style={ { width: '140px', borderRadius: '3px', letterSpacing: '1.5px' } } className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={ e => this.onSubmit(e) }>Login</button>
                      </div>
                  </div>
              </form>
          </div>
      ); 
  }
}
const mapStateToProps = (state) => {
    const { userEmail } = state;
    return userEmail;
};

const mapDispatchToProps = (dispatch) => {
    return{
        setUserEmail: email => dispatch(setUserEmail(email))
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
