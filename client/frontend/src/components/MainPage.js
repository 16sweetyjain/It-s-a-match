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
   /* const name = my_logged_in_user.map(user=>user.name);
   console.log(my_logged_in_user)
    let names=name.split(' ');
    let initials=names[0].substring(0,1).toUpperCase();
     if(names.length>1){
         initials+= names[names.length-1].substring(0,1).toUpperCase();
     }*/

     return(
        <nav>
        <div class="nav-wrapper">
            
        <a href="/" class="brand-logo right"><i class="material-icons prefix">account_circle</i>AJ</a>
          <ul id="nav-mobile" class="left hide-on-med-and-down" >
            <li  value="1"><NavLink to='/showAllPets'>List of all Pets</NavLink></li>
            <li  value="2" ><NavLink to='/viewRequests'>View Requests</NavLink></li>
            <li  value="3"><NavLink to='/notifications'>Notifications</NavLink></li>
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