import React, { useState,useEffect }  from 'react';
import {  useSelector  } from 'react-redux';
import axios from 'axios';
import NoMeets from './NoMeets';
import Navbar from '../Navbar';
import HomeNavbar from './HomeNavbar';
import { useHistory } from 'react-router';
import Loader from '../Loader';

export default function UpcomingMeets(){

    const history = useHistory();
    const userEmail = useSelector( state => state.userEmail.email);
    const [ users, usersList ] = useState([]);
    const [isLoading,setLoading] = useState(true);

    useEffect(() => {
        axios.get('api/getAllUsers')
            .then((response) => {
                console.log(response);
                usersList(response.data.result);
                setLoading(false);
            },(error) => {
                console.log(error);
            });  
    },[]);
  
    let meets = [];
    const myLoggedInUser = users.filter((user) => user.email === userEmail);
    myLoggedInUser.forEach((user) => {
        meets = user.meets;
    });
    const acceptedRequests = meets.filter(meet => meet.meetRequestStatus === 'accepted');

    return(
        <div>
            {isLoading ? <Loader/> :
                <div>
                    <Navbar/>
                    <HomeNavbar/>
                    <i className="white small material-icons" onClick={() => history.goBack()}>arrow_back</i>
                    <div className ='container'>
                        {!acceptedRequests.length  && <NoMeets/>}
                        <div>
                            {acceptedRequests.map((meet) => {
                                const petName = meet.pet_name;
                                const image = meet.image;
                                const meetDate = meet.meetDate;
                                const meetTime = meet.meetTime;
                                const meetPlace = meet.meetPlace;
                                return(
                                    <div  key={ petName } className="col s12 m8 offset-m2 l6 offset-l3">
                                        <div className="card-panel grey lighten-5 z-depth-1">
                                            <div className="row valign-wrapper">
                                                <div className="col s2">
                                                    <img className = "circle" src={ `${ image.substr(8) }` } style={ { height:100,width:100 } }/> 
                                                </div>
                                                <div className="col s12">
                                                    <span className="black-text">
                                                        <h4>You have an upcoming meet with {petName} on {meetDate} at {meetTime}. Place - {meetPlace} </h4>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );})}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
