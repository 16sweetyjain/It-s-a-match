import React, { Component }  from 'react';
import { connect } from 'react-redux';
import MainPage from './MainPage';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import NoFriends from './NoFriends';

class ViewFriends extends Component{
    constructor(props){
        super(props);
        this.state = {
            users:[],
            senderEmail:''
        };
        this.arrangeMeetHandler = this.arrangeMeetHandler.bind(this);
    }
    componentDidMount(){
        axios.get('api/getAllUsers')
            .then((response) => {
                console.log(response);
                this.setState({ users:response.data.result });
            },(error) => {
                console.log(error);
            });  
        this.setState({ senderEmail:this.props.email });
    }
  
    arrangeMeetHandler = (e,userEmail, petName, image) => {
        e.preventDefault();
        const stateOfMeetRequest = {
            senderEmail:this.state.senderEmail,
            receiverEmail:userEmail,
            meetRequestStatus:'pending',
            pet_name:petName,
            image: image
        };
        console.log(stateOfMeetRequest);
        this.props.history.push({
            pathname:'/arrangeMeet',
            state:stateOfMeetRequest
        });
    }
    render(){
        let notifications = [];
        let friends = [];
        let otherUsers = [];
        let allPets = [];
        const myLoggedInUser = this.state.users.filter((user) => user.email === this.props.email);
        otherUsers = this.state.users.filter((user) => user.email !== this.props.email);
        myLoggedInUser.forEach((user) => {
            notifications = user.notifications;
        });
        console.log(notifications);
        const acceptedRequests = notifications.filter(notif => notif.notification_status === 'accepted');
        acceptedRequests.map(r => allPets.push(r.user_email));
        otherUsers.map(user => {
            const c = user.email;
            if(allPets.includes(c)){
                friends.push(user);
            }
        });
        return(
            <div>
                <MainPage/>
                <div className ='container'>
                    {friends.length == 0 ? <NoFriends/> :
                        <div className="row">
                            {friends.map((friend) => {
                                const userEmail = friend.email;
                                const petName = friend.profile.pet_name;
                                const image = friend.profile.image_of_pet;
                                return(
                                    <div  key={ petName } className = "col s6" style={ { textAlign:'center' } }>
                                        <div className="card" >
                                            <div >
                                                <img  style = { { height : '350px', width: '350px' } } className="activator" src={ `${ image.substr(8) }` }/>
                                            </div>
                                            <div className="card-content">
                                                <span className="card-title activator grey-text text-darken-4"><h5><b>{petName.toUpperCase()} </b></h5>
                                                    <div style = {{  textAlign:'center' }}>
                                                        <button style={ { width: '200', borderRadius: '3px', letterSpacing: '1.5px' } } className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={ (e) => this.arrangeMeetHandler( e,userEmail, petName, image ) }>
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
}
const mapStateToProps = (state) => {
    const { userEmail } = state;
    return userEmail;
};

export default withRouter(connect(mapStateToProps,null)(ViewFriends));