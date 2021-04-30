import {React,Component} from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import {Row,Col,Card,Icon,CardTitle} from 'react-materialize';

class SendRequest extends Component {
    constructor(props){
        super(props);
        this.state = {
            notification_status: "pending",
            users:[],
            sender_email:"",
            receiver_email:""
        }
        this.onSendRequestHandler = this.onSendRequestHandler.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/getAllUsers')
          .then((response) => {
            this.setState({ users: response.data.result });
          }, (error) => {
            console.log(error);
          });
      }

    onSendRequestHandler = userEmail =>{
        console.log(userEmail)
       // console.log(this.props.email)
          //e.preventDefault();
          this.setState({receiver_email: userEmail});
         
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
        let other_users = this.state.users.filter(user=>user.email !== this.props.email);
       // console.log(other_users)
        return(
            <div>
            {other_users.map((user) => {
                return(
            <div>
                <Row>
                    <Col m={6} s={12}>
                        <div>
                           <h3>Name of pet :{user.profile.pet_name}</h3> 
                           <button  onClick={ () =>this.onSendRequestHandler(user.email)}>Send Request</button>
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
  
  export default connect(mapStateToProps)(SendRequest);