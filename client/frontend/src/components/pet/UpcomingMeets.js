import React, { Component }  from 'react'; 
import { connect } from 'react-redux';
import MainPage from './MainPage';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import NoFriends from './NoFriends';

class UpcomingMeets extends Component{
    constructor(props){
        super(props);
        this.state = {
            users:[],
        };
    }

    componentDidMount(){
        axios.get('api/getAllUsers')
            .then((response) => {
                console.log(response);
                this.setState({ users:response.data.result });
            },(error) => {
                console.log(error);
            });  
    }
  
    render(){
        let meets = [];
        const myLoggedInUser = this.state.users.filter((user) => user.email === this.props.email);
        myLoggedInUser.forEach((user) => {
            meets = user.meets;
        });
        const acceptedRequests = meets.filter(meet => meet.meetRequestStatus === 'accepted');
        console.log(acceptedRequests);
        return(
            <div>
                <MainPage/>
                <div className ='container'>
                    {acceptedRequests.length == 0 ? <NoFriends/> :
                        <div>
                            {acceptedRequests.map((meet) => {
                                const petName = meet.pet_name;
                                const image = meet.image;
                                const meetDate = meet.meetDate;
                                const meetTime = meet.meetTime;
                                return(
                                    <div  key={ petName } className="col s12 m8 offset-m2 l6 offset-l3">
                                        <div className="card-panel grey lighten-5 z-depth-1">
                                            <div className="row valign-wrapper">
                                                <div className="col s2">
                                                    <img className = "circle" src={ `${ image.substr(8) }` } style={ { height:100,width:100 } }/> 
                                                </div>
                                                <div className="col s12">
                                                    <span className="black-text">
                                                        <h4>You have an upcoming meet with {petName} on {meetDate} at {meetTime} </h4>
                                                    </span>
                                                </div>
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

export default withRouter(connect(mapStateToProps,null)(UpcomingMeets));