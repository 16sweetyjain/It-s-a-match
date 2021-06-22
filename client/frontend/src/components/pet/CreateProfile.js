import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

export default function CreateProfile() {

    const history = useHistory();
    const userEmail = useSelector( state => state.userEmail.email);
    const [ petProfile, setPetProfile] = useState({
        petName:'',
        interests:'',
        dislikes:'',
        shortDescription:'',
    });
    const [ imageOfPetPreview, imagePreviewHandler ] = useState('');
    const [ imageOfPetFile, imageHandler ] = useState('');
  
    const handleChange = e => {
        e.preventDefault();
        setPetProfile({ ...petProfile, [e.target.id]:e.target.value });
    };

    const imageUploadHandler = e => {
        e.preventDefault();
        const file = e.target.files[0];
        imagePreviewHandler(URL.createObjectURL(file));
        imageHandler(file);
    };
 
    const handleSubmit =  e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image_of_pet',imageOfPetFile);
        formData.append('pet_name',petProfile.petName);
        formData.append('email',userEmail);
        formData.append('dislikes',petProfile.dislikes);
        formData.append('interests',petProfile.interests);
        formData.append('short_description',petProfile.shortDescription);
        axios.post('api/create',formData )
            .then((response) => {
                console.log(response);
                console.log('profile created');
                history.push('/main');
            })
            .catch(( error ) => {
                console.log(error.response.data.errors);
                let errorMessage = error.response.data.errors;
                errorMessage.map( e => {
                    toast.error(e.error,{ position: toast.POSITION.BOTTOM_RIGHT , autoClose: 1000 } );  
                });
            });
    };

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
                            <input id="petName" type="text" className="validate" value={ petProfile.petName } onChange={ handleChange }/>
                            <label > Name of your pet</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 black-text">
                            <i className="material-icons prefix">thumb_up</i>
                            <input id="interests" type="text" className="validate" value={ petProfile.interests }  onChange={ handleChange }/>
                            <label> Interests (separate by commas)</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 black-text">
                            <i className="material-icons prefix">thumb_down</i>
                            <input id="dislikes" type="text" className="validate" value={ petProfile.dislikes }  onChange={ handleChange }/>
                            <label > Dislikes</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 black-text">
                            <i className="material-icons prefix">mode_edit</i>
                            <textarea id="shortDescription" className="materialize-textarea" value = {petProfile.shortDescription} onChange={handleChange}></textarea>
                            <label >Write short info of your pet</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 black-text">
                            <i className="material-icons prefix">upload</i>
                            <input id="imageOfPet" type="file" left="200" onChange={ imageUploadHandler }/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 black-text" style={ { textAlign:'center' }}>
                            <img style ={{ textAlign:'center' }} alt="" src={ imageOfPetPreview } width="400" left="1000"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 black-text" style={{ textAlign:'center' }}>
                            <button className="btn btn-large btn-dark" onClick={ handleSubmit }>
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
