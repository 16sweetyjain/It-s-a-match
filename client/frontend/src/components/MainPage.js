import { React,Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class MainPage extends Component {
    constructor(props){
        super(props); 
        this.state = {
            users:[]
        };
    }

    componentDidMount(){
        axios.get('api/getAllUsers')
            .then((response) => {
                //  console.log(response);
                this.setState({ users:response.data.result });
            },(error) => {
                console.log(error);
            });  
    }
    
    render(){
        const myLoggedInUser = this.state.users.filter((user) => user.email === this.props.email);
        console.log(myLoggedInUser);
        const name = myLoggedInUser.map(user => user.profile.pet_name);
       
   
        return(
            <nav>
                <div className="nav-wrapper"> 
                    <a href="/" className="brand-logo left">Welcome, {name}</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down" >
                        <li  value="1"><NavLink to='/showAllPets'>List of Pets</NavLink></li>
                        <li  value="2" ><NavLink to='/viewRequests'>View Requests</NavLink></li>
                        <li  value="3"><NavLink to='/viewFriends'>Friends</NavLink></li>
                        <li  value="4" ><NavLink to='/signout'>Logout</NavLink></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    const { userEmail } = state;
    return userEmail;
};

export default connect(mapStateToProps,null)(MainPage);