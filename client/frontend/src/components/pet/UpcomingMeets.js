import React, { useState,useEffect }  from 'react';
import {  useSelector  } from 'react-redux';
import MainPage from './MainPage';
import axios from 'axios';
import NoMeets from './NoMeets';

export default function UpcomingMeets(){
    const userEmail = useSelector( state => state.userEmail.email);
    const [ users, usersList ] = useState([]);


    useEffect(() => {
        axios.get('api/getAllUsers')
            .then((response) => {
                console.log(response);
                usersList(response.data.result);
            },(error) => {
                console.log(error);
            });  
    });
  
    let meets = [];
    const myLoggedInUser = users.filter((user) => user.email === userEmail);
    myLoggedInUser.forEach((user) => {
        meets = user.meets;
    });
    const acceptedRequests = meets.filter(meet => meet.meetRequestStatus === 'accepted');

    return(
        <div>
            <MainPage/>
            <div className ='container'>
                {acceptedRequests.length == 0 ? <NoMeets/> :
                    <div>
                        {acceptedRequests.map((meet) => {
                            const petName = meet.pet_name;
                            const image = meet.image;
                            const meetDate = meet.meetDate;
                            const meetTime = meet.meetTime;
                            return(
                                <div  key={ petName } className="col s12 m8 offset-m2 l6 offset-l3">
                                    <div className="card-panel grey lighten-5 z-depth-1">
                                        <div className="row valign-wrapper">
                                            <div className="col s2">
                                                <img className = "circle" src={ `${ image.substr(8) }` } style={ { height:100,width:100 } }/> 
                                            </div>
                                            <div className="col s12">
                                                <span className="black-text">
                                                    <h4>You have an upcoming meet with {petName} on {meetDate} at {meetTime} </h4>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );})}
                    </div>
                }
            </div>
        </div>
    );
}
