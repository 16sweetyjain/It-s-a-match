import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

export default function Signup() {
    const history = useHistory();
    const [user, setUserDetails] = useState({
        email:'',
        password:'',
        passwordConfirmation:'',
        name:''
    });
      
    const onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name:user.name,
            email:user.email,
            password:user.password,
            passwordConfirmation:user.passwordConfirmation
        };
        axios.post('api/signup',newUser)
            .then((response) => {
                console.log(response);
                history.push('/signin');
            })
            .catch(error => {
                let errorMessage = error.response.data.errors;
                errorMessage.map( e => {
                    toast.error(e.error,{ position: toast.POSITION.BOTTOM_RIGHT , autoClose: 1000 } );  
                });
            });
    };

    const onChangeHandler = e => {
        setUserDetails({ ...user, [e.target.id]:e.target.value });
    };

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
                                <input id="name" type="text" className="validate" value={ user.name } onChange={onChangeHandler}/>
                                <label>Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 black-text">
                                <i className="material-icons prefix">email</i>
                                <input id="email" type="email" className="validate" value={ user.email } onChange={onChangeHandler}/>
                                <label>Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 black-text">
                                <i className="material-icons prefix">lock</i>
                                <input id="password" type="password" className="validate" value={ user.password } onChange={onChangeHandler}/>
                                <label>Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 black-text">
                                <i className="material-icons prefix">lock</i>
                                <input id="passwordConfirmation" type="password" className="validate" value={ user.passwordConfirmation } onChange={onChangeHandler}/>
                                <label>Confirm Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12" style = { { textAlign:'center' } }>
                                <button className="btn btn-large btn-dark" onClick={onSubmit}>Register</button>
                                <ToastContainer/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

