import React, { useState,useEffect  } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';
import Navbar from '../Navbar';
import HomeNavbar from './HomeNavbar';
toast.configure();

export default function ShowAllPets(){
    const history = useHistory();
    const notificationStatus = 'pending';
    const [senderEmail, senderEmailChangeHandler] = useState('');
    const [ users, usersList ] = useState([]);
    const userEmail = useSelector( state => state.userEmail.email);
 
    useEffect(() => {
        senderEmailChangeHandler(userEmail);
        axios.get('api/getAllUsers')
            .then((response) => {
                console.log(response);
                usersList(response.data.result);
            },(error) => {
                console.log(error);
            });  
    },[]);

    const onSendRequestHandler = (e, userEmail, senderPetName, senderPetImage) => {
        e.preventDefault();
        const request = {
            senderEmail: senderEmail,
            receiverEmail: userEmail,
            notificationStatus: notificationStatus,
            pet_name:senderPetName, 
            image:senderPetImage
        };
        console.log(request);
        axios.put('api/sendNotifications', request)
            .then((response) => {
                console.log(response);
            },(error) => {
                console.log(error);
            });  
    };

    const viewProfileHandler = (e, email, petName, interests, dislikes, shortInfo, image) => {
        e.preventDefault();
        const stateOfUser = {
            petName:petName,
            userEmail:email,
            shortInfo:shortInfo,
            dislikes:dislikes,
            interests:interests,
            image: image
        };
        console.log(stateOfUser);
        history.push({
            pathname:'/viewProfile',
            state:stateOfUser
        });
    };

    let commonInterests = [];
    const showMatches = [];
    let numberOfInterests = 0;
    let senderPetName = '';
    let senderPetImage = '';
    const myLoggedInUser = users.filter((user) => user.email === userEmail);
    myLoggedInUser.map((user) => {
        senderPetName = user.profile.pet_name;
        senderPetImage = user.profile.image_of_pet;
    }); 
    const otherUsers = users.filter(user => user.email !== userEmail);
    const myPetInterests =  myLoggedInUser.map(user => user.profile.interests.split(','));
    myPetInterests.map(i => {
        numberOfInterests = i.length;
    });
    otherUsers.map((user) => {
        const checkInterests = user.profile.interests.split(',');
        myPetInterests.map(i => {
            commonInterests = i.filter(x => checkInterests.indexOf(x) != -1);
        });
        const percentMatch = (commonInterests.length / numberOfInterests) * 100;
        showMatches.push({ 'common_interests': percentMatch,'user': user });
    });
    showMatches.sort(function compare(a,b) {                                //return matches in decreasing order of interests match
        const pa = a.common_interests;
        const pb = b.common_interests;
        let comparison = 0;
        if(pa > pb){
            comparison = -1;
        }
        else if(pa < pb){
            comparison = 1;
        }
        return comparison;
    });
    return(
        <div>
            <Navbar/>
            <HomeNavbar/>
            <i className=" medium material-icons" onClick={() => history.goBack()}>arrow_back</i>
            <div className='container' >
                <div className="row" >  
                    {showMatches.map((match) => {
                        const userEmail = match.user.email;
                        const petName = match.user.profile.pet_name;
                        const shortInfo = match.user.profile.short_description;
                        const interests = match.user.profile.interests;
                        const dislikes = match.user.profile.dislikes;
                        const image = match.user.profile.image_of_pet;
                        return(
                            <div  key = {petName}className="col s6" style= {{ textAlign: 'center' }} >
                                <div className="card large hoverable" >
                                    <div>
                                        <img  style = { { height : '350px', width: '350px' } } className="activator circle" src={ `${ image.substr(8) }` }/>
                                    </div>
                                    <div className="card-content " style = { { textAlign:'center' } }>
                                        <span className="card-title activator grey-text text-darken-4"><h5><b>{petName.toUpperCase()}</b></h5><i className="material-icons right">more_vert</i></span>
                                        <div style = {{  textAlign:'center' }}><button className="btn btn-large btn-dark" onClick={ (e) => viewProfileHandler( e, userEmail, petName, interests, dislikes, shortInfo, image ) }>View Profile</button></div>
                                    </div>
                                    <div className="card-reveal " style = { { textAlign:'center' } }>
                                        <span className="card-title grey-text text-darken-4"><h2><b>Match Finder</b></h2><i className="material-icons right">close</i></span>
                                        <h3>{senderPetName} matches {match.common_interests}% with {petName}</h3>
                                        <button className="btn btn-large btn-dark" onClick={ (e) => onSendRequestHandler(e, userEmail, senderPetName, senderPetImage) }>Send Request</button>
                                        <ToastContainer/>
                                    </div>
                                </div>
                            </div>
                        );})}
                </div>    
            </div> 
        </div>       
    );
}
