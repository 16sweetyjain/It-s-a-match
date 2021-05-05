import {React,Component} from 'react';
import axios from 'axios';
import {Row,Col,Card,Icon,CardTitle} from 'react-materialize';
import { connect } from "react-redux";
import MainPage from '../MainPage';
import { NavLink, withRouter} from "react-router-dom";

 class ShowAllPets extends Component{
    constructor(props){
        super(props);
        this.state = {
            notification_status: "pending",
            sender_email:"",
            receiver_email:"",
        }
        this.onSendRequestHandler = this.onSendRequestHandler.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.viewProfileHandler = this.viewProfileHandler.bind(this);
    }
    componentDidMount(){ 
        this.setState({sender_email: this.props.email});
    }
    onSendRequestHandler = (e, userEmail, pet_name, image) =>{
      e.preventDefault();
      console.log(userEmail);
        this.setState({receiver_email: userEmail});
        this.sendRequest(pet_name, image);
    }
    sendRequest =(pet_name, image) => {
      const request = {
        sender_email: this.state.sender_email,
        receiver_email: this.state.receiver_email,
        notification_status: this.state.notification_status,
        pet_name:pet_name,
        image:image
    };
    console.log(request);
    axios.put('api/sendNotifications', request)
    .then((response)=>{
          console.log(response);
    },(error)=>{
          console.log(error);
    });
    }

    viewProfileHandler = (userEmail, pet_name, interests, dislikes, short_info, image) =>{
      const state_of_user = {
        pet_name:pet_name,
        userEmail:userEmail,
        short_info:short_info,
        dislikes:dislikes,
        interests:interests,
        image: image
      }
      this.props.history.push({
        pathname:'/viewProfile',
        state:state_of_user
      });
    }
    render(){
      let common_interests = [];
      let show_matches = [];
      let number_of_interests = 0;
      let my_logged_in_user = this.props.users.filter((user) => user.email === this.props.email);
      let other_users=this.props.users.filter(user=>user.email !== this.props.email);
      const my_pet_name = my_logged_in_user.map(user=>user.profile.pet_name);
      const my_pet_interests =  my_logged_in_user.map(user=>user.profile.interests.split(','));
      my_pet_interests.map(i=>{
         number_of_interests=i.length;
      });
      other_users.map((user)=>{
      const check_interests= user.profile.interests.split(',');
      const pet=user.profile.pet_name;
      my_pet_interests.map(i=>{
       common_interests=i.filter(x=>check_interests.indexOf(x)!=-1)
      });
      const percent_match=(common_interests.length/number_of_interests)*100;
        show_matches.push({'common_interests':percent_match,'user':user});
      });
      show_matches.sort(function compare(a,b){
      const pa=a.common_interests;
      const pb=b.common_interests;
      let comparison=0;
      if(pa>pb){
        comparison=-1;
      }
      else if(pa<pb){
        comparison=1
      }
      return comparison;
      });
        return(
          <div>
              <MainPage/>
              <div className='container'>
             <div >  
                {show_matches.map((match)=>{
                  const userEmail = match.user.email;
                  const pet_name = match.user.profile.pet_name;
                  const short_info = match.user.profile.short_description;
                  const interests = match.user.profile.interests;
                  const dislikes = match.user.profile.dislikes;
                  const image = match.user.profile.image_of_pet;
                    return(
                 
     <div class="row"  style={{
      display:"flex",
      justifyContent: "left",
      alignItems: "left"
    }}>
     <div class="col s7 m7" >
     <div class="card" >
                      <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src={`${image.substr(8)}`}/>
                      </div>
                      <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">{pet_name.toUpperCase()}<i class="material-icons right">more_vert</i></span>
                        <button onClick={ (e) =>this.viewProfileHandler( userEmail, pet_name, interests, dislikes, short_info, image )}>View Profile</button>
                      </div>
                      <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">Match Finder<i class="material-icons right">close</i></span>
                        <h3>{my_pet_name} matches {match.common_interests}% with {pet_name}</h3>
                        <button style={{
                  width: "200",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"onClick={ (e) =>this.onSendRequestHandler(e, userEmail, pet_name, image)}>Send Request</button>

                      </div>
                    </div>
  </div>
</div>
   
      )})}
      </div>    
</div> 
        </div>
                
        );
    }
}
const mapStateToProps= (state) => {
    const { userEmail } = state;
    return userEmail
};
export default withRouter(connect(mapStateToProps,null)(ShowAllPets));