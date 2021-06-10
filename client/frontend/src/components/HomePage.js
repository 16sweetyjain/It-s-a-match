import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
    render() {
        return (
            <div className="black">
                <div style={ { height: '90vh' } } className="container  valign-wrapper">
                    <div className="row">
                        <div className="col s12 center-align white-text">
                            <h4>
                                <b>Welcome to It&apos;s-a-match</b> 
                            </h4>
                            <p className="flow-text white-text">
                                <h3>
                                   We hope you find a perfect match for your pet.
                                </h3>
                            </p>
                            <p className="flow-text white-text">
                                <h3>
                                   Start Exploring!
                                </h3>
                            </p>
                            <div className="col s6">
                                <Link to="/signup" style={ { width: '140px', borderRadius: '3px', letterSpacing: '1.5px' } } className="btn btn-large btn-dark">
                                   Register
                                </Link>
                            </div>
                            <div className="col s6">
                                <Link to="/signin" style={ { width: '140px', borderRadius: '3px', letterSpacing: '1.5px' } } className="btn btn-large btn-dark">
                                   Log In
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
