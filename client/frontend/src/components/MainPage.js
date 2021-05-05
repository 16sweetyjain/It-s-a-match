import {React,Component} from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import auth from './Auth';

class MainPage extends Component {
    constructor(props){
        super(props); 
        this.state = {
            users:[]
          }
    }

    componentDidMount(){
        axios.get('api/getAllUsers')
        .then((response)=>{
            this.setState({users:response.data.result});
        },(error)=>{
            console.log(error);
        });  
    }
    
 render(){
    let my_logged_in_user = this.state.users.filter((user) => user.email === this.props.email);
    const name = my_logged_in_user.map(user=>user.profile.pet_name);
    console.log(my_logged_in_user)
   
     return(
        <nav>
        <div class="nav-wrapper">
            
        <a href="/" class="brand-logo left">Welcome, {name}</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down" >
            <li  value="1"><NavLink to='/showAllPets'>List of Pets</NavLink></li>
            <li  value="2" ><NavLink to='/viewRequests'>View Requests</NavLink></li>
            <li  value="3"><NavLink to='/viewFriends'>Friends</NavLink></li>
            <li  value="4" ><NavLink to='/signout'>Logout</NavLink></li>
          </ul>
          
        </div>
      </nav>
     )
 }
  }
  const mapStateToProps= (state) => {
    const { userEmail } = state;
    return userEmail
};
export default connect(mapStateToProps,null)(MainPage);