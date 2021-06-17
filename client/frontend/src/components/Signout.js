import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from './Auth.js';

export default function Signout() {

    useEffect(() => {
        auth.signout(() => {}); 
    },[]);

    return(
        <div style={ { height:'75vh' } } className="container valign-wrapper">
            <div className="row">
                <div className="col s12 center-align">
                    <h4>
                        <b> You have successfully logged out </b> 
                    </h4>
                    <div className="col s6">
                        <Link to='/' style={ { width: '500px', borderRadius: '3px', letterSpacing: '1.5px' } } className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                            Navigate to It&apos;s-a-match
                        </Link>
                    </div> 
                </div>
            </div>
        </div>
    );
}
