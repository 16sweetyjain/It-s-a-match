import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function HomePage(){
    return (
        <div>
            <Navbar/>
            <div style={ { height: '90vh' } } className="container  valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align black-text ">
                        <h4>
                            <b>Welcome to It&apos;s-a-match</b> 
                        </h4>
                        <p className="flow-text black-text ">
                            <h3>
                               We hope you find a perfect match for your pet.
                            </h3>
                        </p>
                        <p className="flow-text black-text">
                            <h3>
                               Start Exploring!
                            </h3>
                        </p>
                        <div className="col s6">
                            <Link to="/signup"className="btn btn-large btn-dark">
                                   Register
                            </Link>
                        </div>
                        <div className="col s6">
                            <Link to="/signin" className="btn btn-large btn-dark">
                               Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
