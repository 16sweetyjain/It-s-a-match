import React from 'react';
import { Link } from 'react-router-dom';

export default function NoRequests() {
    return(
        <div style={ { height: '75vh' } } className="container valign-wrapper">
            <div className="row">
                <div className="col s12 center-align">
                    <h4>
                        <b> No requests found</b> 
                    </h4>
                    <div className="col s6">
                        <Link to="/showAllPets" style={ { width: '500px', borderRadius: '3px', letterSpacing: '1.5px' } } className="btn btn-large btn-dark">
                            Find Friends
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}