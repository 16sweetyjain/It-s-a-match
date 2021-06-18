import React, { useEffect  } from 'react';
import Materialize from 'materialize-css';
import Navbar from '../Navbar';
import HomeNavbar from './HomeNavbar';
import friend_request from './helper_images/friend_request.png';
import list_of_pets from './helper_images/list_of_pets.jpg';
import meets from './helper_images/meets.png';
import pets from './helper_images/pets.png';
import { Link } from 'react-router-dom';

export default function MainPage(){

    useEffect(() => {
        var elems = document.querySelectorAll('.carousel');
        Materialize.Carousel.init(elems,{ duration: 200, }); 
    },[]);

    return(
        <div>
            <Navbar/>
            <HomeNavbar/>
            <div className = 'container' >
                <div className="carousel"style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign:'center', fontFamily:'cursive' }} >
                    <Link className="carousel-item" to='/showAllPets'><b>Find a match</b> <img src = {pets}/></Link>
                    <Link className="carousel-item" to="/viewFriends"><b>Your Matches</b><img src={list_of_pets}/></Link>
                    <Link className="carousel-item" to="/viewMeets"><b>Meets</b><img src={meets}/></Link>
                    <Link className="carousel-item" to="/viewRequests"><b>Friend Requests</b><img src= {friend_request}/></Link>
                    <Link className="carousel-item" to="/viewMeetRequests"><b>Meet Requests</b><img src= {friend_request}/></Link>
                </div>
            </div>
        </div>
    );
}