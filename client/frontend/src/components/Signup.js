import { React,Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';


class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            passwordConfirmation:'',
            name:''
        };
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            passwordConfirmation:this.state.passwordConfirmation
        };
        //console.log(newUser);
        axios.post('api/signup',newUser)
            .then((response) => {
                console.log(response);
                this.props.history.push('/signin');
            })
            .catch(error => {
                let errorMessage = error.response.data.errors;
                errorMessage.map( e => {
                    toast.error(e.error,{ position: toast.POSITION.BOTTOM_RIGHT , autoClose: 1000 } );  
                });
            });
    }

    onChangeConfirmPassword= e => {
        this.setState({ passwordConfirmation : e.target.value });
    }

    onChangeEmail= e => {
        this.setState({ email:e.target.value });
    }

    onChangeName= e => {
        this.setState({ name:e.target.value });
    }

    onChangePassword= e => {
        this.setState({ password:e.target.value });
    }

    render(){
        return(
            <div>
                <Navbar/>
                <div  style={ { height: '90vh' } } className='container'>
                    <div className="row"  style = { { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12 black-text" style = { { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
                                    <h3>Register</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 black-text">
                                    <i className="material-icons prefix">account_circle</i>
                                    <input id="name" type="text" className="validate" value={ this.state.name } onChange={ e => this.onChangeName(e) }/>
                                    <label>Name</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 black-text">
                                    <i className="material-icons prefix">email</i>
                                    <input id="email" type="email" className="validate" value={ this.state.email } onChange={ e => this.onChangeEmail(e) }/>
                                    <label>Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 black-text">
                                    <i className="material-icons prefix">lock</i>
                                    <input id="password" type="password" className="validate" value={ this.state.password } onChange={ e => this.onChangePassword(e) }/>
                                    <label>Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 black-text">
                                    <i className="material-icons prefix">lock</i>
                                    <input id="password" type="password" className="validate" value={ this.state.passwordConfirmation } onChange={ e => this.onChangeConfirmPassword(e) }/>
                                    <label>Confirm Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12" style = { { textAlign:'center' } }>
                                    <button className="btn btn-large btn-dark" onClick={ e => this.onSubmit(e) }>Register</button>
                                    <ToastContainer/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Signup);
