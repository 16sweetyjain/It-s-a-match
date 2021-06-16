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
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.imageUploadHandler = this.imageUploadHandler.bind(this);
    }
  
  handleChange = e => {
      e.preventDefault();
      this.setState({ [e.target.id]:e.target.value });
  }

  imageUploadHandler = e => {
      e.preventDefault();
      const file = e.target.files[0];
      this.setState({ imageOfPetPreview: URL.createObjectURL(file) , imageOfPetFile:file });
      this.setState({ email: this.props.email });
  }

  handleSubmit = ( e ) => {
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
          <div className='container'>
              <div className="row"   style = { { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
                  <form className="col">
                      <div className="row">
                          <div className="input-field col s12 black-text" style = { { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
                              <h3> Create your pet&apos;s profile </h3>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12 black-text">
                              <i className="material-icons prefix">pets</i>
                              <input id="petName" type="text" className="validate" value={ this.state.petName } onChange={this.handleChange}/>
                              <label > Name of your pet</label>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12 black-text">
                              <i className="material-icons prefix">thumb_up</i>
                              <input id="interests" type="text" className="validate" value={ this.state.interests } onChange={this.handleChange}/>
                              <label> Interests (separate by commas)</label>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12 black-text">
                              <i className="material-icons prefix">thumb_down</i>
                              <input id="dislikes" type="text" className="validate" value={ this.state.dislikes } onChange={this.handleChange}/>
                              <label > Dislikes</label>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12 black-text">
                              <i className="material-icons prefix">mode_edit</i>
                              <textarea id="shortDescription" className="materialize-textarea" onChange={this.handleChange}></textarea>
                              <label >Write short info of your pet</label>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12 black-text">
                              <i className="material-icons prefix">upload</i>
                              <input id="imageOfPet" type="file" left="200" onChange={this.imageUploadHandler}/>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12 black-text" style={ { textAlign:'center' }}>
                              <img style ={{ textAlign:'center' }} alt="" src={ this.state.imageOfPetPreview } width="400" left="1000"/>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12 black-text" style={{ textAlign:'center' }}>
                              <button className="btn btn-large btn-dark" onClick={this.handleSubmit}>
                          Create Profile
                              </button>
                              <ToastContainer/>
                          </div>
                      </div>
                  </form>
              </div>
          </div>

      );
  }
}
const mapStateToProps = (state) => {
    const { userEmail } = state;
    return userEmail;
};

export default withRouter(connect(mapStateToProps,null)(CreateProfile));
