import {React,Component} from 'react';
import ShowAllPets from './Pets/ShowAllPets';
import ShowMatches from './Pets/ShowMatches';
import NotificationsHomePage from './Notifications/NotificationsHomePage';
import axios from 'axios';
import { connect } from "react-redux";


class MainPage extends Component {
    constructor(props){
        super(props);
        this.state={
            tab_selected:'showAllPets',
            users:[],
            email:"harak@gmail.com"
        }
        this.onChangeTab= this.onChangeTab.bind(this);
    }
    componentDidMount(){
        axios.get('http://localhost:8000/api/getAllUsers')
        .then((response)=>{
            this.setState({users:response.data.result});
        },(error)=>{
            console.log(error);
        });  
    }
    onChangeTab = e =>{
        const id = e.currentTarget.dataset.id;
        console.log(id); 
        switch (id) {
            case "1":
                this.setState({tab_selected:"showAllPets"});
                break;
            case "2":
                this.setState({tab_selected:"showMatches"});
                break;
            default:
                this.setState({tab_selected:"notifications"});
                break;
        }
      
    }
 render(){
    let my_logged_in_user = this.state.users.filter((user) => user.email === this.state.email);
    let other_users=this.state.users.filter(user=>user.email !== this.state.email);
     return(
        <nav>
        <div class="nav-wrapper">
          <a href="#" class="brand-logo right">Logo</a>
          <ul id="nav-mobile" class="left hide-on-med-and-down">
            <li onClick={(e)=>this.ChangeTab(e)} data-id="1"><a href="/showAllPets">List of all Pets</a></li>
            <li  onClick={(e)=>this.ChangeTab(e)} data-id="2"><a href="/showMatches">Find your match</a></li>
            <li onClick={(e)=>this.ChangeTab(e)} data-id="3"><a href="/notifications">Notifications</a></li>
          </ul>
        </div>
        {this.state.tab_selected=="showAllPets"?
        <ShowAllPets my_logged_in_user={my_logged_in_user} other_users={other_users}/>:this.state.tab_selected=="showMatches"?<ShowMatches my_logged_in_user={my_logged_in_user} other_users={other_users}/>:<NotificationsHomePage my_logged_in_user={my_logged_in_user} other_users={other_users}/>}
      </nav>
     )
 }
  }
  const mapStateToProps= (state) => {
    const { userEmail } = state;
    return userEmail
};

export default connect(mapStateToProps)(MainPage);