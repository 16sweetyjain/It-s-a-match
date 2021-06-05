import React, { Component } from 'react';
import MainPage from './MainPage';
import { withRouter } from 'react-router-dom';

class ViewProfile extends Component{
    constructor(props){
        super(props);
        this.arrangeMeetHandler = this.arrangeMeetHandler.bind(this);
    }
    arrangeMeetHandler = (e) => {
        e.preventDefault();
    }
    render(){
        const petName = this.props.location.state.petName;
        const image = this.props.location.state.image;
        const dislikes = this.props.location.state.dislikes;
        const interests = this.props.location.state.interests;
        const shortInfo = this.props.location.state.shortInfo;

        return (
            <div>
                <MainPage/>
                <div className ="row ">
                    <div className="col s6" style={ { display:'flex', justifyContent: 'center', alignItems: 'center', marginTop:'20px' } }>
                        <img className="responsive-img" src={ `${ image.substr(8) }` }/>
                    </div>
                    <div className="col s6 ">
                        <div className="row">
                            <div className="col s12">
                                <h2>
                                    <b>{petName.toUpperCase()}</b>
                                </h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className=" col s12">
                                <h5>{shortInfo}</h5>
                            </div>
                        </div>
                        <div className="row"> 
                            <div className="col s12">
                                <h5>Interests:- {interests}</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className=" col s12">
                                <h5>Dislikes:- {dislikes}</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <button style={ { width: '200', borderRadius: '3px', letterSpacing: '1.5px' } } className="btn btn-large waves-effect waves-light hoverable blue accent-3"onClick={ (e) => this.arrangeMeetHandler(e) }>Arrange a meet</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ViewProfile);