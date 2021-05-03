import {React,Component} from 'react';
import ShowAllPets from './Pets/ShowAllPets';
import ShowMatches from './Pets/ShowMatches';
import NotificationsHomePage from './Notifications/NotificationsHomePage';
import axios from 'axios';
import { connect } from "react-redux";
import { NavLink, withRouter} from "react-router-dom";


class MainPage extends Component {
    constructor(props){
        super(props);
        this.state={
            tab_selected:"showAllPets",
            users:[],
        }
        
    }
    componentDidMount(){
        axios.get('http://localhost:8000/api/getAllUsers')
        .then((response)=>{
            this.setState({users:response.data.result});
        },(error)=>{
            console.log(error);
        });  
    }
    ChangeTab = (id, value) =>{
        switch (id) {
            case 0:
                this.setState({tab_selected:"showAllPets"});
               // this.props.history.push('/showAllPets');
                break;
            case 1:
                this.setState({tab_selected:"showMatches"});
               // this.props.history.push('/showMatches');
                break;
            default:
                this.setState({tab_selected:"notifications"});
               // this.props.history.push('/notifications');
                break;
        }
        console.log(this.state.tab_selected);
      
    }
 render(){
     return(
        <nav>
        <div class="nav-wrapper">
          <a href="/" class="brand-logo right">Logo</a>
          <ul id="nav-mobile" class="left hide-on-med-and-down" >
            <li  value="1" onClick={this.ChangeTab.bind(this,0)}><NavLink to='/showAllPets'>List of all Pets</NavLink></li>
            <li  value="2" onClick={this.ChangeTab.bind(this,1)}><NavLink to='/showMatches'>Find your match</NavLink></li>
            <li  value="3" onClick={this.ChangeTab.bind(this,2)}><NavLink to='/notifications'>Notifications</NavLink></li>
          </ul>
        </div>
      </nav>
     )
 }
  }

export default MainPage;