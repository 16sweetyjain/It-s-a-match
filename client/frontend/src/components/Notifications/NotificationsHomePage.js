import {React,Component} from 'react';
import axios from 'axios';
import {Row,Col,Card,Icon,CardTitle} from 'react-materialize';

export default class NotificationsHomePage extends Component {
    constructor(props){
        super(props);
      }
    render(){
        let my_logged_in_user = this.props.my_logged_in_user;
        let other_users = this.props.other_users;
        let pending_requests_users = other_users.filter(user => user.notifications.notification_status === "pending");
        let accepted_requests_users = other_users.filter(user => user.notifications.notification_status === "accepted");
        return(
            <div class="nav-content">
            <ul class="tabs tabs-transparent">
              <li class="tab"><a href="#test1">Test 1</a></li>
              <li class="tab"><a class="active" href="#test2">Test 2</a></li>
              <li class="tab disabled"><a href="#test3">Disabled Tab</a></li>
              <li class="tab"><a href="#test4">Test 4</a></li>
            </ul>
          </div>
    );
    }
}