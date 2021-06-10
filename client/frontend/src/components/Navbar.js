import React, { Component } from 'react';

export default class Navbar extends Component {
    render() {
        return (
            <div className="navbar-fixed ">
                <nav className="z-depth-0">
                    <div className="nav-wrapper black">
                        <label style={ { fontFamily: 'monospace' } } className="col s5 brand-logo center white-text">
                            <i className="large material-icons">pets</i>
                        IT&apos;S-A-MATCH
                        </label>
                    </div>
                </nav>
            </div>
        );
    }
}
