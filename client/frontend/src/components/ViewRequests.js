import { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import MainPage from './MainPage';

class ViewRequests extends Component{
    constructor(props){
        super(props);
        this.state = {
            notification_status:"accepted",
            sender_of_accept_email:"",
            receiver_of_accept_email:"",
            rejected:'false'
        }
        this.onAcceptRequestHandler=this.onAcceptRequestHandler.bind(this);
        this.acceptRequest=this.acceptRequest.bind(this);
        this.handleReject=this.handleReject.bind(this);
    }
    componentDidMount(){  
        this.setState({sender_of_accept_email:this.props.email});
    }
    handleReject=(e)=>{
        e.preventDefault();
        this.setState({rejected:true});
    }
    onAcceptRequestHandler=(e,userEmail)=>{
        e.preventDefault();
        this.setState({receiver_of_accept_email:userEmail});
        this.acceptRequest();
    }
    acceptRequest=()=>{
        const request = {
            sender_of_accept_email:this.state.sender_of_accept_email,
            receiver_of_accept_email:this.state.receiver_of_accept_email,
            notification_status:this.state.notification_status
        }
        console.log(request)
        axios.put('api/acceptNotifications', request)
    .then((response)=>{
          console.log(response);
    },(error)=>{
          console.log(error);
    });
    }
    render(){
        let notifications=[];
        let pending_requests=[] ;
        let my_logged_in_user;
        my_logged_in_user = this.props.users.filter((user) => user.email === this.props.email);
        my_logged_in_user.forEach((user)=>{
            notifications = user.notifications;
        })
       pending_requests = notifications.filter(notif=>notif.notification_status==="pending");
        return(
            <div>
                <MainPage/>
                <div className ='container'>
            <div>
                {pending_requests.map((request)=>{
                    const pet_name = request.pet_name;
                    const image = request.image;
                    const userEmail = request.user_email;
                    return(
                        <div class="col s12 m8 offset-m2 l6 offset-l3">
        <div class="card-panel grey lighten-5 z-depth-1">
          <div class="row valign-wrapper">
            <div class="col s2">
              <img src={`${image.substr(8)}`} alt=""  style={{height:100,width:100}}/> 
            </div>
            <div class="col s12">
              <span class="black-text">
                <h4>{pet_name} sent you a request</h4>
              </span>
            </div>
            <div >
            <div class="col s12">
              <button  style={{
                  width: "200",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                 
                  marginBottom:'100'
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={(e)=>this.onAcceptRequestHandler(e,userEmail)}>Accept</button>
                </div>
                <div class="col s12">
              <button style={{
                  width: "200",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  
                  marginTop:'100'
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={(e)=>this.handleReject(e)}>Reject</button>
            </div>
            </div>
          </div>
        </div>
      </div>
                    )

                })}
            
      
    </div>
    </div>
    </div>
        );
    }
}
const mapStateToProps= (state) => {
    const { userEmail } = state;
    return userEmail
};

export default connect(mapStateToProps,null)(ViewRequests);