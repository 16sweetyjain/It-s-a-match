import { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';

export default class ViewPendingRequests extends Component {
    constructor(props){
        super(props);
        this.state = {
            notification_status: "pending",
            users:[]  
        }
    }
    componentDidMount() {
        axios.get('http://localhost:8000/api/getAllUsers')
          .then((response) => {
            this.setState({ users: response.data.result });
          }, (error) => {
            console.log(error);
          });
      }
    render(){
        let my_logged_in_user = this.state.users.filter((user) => user.email === this.props.email);
        let other_users = this.state.users.filter(user=>user.email!==this.props.email);
        let pending_requests_users = other_users.filter(user => user.notifications.notification_status === this.state.notification_status);

        return(
            <div>
            <div>
            <h1>List of Matches for your pet</h1>
            </div>
            {pending_requests_users.map((user) => {
                return(
            <div>
                <Row>
                    <Col m={6} s={12}>
                        <Card actions={[ <a key="1" href="#">View Profile</a> ]} closeIcon={<Icon>close</Icon>}
                        header={<CardTitle image={`http://localhost:8000/${it.user.profile.image_of_pet}`}>{user.profile.pet_name}</CardTitle>} 
                        revealIcon={<Icon>more_vert</Icon>}
                        >
                        </Card>
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
  
export default connect(mapStateToProps)(ViewPendingRequests);