import React, { useState,useEffect  } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function HomeNavbar(){
    const [ users, usersList ] = useState([]);
    const userEmail = useSelector( state => state.userEmail.email);

    useEffect(() => {
        axios.get('api/getAllUsers')
            .then((response) => {
                console.log(response);
                usersList(response.data.result);
            },(error) => {
                console.log(error);
            });  
    },[]);


    let myLoggedInUser = [];
    myLoggedInUser = users.filter((user) => user.email === userEmail);
    const name = myLoggedInUser.map(user => user.profile.pet_name);

    return(
        <nav>
            <div className="nav-wrapper black"> 
                <label className="brand-logo left">Welcome, {name}</label>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li  value="1" ><Link to='/signout'><b>Logout</b></Link></li>
                </ul>
            </div>
        </nav>
    );

}