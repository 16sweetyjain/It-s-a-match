import React, { Component }  from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import MainPage from './MainPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoRequests from './NoRequests';
import { withRouter } from 'react-router-dom';

class ViewMeetRequests extends Component{
    constructor(props){
        super(props);
        this.state = {
            senderOfAcceptEmail:'',
            receiverOfAcceptEmail:'',
            rejected:'false',
            users:[],
            petName:'',
            petImage:'',
            pendingMeetRequestsForUser:[]
        };
        this.onAcceptRequestHandler = this.onAcceptRequestHandler.bind(this);
        this.acceptRequest = this.acceptRequest.bind(this);
        this.handleReject = this.handleReject.bind(this);
    }
    componentDidMount(){  
        this.setState({ senderOfAcceptEmail:this.props.email });
        axios.get('api/getAllUsers')
            .then((response) => {
                console.log(response);
                this.setState({ users:response.data.result });
                let pendingMeetRequests = [];
                let myLoggedInUser = [];
                let meets = [];
                myLoggedInUser = this.state.users.filter((user) => user.email === this.props.email);
                myLoggedInUser.map(user => this.setState({ petName:user.profile.pet_name,petImage:user.profile.image_of_pet }));
                myLoggedInUser.forEach((user) => {
                    meets = user.meets;
                });
                pendingMeetRequests = meets.filter(meet => meet.meetRequestStatus === 'pending');
                this.setState({ pendingMeetRequestsForUser:pendingMeetRequests });
            },(error) => {
                console.log(error);
            });     
    }
    handleReject = (e) => {
        e.preventDefault();
        this.setState({ rejected:true }, () => toast.success('Request rejected', { position: toast.POSITION.BOTTOM_RIGHT , autoClose: 1000 }) );
    }

    onAcceptRequestHandler=(e,userEmail, meetDate, meetTime) => {
        e.preventDefault();
        this.setState({ receiverOfAcceptEmail:userEmail }, () => this.acceptRequest(meetDate, meetTime)  );
    }

    acceptRequest=(meetDate, meetTime) => {
        const request = {
            senderOfAcceptEmail:this.state.senderOfAcceptEmail,
            receiverOfAcceptEmail:this.state.receiverOfAcceptEmail,
            meetRequestStatus:'accepted',
            pet_name:this.state.petName,
            image:this.state.petImage,
            meetDate:meetDate,
            meetTime:meetTime
        };
        axios.put('api/acceptMeetRequest', request)
            .then((response) => {
                console.log(response);
                let pendingRequests = [];
                pendingRequests = response.data.result.meets.filter(notif => notif.meetRequestStatus === 'pending');
                this.setState({ pendingMeetRequestsForUser:pendingRequests });
            },(error) => {
                console.log(error);
            });
        toast.success('Meet Request accepted', { position: toast.POSITION.BOTTOM_RIGHT , autoClose: 1000 } );
    }
    render(){
        const { pendingMeetRequestsForUser = undefined } = this.state;
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
                                                        <button  style={ { width: '200', borderRadius: '3px', letterSpacing: '1.5px', marginBottom:'100' } } className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={ (e) => this.onAcceptRequestHandler(e,userEmail, meetDate, meetTime) }>Accept</button>
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

export default withRouter(connect(mapStateToProps,null)(ViewMeetRequests));