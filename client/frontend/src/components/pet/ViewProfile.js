import React from 'react';
import MainPage from './MainPage';
import { useLocation } from 'react-router-dom';


export default function ViewProfile (){

    const location = useLocation();
    const petName = location.state.petName;
    const image = location.state.image;
    const dislikes = location.state.dislikes;
    const interests = location.state.interests;
    const shortInfo = location.state.shortInfo;

    return (
        <div>
            <MainPage/>
            <div className='container'>
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
                    </div>
                </div>
            </div>
        </div>
    );
}