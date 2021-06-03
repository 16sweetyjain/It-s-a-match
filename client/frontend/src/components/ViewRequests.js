import React, { Component }  from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import MainPage from './MainPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoRequests from './NoRequests';

class ViewRequests extends Component{
    constructor(props){
        super(props);
        this.state = {
            notificationStatus:'accepted',
            senderOfAcceptEmail:'',
            receiverOfAcceptEmail:'',
            rejected:'false',
            users:[]
        };
        this.onAcceptRequestHandler = this.onAcceptRequestHandler.bind(this);
        this.acceptRequest = this.acceptRequest.bind(this);
        this.handleReject = this.handleReject.bind(this);
    }
    componentDidMount(){  
        this.setState({ senderOfAcceptEmail:this.props.email });
        axios.get('api/getAllUsers')
            .then((response) => {
                this.setState({ users:response.data.result });
            },(error) => {
                console.log(error);
            });    
    }
    handleReject = (e) => {
        e.preventDefault();
        this.setState({ rejected:true }, () => toast.success('Request rejected', { position: toast.POSITION.BOTTOM_RIGHT , autoClose: 1000 }) );
    }
    onAcceptRequestHandler=(e,userEmail) => {
        e.preventDefault();
        this.setState({ receiverOfAcceptEmail:userEmail }, () => this.acceptRequest()  );
    }
    acceptRequest=() => {
        const request = {
            senderOfAcceptEmail:this.state.senderOfAcceptEmail,
            receiverOfAcceptEmail:this.state.receiverOfAcceptEmail,
            notificationStatus:this.state.notificationStatus
        };
        console.log(request);
        axios.put('api/acceptNotifications', request)
            .then((response) => {
                console.log(response);
            },(error) => {
                console.log(error);
            });
        toast.success('Request accepted', { position: toast.POSITION.BOTTOM_RIGHT , autoClose: 1000 } );
    }
    render(){
        let notifications = [];
        let pendingRequests = [] ;
        let myLoggedInUser = [];
        myLoggedInUser = this.state.users.filter((user) => user.email === this.props.email);
        myLoggedInUser.forEach((user) => {
            notifications = user.notifications;
        });
        pendingRequests = notifications.filter(notif => notif.notification_status === 'pending');
        return(
            <div>
                <MainPage/>
                <div className ='container'>
                    {pendingRequests.length == 0 ? <NoRequests/> :
                        <div>
                            {pendingRequests.map((request) => {
                                const petName = request.pet_name;
                                const image = request.image;
                                const userEmail = request.user_email;
                                return(
                                    <div  key={ petName } className="col s12 m8 offset-m2 l6 offset-l3">
                                        <div className="card-panel grey lighten-5 z-depth-1">
                                            <div className="row valign-wrapper">
                                                <div className="col s2">
                                                    <img src={ `${ image.substr(8) }` } alt=""  style={ { height:100,width:100 } }/> 
                                                </div>
                                                <div className="col s12">
                                                    <span className="black-text">
                                                        <h4>{petName} sent you a request</h4>
                                                    </span>
                                                </div>
                                                <div >
                                                    <div className="col s12">
                                                        <button  style={ { width: '200', borderRadius: '3px', letterSpacing: '1.5px', marginBottom:'100' } } className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={ (e) => this.onAcceptRequestHandler(e,userEmail) }>Accept</button>
                                                        <ToastContainer />
                                                    </div>
                                                    <div className="col s12">
                                                        <button style={ { width: '200', borderRadius: '3px', letterSpacing: '1.5px', marginTop:'100' } } className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={ (e) => this.handleReject(e) }>Reject</button>
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
}
const mapStateToProps = (state) => {
    const { userEmail } = state;
    return userEmail;
};

export default connect(mapStateToProps,null)(ViewRequests);