import React, { useState,useEffect }  from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import MainPage from './MainPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoRequests from './NoRequests';

export default function ViewMeetRequests(){

    const [senderOfAcceptEmail, onChangeSender] = useState('');
    const [receiverOfAcceptEmail, onChangeReceiver] = useState('');
    //const  rejected = 'false';
    const [ users, usersList ] = useState([]);
    const [ petName, getPetName] = useState('');
    const [ petImage, getPetImage] = useState('');
    const [ pendingMeetRequestsForUser, getPendingRequests] = useState([]);
    const userEmail = useSelector( state => state.userEmail.email);
   
    useEffect(() => {
        onChangeSender(userEmail);
        axios.get('api/getAllUsers')
            .then((response) => {
                console.log(response);
                usersList(response.data.result);
                let pendingMeetRequests = [];
                let myLoggedInUser = [];
                let meets = [];
                myLoggedInUser = users.filter((user) => user.email === userEmail);
                myLoggedInUser.map(user => {
                    getPetName(user.profile.pet_name);
                    getPetImage(user.profile.image_of_pet);
                });
                myLoggedInUser.forEach((user) => {
                    meets = user.meets;
                });
                pendingMeetRequests = meets.filter(meet => meet.meetRequestStatus === 'pending');
                getPendingRequests(pendingMeetRequests);
            },(error) => {
                console.log(error);
            });     
    });

    const handleReject = (e) => {
        e.preventDefault();
        toast.success('Request rejected', { position: toast.POSITION.BOTTOM_RIGHT , autoClose: 1000 });
    };

    const onAcceptRequestHandler = (e,userEmail, meetDate, meetTime) => {
        e.preventDefault();
        onChangeReceiver(userEmail);
        acceptRequest(meetDate, meetTime);
    };

    const acceptRequest = (meetDate, meetTime) => {
        const request = {
            senderOfAcceptEmail:senderOfAcceptEmail,
            receiverOfAcceptEmail:receiverOfAcceptEmail,
            meetRequestStatus:'accepted',
            pet_name:petName,
            image:petImage,
            meetDate:meetDate,
            meetTime:meetTime
        };
        axios.put('api/acceptMeetRequest', request)
            .then((response) => {
                console.log(response);
                let pendingRequests = [];
                pendingRequests = response.data.result.meets.filter(notif => notif.meetRequestStatus === 'pending');
                getPendingRequests(pendingRequests);
            },(error) => {
                console.log(error);
            });
        toast.success('Meet Request accepted', { position: toast.POSITION.BOTTOM_RIGHT , autoClose: 1000 } );
    };

    return(
        <div>
            <MainPage/>
            <div className ='container'>
                {pendingMeetRequestsForUser.length == 0 ? <NoRequests/> :
                    <div>
                        {pendingMeetRequestsForUser.map((request) => {
                            const petName = request.pet_name;
                            const image = request.image;
                            const userEmail = request.user_email;
                            const meetDate = request.meetDate;
                            const meetTime = request.meetTime;
                            return(
                                <div  key={ petName } className="col s12 m8 offset-m2 l6 offset-l3">
                                    <div className="card-panel grey lighten-5 z-depth-1">
                                        <div className="row valign-wrapper">
                                            <div className="col s2">
                                                <img className = "circle" src={ `${ image.substr(8) }` } style={ { height:100,width:100 } }/> 
                                            </div>
                                            <div className="col s12">
                                                <span className="black-text">
                                                    <h4>{petName} arranged a meet on {meetDate} at {meetTime} </h4>
                                                </span>
                                            </div>
                                            <div >
                                                <div className="col s12" style={{ marginBottom :'5px' }}>
                                                    <button  style={ { width: '200', borderRadius: '3px', letterSpacing: '1.5px', marginBottom:'100' } } className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={ (e) => onAcceptRequestHandler(e,userEmail, meetDate, meetTime) }>Accept</button>
                                                    <ToastContainer />
                                                </div>
                                                <div className="col s12">
                                                    <button style={ { width: '200', borderRadius: '3px', letterSpacing: '1.5px', marginTop:'100' } } className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={ (e) => handleReject(e) }>Reject</button>
                                                    <ToastContainer />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                }
            </div>
        </div>
    );
}