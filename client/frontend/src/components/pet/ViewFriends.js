import React, { useState,useEffect }  from 'react';
import {  useSelector  } from 'react-redux';
import MainPage from './MainPage';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import NoFriends from './NoFriends';

export default function ViewFriends(){
    const history = useHistory();
    const [ users, usersList ] = useState([]);
    const [senderEmail, onChangeSenderEmail] = useState(''); 
    const userEmail = useSelector( state => state.userEmail.email);

    useEffect(() => {
        axios.get('api/getAllUsers')
            .then((response) => {
                console.log(response);
                usersList(response.data.result);
            },(error) => {
                console.log(error);
            });  
        onChangeSenderEmail(userEmail);
    },[]);
  
    const arrangeMeetHandler = (e,user_Email, petName, image) => {
        e.preventDefault();
        const stateOfMeetRequest = {
            senderEmail:senderEmail,
            receiverEmail:user_Email,
            meetRequestStatus:'pending',
            pet_name:petName,
            image: image
        };
        console.log(stateOfMeetRequest);
        history.push({
            pathname:'/arrangeMeet',
            state:stateOfMeetRequest
        });
    };
    let notifications = [];
    const myLoggedInUser = users.filter((user) => user.email === userEmail);
    myLoggedInUser.forEach((user) => {
        notifications = user.notifications;
    });
    const acceptedRequests = notifications.filter(notif => notif.notification_status === 'accepted');

    return(
        <div>
            <MainPage/>
            <div className ='container'>
                {acceptedRequests.length == 0 ? <NoFriends/> :
                    <div className="row">
                        {acceptedRequests.map((friend) => {
                            const userEmail = friend.user_email;
                            const petName = friend.pet_name;
                            const image = friend.image;
                            return(
                                <div  key={ petName } className = "col s6" style={ { textAlign:'center' } }>
                                    <div className="card" >
                                        <div >
                                            <img  style = { { height : '350px', width: '350px' } } className="activator" src={ `${ image.substr(8) }` }/>
                                        </div>
                                        <div className="card-content">
                                            <span className="card-title activator grey-text text-darken-4"><h5><b>{petName.toUpperCase()} </b></h5>
                                                <div style = {{  textAlign:'center' }}>
                                                    <button style={ { width: '200', borderRadius: '3px', letterSpacing: '1.5px' } } className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={ (e) => arrangeMeetHandler( e,userEmail, petName, image ) }>
                                                        Arrange a Meet
                                                    </button>
                                                </div>
                                            </span>
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