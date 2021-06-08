import { React, Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import MainPage from '../MainPage';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ShowAllPets extends Component{
    constructor(props){
        super(props);
        this.state = {
            notificationStatus: 'pending',
            senderEmail:'',
            receiverEmail:'',
            users:[]
        };
        this.onSendRequestHandler = this.onSendRequestHandler.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.viewProfileHandler = this.viewProfileHandler.bind(this);
    }

    componentDidMount(){ 
        this.setState({ senderEmail: this.props.email });
        axios.get('api/getAllUsers')
            .then((response) => {
                this.setState({ users:response.data.result });
            },(error) => {
                console.log(error);
            });  
    }

    onSendRequestHandler = (e, userEmail, senderPetName, senderPetImage) => {
        e.preventDefault();
        console.log(userEmail);
        this.setState({ receiverEmail: userEmail },() => this.sendRequest(senderPetName, senderPetImage));   
    }

    sendRequest = (senderPetName, senderPetImage) => {
        const request = {
            senderEmail: this.state.senderEmail,
            receiverEmail: this.state.receiverEmail,
            notificationStatus: this.state.notificationStatus,
            petName:senderPetName, 
            image:senderPetImage
        };
        console.log(request);
        axios.put('api/sendNotifications', request)
            .then((response) => {
                console.log(response);
            },(error) => {
                console.log(error);
            });
        toast.success('Request sent', { position: toast.POSITION.BOTTOM_RIGHT , autoClose: 1000 } );
    }

    viewProfileHandler = (e, userEmail, petName, interests, dislikes, shortInfo, image) => {
        e.preventDefault();
        const stateOfUser = {
            petName:petName,
            userEmail:userEmail,
            shortInfo:shortInfo,
            dislikes:dislikes,
            interests:interests,
            image: image
        };
        console.log(stateOfUser);
        this.props.history.push({
            pathname:'/viewProfile',
            state:stateOfUser
        });
    }

    render(){
        let commonInterests = [];
        const showMatches = [];
        let numberOfInterests = 0;
        let senderPetName = '';
        let senderPetImage = '';
        const myLoggedInUser = this.state.users.filter((user) => user.email === this.props.email);
        myLoggedInUser.map((user) => {
            senderPetName = user.profile.pet_name;
            senderPetImage = user.profile.image_of_pet;
        }); 
        const otherUsers = this.state.users.filter(user => user.email !== this.props.email);
        const myPetInterests =  myLoggedInUser.map(user => user.profile.interests.split(','));
        myPetInterests.map(i => {
            numberOfInterests = i.length;
        });
        otherUsers.map((user) => {
            const checkInterests = user.profile.interests.split(',');
            myPetInterests.map(i => {
                commonInterests = i.filter(x => checkInterests.indexOf(x) != -1);
            });
            const percentMatch = (commonInterests.length / numberOfInterests) * 100;
            showMatches.push({ 'common_interests': percentMatch,'user': user });
        });
        showMatches.sort(function compare(a,b) {
            const pa = a.common_interests;
            const pb = b.common_interests;
            let comparison = 0;
            if(pa > pb){
                comparison = -1;
            }
            else if(pa < pb){
                comparison = 1;
            }
            return comparison;
        });
        return(
            <div>
                <MainPage/>
                <div className='container'>
                    <div className="row" >  
                        {showMatches.map((match) => {
                            const userEmail = match.user.email;
                            const petName = match.user.profile.pet_name;
                            const shortInfo = match.user.profile.short_description;
                            const interests = match.user.profile.interests;
                            const dislikes = match.user.profile.dislikes;
                            const image = match.user.profile.image_of_pet;
                            return(
                                <div  key = {petName}className="col s6" style= {{ textAlign: 'center' }} >
                                    <div className="card large" >
                                        <div>
                                            <img  style = { { height : '350px', width: '350px' } } className="activator circle" src={ `${ image.substr(8) }` }/>
                                        </div>
                                        <div className="card-content ">
                                            <span className="card-title activator grey-text text-darken-4"><h5><b>{petName.toUpperCase()}</b></h5><i className="material-icons right">more_vert</i></span>
                                            <div style = {{  textAlign:'center' }}><button style={ { width: '200', borderRadius: '3px', letterSpacing: '1.5px' } } className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={ (e) => this.viewProfileHandler( e, userEmail, petName, interests, dislikes, shortInfo, image ) }>View Profile</button></div>
                                        </div>
                                        <div className="card-reveal ">
                                            <span className="card-title grey-text text-darken-4"><h2><b>Match Finder</b></h2><i className="material-icons right">close</i></span>
                                            <h3>{senderPetName} matches {match.common_interests}% with {petName}</h3>
                                            <button style={ { width: '200', borderRadius: '3px', letterSpacing: '1.5px' } } className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={ (e) => this.onSendRequestHandler(e, userEmail, senderPetName, senderPetImage) }>Send Request</button>
                                            <ToastContainer />
                                        </div>
                                    </div>
                                </div>
                            );})}
                    </div>    
                </div> 
            </div>       
        );
    }
}
const mapStateToProps = (state) => {
    const { userEmail } = state;
    return userEmail;
};
export default withRouter(connect(mapStateToProps,null)(ShowAllPets));