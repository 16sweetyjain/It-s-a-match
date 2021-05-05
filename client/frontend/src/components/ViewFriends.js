import { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import MainPage from './MainPage';
import { NavLink, withRouter} from "react-router-dom";

class ViewFriends extends Component{
    constructor(props){
        super(props);
        this.viewProfileHandler = this.viewProfileHandler.bind(this);
    }
    viewProfileHandler = (userEmail, pet_name, interests, dislikes, short_info, image) => {
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
        let notifications=[];
        let pending_requests=[] ;
        let my_logged_in_user;
        let all_pets=[];let friends=[];
        let other_users=this.props.users.filter(user=>user.email !== this.props.email);
        my_logged_in_user = this.props.users.filter((user) => user.email === this.props.email);
        my_logged_in_user.forEach((user)=>{
            notifications = user.notifications;
        })
       let accepted_requests = notifications.filter(notif=>notif.notification_status==="accepted");
       accepted_requests.map(r=>all_pets.push(r.user_email));
       other_users.map(user=>{
           const c=user.email;
           if(all_pets.includes(c)){
            friends.push(user);
           }
       })
       console.log(friends);
        return(
            <div>
                <MainPage/>
                <div className ='container'>
            <div>
            {friends.map((friend)=>{
                  const userEmail = friend.email;
                  const pet_name = friend.profile.pet_name;
                  const short_info = friend.profile.short_description;
                  const interests = friend.profile.interests;
                  const dislikes = friend.profile.dislikes;
                  const image = friend.profile.image_of_pet;
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
                        <span class="card-title activator grey-text text-darken-4">{pet_name.toUpperCase()} 
                           <button onClick={ (e) =>this.viewProfileHandler( userEmail, pet_name, interests, dislikes, short_info, image )}>
                               View Profile
                            </button>
                        </span>
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

export default withRouter(connect(mapStateToProps,null)(ViewFriends));