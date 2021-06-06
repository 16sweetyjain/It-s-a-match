import { React,Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class MainPage extends Component {
    constructor(props){
        super(props); 
        this.state = {
            users:[]
        };
    }

    componentDidMount(){
        axios.get('api/getAllUsers')
            .then((response) => {
                this.setState({ users:response.data.result });
            },(error) => {
                console.log(error);
            });  
    }
    
    render(){
        let notifications = [];
        let pendingRequests = [] ;
        let myLoggedInUser = [];
        const allPets = [];
        const friends = [];
        let otherUsers = [];
        myLoggedInUser = this.state.users.filter((user) => user.email === this.props.email);
        otherUsers = this.state.users.filter(user => user.email !== this.props.email);
        //console.log(myLoggedInUser);
        const name = myLoggedInUser.map(user => user.profile.pet_name);
        myLoggedInUser.forEach((user) => {
            notifications = user.notifications;
        });
        const acceptedRequests = notifications.filter(notif => notif.notification_status === 'accepted');
        acceptedRequests.map(r => allPets.push(r.user_email));
        otherUsers.map(user => {
            const c = user.email;
            if(allPets.includes(c)){
                friends.push(user);
            }
        });
        pendingRequests = notifications.filter(notif => notif.notification_status === 'pending');
       
        return(
            <nav className="brown darken-1">
                <div className="nav-wrapper"> 
                    <label className="brand-logo left">Welcome, {name}</label>
                    <ul id="nav-mobile" className="right hide-on-med-and-down" >
                        <li  value="1"><Link to='/showAllPets'>List of Pets</Link></li>
                        <li  value="2" ><Link to= {{ pathname:'/viewRequests', state:{ pendingRequests:pendingRequests } }}>View Requests</Link></li>
                        <li  value="3"><Link to={{ pathname:'/viewFriends', state:{ friends:friends } }}>Friends</Link></li>
                        <li  value="4" ><Link to='/signout'>Logout</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    const { userEmail } = state;
    return userEmail;
};

export default connect(mapStateToProps,null)(MainPage);