import { React, Component } from "react";
import { BrowserRouter as Router, Route,Link,withRouter } from "react-router-dom";
import axios from 'axios';
import { connect } from "react-redux";
import auth from './Auth';

class CreateProfile extends Component {
  constructor(props){
    super(props);
    this.state={
      pet_name:"",
      interests:"",
      dislikes:"",
      short_description:"",
      image_of_pet_preview:null,
      image_of_pet_file:null,
      email:""
    }
    this.handleDescriptionChange=this.handleDescriptionChange.bind(this);
    this.handleDislikesChange=this.handleDislikesChange.bind(this);
    this.handleInterestsChange=this.handleInterestsChange.bind(this);
    this.handlePetNameChange=this.handlePetNameChange.bind(this);
    this.handleClick=this.handleClick.bind(this);
    this.imageUploadHandler=this.imageUploadHandler.bind(this);
  }
  
  handleDescriptionChange=e=>{
    this.setState({short_description:e.target.value});
  }
  handleDislikesChange=e=>{
    this.setState({dislikes:e.target.value});
  }
  handleInterestsChange=e=>{
    this.setState({interests:e.target.value});
  }
  handlePetNameChange=e=>{
    this.setState({pet_name:e.target.value});
  }
  imageUploadHandler=e=>{
     const file = e.target.files[0];
    this.setState({ image_of_pet_preview: URL.createObjectURL(file) , image_of_pet_file:file })
  }
  handleClick=e=>{
    this.setState({email: this.props.email})
    const formData = new FormData();
    formData.append('image_of_pet',this.state.image_of_pet_file);
    formData.append('pet_name',this.state.pet_name);
    formData.append('email',this.state.email);
    formData.append('dislikes',this.state.dislikes);
    formData.append('interests',this.state.interests);
    formData.append('short_description',this.state.short_description);

    const pet_profile = {
      email:this.props.email,
      profile:{
        pet_name:this.state.pet_name,
        interests:this.state.interests,
        dislikes:this.state.dislikes,
        short_description:this.state.short_description,
        image_of_pet:this.state.image_of_pet_file
      }
    }
    console.log('pet_profile:',pet_profile);
    axios.put('api/create',formData,{ headers: {'Content-type': 'multipart/form-data'}})
    .then((response)=>{
        console.log(response);
    },(error)=>{
        console.log(error);
    });
    console.log('profile created');
    this.props.history.push('/showAllPets');
  }

  render(){
    console.log(this.props.email)

  return (
    <div className="row"   style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <form class="col s6">
      <div className="row">
                <div className="input-field col s12">
          <h3>Create your pet's profile</h3>
                </div>
        </div>
        <div className="row">
                <div className="input-field col s12">
                <i class="material-icons prefix">pets</i>
                  <input id="name" type="text" className="validate" value={this.state.pet_name} onChange={e=>this.handlePetNameChange(e)}/>
                  <label for="name"> Name of your pet</label>
                </div>
        </div>
        <div className="row">
                <div className="input-field col s12">
                <i class="material-icons prefix">thumb_up</i>
                  <input id="name" type="text" className="validate" value={this.state.interests} onChange={e=>this.handleInterestsChange(e)}/>
                  <label for="name"> Interests</label>
                </div>
        </div>
        <div className="row">
                <div className="input-field col s12">
                <i class="material-icons prefix">thumb_down</i>
                  <input id="name" type="text" className="validate" value={this.state.dislikes} onChange={e=>this.handleDislikesChange(e)}/>
                  <label for="name"> Dislikes</label>
                </div>
        </div>
        <div class="row">
           <div class="input-field col s12">
           <i class="material-icons prefix">mode_edit</i>
            <textarea id="textarea1" class="materialize-textarea"></textarea>
            <label for="textarea1">Write short info of your pet</label>
           </div>
        </div>
        <div class="row">
           <div class="input-field col s12">
           <i class="material-icons prefix">upload</i>
           <input type="file" left="200" onChange={this.imageUploadHandler}/>
           <img alt="" src={this.state.image_of_pet_preview} width="400" left="1000"/>
           </div>
        </div>
        <div className="row">
                <div className="input-field col s12">
                <button style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={e => this.handleClick(e)}>
                  Create Profile
                  </button>
                </div>
              </div>
        </form>
    </div>

  );
    }
}
const mapStateToProps= (state) => {
  const { userEmail } = state;
  return userEmail
};

export default withRouter(connect(mapStateToProps)(CreateProfile));





