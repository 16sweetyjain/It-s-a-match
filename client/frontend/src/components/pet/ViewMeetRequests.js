import React, { useState,useEffect }  from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoRequests from './NoRequests';
import Navbar from '../Navbar';
import HomeNavbar from './HomeNavbar';
import { useHistory } from 'react-router';
import Loader from '../Loader';

export default function ViewMeetRequests(){

    const history = useHistory();
    const [senderOfAcceptEmail, onChangeSender] = useState('');
    const [ petName, getPetName] = useState('');
    const [ petImage, getPetImage] = useState('');
    const [ pendingMeetRequestsForUser, getPendingRequests] = useState([]);
    const userEmail = useSelector( state => state.userEmail.email);
    const [isLoading,setLoading] = useState(true);
   
    useEffect(() => {
        onChangeSender(userEmail);
        axios.get('api/getAllUsers')
            .then((response) => {
                console.log(response);
                let pendingMeetRequests = [];
                let myLoggedInUser = [];
                let meets = [];
                myLoggedInUser = response.data.result.filter((user) => user.email === userEmail);
                myLoggedInUser.map(user => {
                    getPetName(user.profile.pet_name);
                    getPetImage(user.profile.image_of_pet);
                });
                myLoggedInUser.forEach((user) => {
                    meets = user.meets;
                });
                pendingMeetRequests = meets.filter(meet => meet.meetRequestStatus === 'pending');
                getPendingRequests(pendingMeetRequests);
                setLoading(false);
            })
            .catch((error) => console.log(error));    
    },[]);

    const handleReject = (e, user_email) => {
        e.preventDefault();
        const request = {
            userEmail:user_email,
            current_user_email:userEmail,
            petName:petName
        };
        axios.put('api/deleteMeet',request)
            .then((response) => {
                console.log(response);
                let pendingRequests = [];
                pendingRequests = response.data.result.meets.filter(notif => notif.meetRequestStatus === 'pending');
                getPendingRequests(pendingRequests);
            })
            .catch((error) => console.log(error));
        toast.success('Request rejected', { position: toast.POSITION.BOTTOM_RIGHT , autoClose: 1000 });
    };

    const onAcceptRequestHandler = (e,user_email, meetDate, meetTime, meetPlace) => {
        e.preventDefault();
        const request = {
            senderOfAcceptEmail:senderOfAcceptEmail,
            receiverOfAcceptEmail:user_email,
            meetRequestStatus:'accepted',
            pet_name:petName,
            image:petImage,
            meetDate:meetDate,
            meetTime:meetTime,
            meetPlace : meetPlace
        };
        axios.put('api/acceptMeetRequest', request)
            .then((response) => {
                console.log(response);
                let pendingRequests = [];
                pendingRequests = response.data.result.meets.filter(notif => notif.meetRequestStatus === 'pending');
                getPendingRequests(pendingRequests);
                toast.success('Meet Request accepted', { position: toast.POSITION.BOTTOM_RIGHT , autoClose: 1000 } );
            })
            .catch((error) => console.log(error));
    };

    return(
        <div>
            {isLoading ? <Loader/> :
                <div>
                    <Navbar/>
                    <HomeNavbar/>
                    <i className=" medium material-icons" onClick={() => history.goBack()}>arrow_back</i>
                    <div className ='container'>
                        {!pendingMeetRequestsForUser.length  && <NoRequests/>}
                        <div>
                            {pendingMeetRequestsForUser.map((request) => {
                                const pet_Name = request.pet_name;
                                const image = request.image;
                                const userEmail = request.user_email;
                                const meetDate = request.meetDate;
                                const meetTime = request.meetTime;
                                const meetPlace = request.meetPlace;
                                return(
                                    <div  key={ petName } className="col s12 m8 offset-m2 l6 offset-l3">
                                        <div className="card-panel grey lighten-5 z-depth-1">
                                            <div className="row valign-wrapper">
                                                <div className="col s2">
                                                    <img className = "circle" src={ `${ image.substr(8) }` } style={ { height:100,width:100 } }/> 
                                                </div>
                                                <div className="col s12">
                                                    <span className="black-text">
                                                        <h4>{pet_Name} arranged a meet on {meetDate} at {meetTime}. Place - {meetPlace} </h4>
                                                    </span>
                                                </div>
                                                <div >
                                                    <div className="col s12" style={{ marginBottom :'5px' }}>
                                                        <button  style={ { width: '200', borderRadius: '3px', letterSpacing: '1.5px', marginBottom:'100' } } className="btn btn-large btn-dark" onClick={ (e) => onAcceptRequestHandler(e,userEmail, meetDate, meetTime,meetPlace) }>Accept</button>
                                                        <ToastContainer />
                                                    </div>
                                                    <div className="col s12">
                                                        <button style={ { width: '200', borderRadius: '3px', letterSpacing: '1.5px', marginTop:'100' } } className="btn btn-large btn-dark" onClick={ (e) => handleReject(e, userEmail) }>Reject</button>
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
                </div>}
        </div>
    );
}