import React, { useState,useEffect }  from 'react';
import {  useSelector  } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoRequests from './NoRequests';
import Navbar from '../Navbar';
import HomeNavbar from './HomeNavbar';
import { useHistory } from 'react-router';
import Loader from '../Loader';

export default function ViewFriendRequests() {

    const history = useHistory();
    const [senderOfAcceptEmail, onChangeSender] = useState('');
    const [ petName, getPetName] = useState('');
    const [ petImage, getPetImage] = useState('');
    const [ pendingRequestsForUser, getPendingRequests] = useState([]);
    const userEmail = useSelector( state => state.userEmail.email);
    const [isLoading,setLoading] = useState(true);

    useEffect(() => { 
        onChangeSender(userEmail);
        axios.get('api/getAllUsers')
            .then((response) => {
                console.log(response);
                let pendingRequests = [];
                let myLoggedInUser = [];
                let notifications = [];
                myLoggedInUser = response.data.result.filter((user) => user.email === userEmail);
                myLoggedInUser.map(user => {
                    getPetName(user.profile.pet_name);
                    getPetImage(user.profile.image_of_pet);
                });
                myLoggedInUser.forEach((user) => {
                    notifications = user.notifications;
                });
                pendingRequests = notifications.filter(notif => notif.notification_status === 'pending');
                getPendingRequests(pendingRequests);
                setLoading(false);
            },(error) => {
                console.log(error);
            });     
    },[]);

    const handleReject = (e, user_email) => {
        e.preventDefault();
        const request = {
            userEmail:user_email,
            current_user_email:userEmail,
            petName:petName
        };
        axios.put('api/deleteNotification',request)
            .then((response) => {
                console.log(response);
                let pendingRequests = [];
                pendingRequests = response.data.result.notifications.filter(notif => notif.notification_status === 'pending');
                getPendingRequests(pendingRequests);
            })
            .catch((error) => console.log(error));
        toast.success('Request rejected', { position: toast.POSITION.BOTTOM_RIGHT , autoClose: 1000 });
    };

    const onAcceptRequestHandler = (e,user_email) => {
        e.preventDefault();
        const request = {
            senderOfAcceptEmail:senderOfAcceptEmail,
            receiverOfAcceptEmail:user_email,
            notificationStatus:'accepted',
            pet_name:petName,
            image:petImage
        };
        axios.put('api/acceptNotifications', request)
            .then((response) => {
                console.log(response);
                let pendingRequests = [];
                pendingRequests = response.data.result.notifications.filter(notif => notif.notification_status === 'pending');
                getPendingRequests(pendingRequests);
                toast.success('Request accepted', { position: toast.POSITION.BOTTOM_RIGHT , autoClose: 1000 } );
            },(error) => {
                console.log(error);
            });
    };

    console.log(isLoading);

    return(
        <div>
            {isLoading ? <Loader/> :
                <div>
                    <Navbar/>
                    <HomeNavbar/>
                    <i className=" white small material-icons" onClick={() => history.goBack()}>arrow_back</i>
                    <div className ='container'>
                        {!pendingRequestsForUser.length && <NoRequests/>}
                        <div>
                            {pendingRequestsForUser.map((request) => {
                                const pet_name = request.pet_name;
                                const image = request.image;
                                const userEmail = request.user_email;
                                return(
                                    <div  key={ pet_name } className="col s12 m8 offset-m2 l6 offset-l3">
                                        <div className="card-panel grey lighten-5 z-depth-1">
                                            <div className="row valign-wrapper">
                                                <div className="col s2">
                                                    <img className = "circle" src={ `${ image.substr(8) }` } style={ { height:100,width:100 } }/> 
                                                </div>
                                                <div className="col s12">
                                                    <span className="black-text">
                                                        <h4>{pet_name} sent you a friend request</h4>
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="col s12" style={{ marginBottom :'5px' }}>
                                                        <button  style={ { width: '200', borderRadius: '3px', letterSpacing: '1.5px', marginBottom:'100' } } className="btn btn-large btn-dark" onClick={ (e) => onAcceptRequestHandler(e,userEmail) }>Accept</button>
                                                        <ToastContainer />
                                                    </div>
                                                    <div className="col s12">
                                                        <button style={ { width: '200', borderRadius: '3px', letterSpacing: '1.5px', marginTop:'100' } } className="btn btn-large btn-dark" onClick={ (e) => handleReject(e,userEmail) }>Reject</button>
                                                        <ToastContainer />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div> }
        </div>
    );
}