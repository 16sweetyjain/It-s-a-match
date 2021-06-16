import React, { useState,useEffect  } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function MainPage(){
    const [ users, usersList ] = useState([]);
    const userEmail = useSelector( state => state.userEmail.email);

    useEffect(() => {
        axios.get('api/getAllUsers')
            .then((response) => {
                usersList(response.data.result);
            },(error) => {
                console.log(error);
            });  
    });

    let myLoggedInUser = [];
    myLoggedInUser = users.filter((user) => user.email === userEmail);
    const name = myLoggedInUser.map(user => user.profile.pet_name);

    return(
        <nav>
            <div className="nav-wrapper"> 
                <label className="brand-logo left">Welcome, {name}</label>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li  value="1"><Link to='/showAllPets'>Pets</Link></li>
                    <li  value="3"><Link to='/viewFriends'>Friends</Link></li>
                    <li  value="5"><Link to='/viewMeets'>Meets</Link></li>
                    <li  value="4"><Link to='/viewMeetRequests'>Meet Requests</Link></li>
                    <li  value="2" ><Link to='/viewRequests'>Friend Requests</Link></li>
                    <li  value="6" ><Link to='/signout'>Logout</Link></li>
                </ul>
            </div>
        </nav>
    );
}