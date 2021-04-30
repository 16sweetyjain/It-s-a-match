import {React,Component} from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import {Row,Col,Card,Icon,CardTitle} from 'react-materialize';

class AcceptRequest extends Component {
    constructor(props){
        super(props);
        this.state = {
            notification_status: "accepted",
            users:[],
            sender_email:"",
            receiver_email:""
        }
        this.onSendRequestHandler = this.onSendRequestHandler.bind(this);
    }

    onSendRequestHandler = e =>{
        console.log(this.props.email)
          e.preventDefault();
          this.setState({receiver_email: e.target.value});
         
          this.setState({sender_email: this.props.email});
          const request = {
            sender_email: this.state.sender_email,
            receiver_email: this.state.receiver_email,
            notification_status: this.state.notification_status
        }
        console.log(request)
          
          axios.put('http://localhost:8000/api/sendNotifications', request)
          .then((response)=>{
              console.log(response);
          },(error)=>{
              console.log(error);
          });

      }
    render(){
        let my_logged_in_user = this.state.users.filter((user) => user.email === this.props.email);
        let other_users = this.state.users.filter(user=>user.email !== this.props.email);
        return(
            <div>
            {other_users.map((user) => {
                return(
            <div>
                <Row>
                    <Col m={6} s={12}>
                        <div>
                           <h3>Name of pet :{user.profile.pet_name}</h3> 
                           <button  value = {user.email} onClick={ (e) =>this.onSendRequestHandler(e)}>Accept Request</button>
                        </div>
                    </Col>
                </Row>
            </div>)
            })}
      </div>
    );
    }
}

const mapStateToProps= (state) => {
    const { userEmail } = state;
    return userEmail;
  };
  
  export default connect(mapStateToProps)(AcceptRequest);