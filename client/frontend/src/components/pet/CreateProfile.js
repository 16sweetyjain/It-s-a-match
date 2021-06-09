import { React, Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

class CreateProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            petName:'',
            interests:'',
            dislikes:'',
            shortDescription:'',
            imageOfPetPreview: null,
            imageOfPetFile: null,
            email:''
        };
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleDislikesChange = this.handleDislikesChange.bind(this);
        this.handleInterestsChange = this.handleInterestsChange.bind(this);
        this.handlePetNameChange = this.handlePetNameChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.imageUploadHandler = this.imageUploadHandler.bind(this);
    }
  
  handleDescriptionChange = e => {
      this.setState({ shortDescription:e.target.value });
  }

  handleDislikesChange = e => {
      this.setState({ dislikes:e.target.value });
  }

  handleInterestsChange= e => {
      this.setState({ interests:e.target.value });
  }

  handlePetNameChange= e => {
      this.setState({ petName:e.target.value });
  }

  imageUploadHandler= e => {
      e.preventDefault();
      const file = e.target.files[0];
      this.setState({ imageOfPetPreview: URL.createObjectURL(file) , imageOfPetFile:file });
      this.setState({ email: this.props.email });
  }

  handleClick = ( e ) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('image_of_pet',this.state.imageOfPetFile);
      formData.append('pet_name',this.state.petName);
      formData.append('email',this.state.email);
      formData.append('dislikes',this.state.dislikes);
      formData.append('interests',this.state.interests);
      formData.append('short_description',this.state.shortDescription);
      axios.post('api/create',formData )
          .then((response) => {
              console.log(response);
              console.log('profile created');
              this.props.history.push('/showAllPets');
          })
          .catch(( error ) => {
              console.log(error.response.data.errors);
              let errorMessage = error.response.data.errors;
              errorMessage.map( e => {
                  toast.error(e.error,{ position: toast.POSITION.BOTTOM_RIGHT , autoClose: 1000 } );  
              });
          });
  }

  render(){
      return (
          <div className="row"   style = { { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
              <form className="col s6">
                  <div className="row">
                      <div className="input-field col s12">
                          <h3> Create your pet&apos;s profile </h3>
                      </div>
                  </div>
                  <div className="row">
                      <div className="input-field col s12">
                          <i className="material-icons prefix">pets</i>
                          <input id="name" type="text" className="validate" value={ this.state.petName } onChange={ e => this.handlePetNameChange(e) }/>
                          <label > Name of your pet</label>
                      </div>
                  </div>
                  <div className="row">
                      <div className="input-field col s12">
                          <i className="material-icons prefix">thumb_up</i>
                          <input id="name" type="text" className="validate" value={ this.state.interests } onChange={ e => this.handleInterestsChange(e) }/>
                          <label> Interests</label>
                      </div>
                  </div>
                  <div className="row">
                      <div className="input-field col s12">
                          <i className="material-icons prefix">thumb_down</i>
                          <input id="name" type="text" className="validate" value={ this.state.dislikes } onChange={ e => this.handleDislikesChange(e) }/>
                          <label > Dislikes</label>
                      </div>
                  </div>
                  <div className="row">
                      <div className="input-field col s12">
                          <i className="material-icons prefix">mode_edit</i>
                          <textarea id="textarea1" className="materialize-textarea" onChange={ e => this.handleDescriptionChange(e)}></textarea>
                          <label >Write short info of your pet</label>
                      </div>
                  </div>
                  <div className="row">
                      <div className="input-field col s12">
                          <i className="material-icons prefix">upload</i>
                          <input type="file" left="200" onChange={ e => this.imageUploadHandler(e) }/>
                          <img alt="" src={ this.state.imageOfPetPreview } width="400" left="1000"/>
                      </div>
                  </div>
                  <div className="row">
                      <div className="input-field col s12">
                          <button style = { { width: '140px', borderRadius: '3px', letterSpacing: '1.5px' } }
                              className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={ (e) => this.handleClick(e) }>
                          Create Profile
                          </button>
                          <ToastContainer/>
                      </div>
                  </div>
              </form>
          </div>

      );
  }
}
const mapStateToProps = (state) => {
    const { userEmail } = state;
    return userEmail;
};

export default withRouter(connect(mapStateToProps,null)(CreateProfile));
