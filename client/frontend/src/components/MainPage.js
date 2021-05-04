import {React,Component} from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";


class MainPage extends Component {
    constructor(props){
        super(props);
        this.state={
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
   
 render(){
    let my_logged_in_user = this.state.users.filter((user) => user.email === this.props.email);
    const name = my_logged_in_user.map(user=>user.profile.pet_name);
   
     return(
        <nav>
        <div class="nav-wrapper">
            
        <a href="/" class="brand-logo right"><i class="material-icons prefix">account_circle</i>Welcome,{name}</a>
          <ul id="nav-mobile" class="left hide-on-med-and-down" >
            <li  value="1"><NavLink to='/showAllPets'>List of Pets</NavLink></li>
            <li  value="2" ><NavLink to='/viewRequests'>View Requests</NavLink></li>
            <li  value="3"><NavLink to='/viewFriends'>Friends</NavLink></li>
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