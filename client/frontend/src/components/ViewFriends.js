import React, { Component }  from 'react';
import { connect } from 'react-redux';
import MainPage from './MainPage';
import { withRouter } from 'react-router-dom';
import NoFriends from './NoFriends';

class ViewFriends extends Component{
    constructor(props){
        super(props);
        this.viewProfileHandler = this.viewProfileHandler.bind(this);
    }
  
    viewProfileHandler = (userEmail, petName, interests, dislikes, shortInfo, image) => {
        const stateOfUser = {
            petName:petName,
            userEmail:userEmail,
            shortInfo:shortInfo,
            dislikes:dislikes,
            interests:interests,
            image: image
        };
        this.props.history.push({
            pathname:'/viewProfile',
            state:stateOfUser
        });
    }
    render(){
        const friends = this.props.location.state.friends;
        return(
            <div>
                <MainPage/>
                <div className ='container'>
                    {friends.length == 0 ? <NoFriends/> :
                        <div className="row">
                            {friends.map((friend) => {
                                const userEmail = friend.email;
                                const petName = friend.profile.pet_name;
                                const shortInfo = friend.profile.short_description;
                                const interests = friend.profile.interests;
                                const dislikes = friend.profile.dislikes;
                                const image = friend.profile.image_of_pet;
                                return(
                                    <div  key={ petName } className = "col s6" style={ { textAlign:'center' } }>
                                        <div className="card" >
                                            <div >
                                                <img  style = { { height : '350px', width: '350px' } } className="activator" src={ `${ image.substr(8) }` }/>
                                            </div>
                                            <div className="card-content">
                                                <span className="card-title activator grey-text text-darken-4"><h5><b>{petName.toUpperCase()} </b></h5>
                                                    <div style = {{  textAlign:'center' }}>
                                                        <button style={ { width: '200', borderRadius: '3px', letterSpacing: '1.5px' } } className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={ () => this.viewProfileHandler( userEmail, petName, interests, dislikes, shortInfo, image ) }>
                                                            View Profile
                                                        </button>
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );})}
                        </div>
                    }
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { userEmail } = state;
    return userEmail;
};

export default withRouter(connect(mapStateToProps,null)(ViewFriends));