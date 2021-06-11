import React, { Component }  from 'react';
import { withRouter } from 'react-router-dom';
import MainPage from './MainPage';
import Materialize from 'materialize-css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

class ArrangeMeet extends Component {
    constructor(props){
        super(props);
        this.state = {
            meetDate:'',
            meetTime:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.arrangeMeetHandler = this.arrangeMeetHandler.bind(this);   
        this.handleDate = this.handleDate.bind(this);
        this.handleTime = this.handleTime.bind(this);
        //refs
        this.meetdate = React.createRef();
        this.meettime = React.createRef();
    }

    componentDidMount() { 
        var context = this;
        var elemDate = document.querySelectorAll('.datepicker');
        Materialize.Datepicker.init(elemDate,{
            onClose:context.handleDate
        });
        var elemTime = document.querySelectorAll('.timepicker');
        Materialize.Timepicker.init(elemTime,{
            onCloseEnd:context.handleTime
        });
    }

    handleDate = () => {
        this.setState({ meetDate : this.meetdate.current.value });       
    }

    handleTime = () => {
        this.setState({
            meetTime : this.meettime.current.value
        });
    }
    handleChange = e => {
        this.setState({ [e.target.id] : e.target.value });
    }

    arrangeMeetHandler = (e) => {
        e.preventDefault();
        const { senderEmail, receiverEmail, meetRequestStatus, petName, image } = this.props.location.state;
        const request = {
            senderEmail:senderEmail,
            receiverEmail:receiverEmail,
            meetRequestStatus:meetRequestStatus,
            petName:petName,
            image:image,
            meetDate:this.state.meetDate,
            meetTime:this.state.meetTime
        };
        console.log(request);
        axios.put('api/sendMeetRequest',request)
            .then((response) => {
                console.log(response);
                toast.success('Meet Request sent', { position: toast.POSITION.BOTTOM_RIGHT , autoClose: 1000 });
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
        const { pet_name } = this.props.location.state;
        return(
            <div>
                <MainPage/>
                <div className='container'>
                    <div className ="row " >
                        <div className ='col' >
                            <div className='row' >
                                <div className='col s12' style = { { textAlign:'center' }}>
                                    <h3>Arrange a Meet with {pet_name}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <form className="col s12" autoComplete='off'>
                                <div className='row'>
                                    <div className="input-field col s12">
                                        <input  id ="meetDate" type='text' className='datepicker' value={this.state.meetDate} onChange={this.handleChange} ref={this.meetdate}/>
                                        <label>Pick a date</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="input-field col s12">
                                        <input id ="meetTime" type='text' className='timepicker' value = {this.state.meetTime} onChange={this.handleChange} ref={this.meettime} />
                                        <label>Pick a time</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12" style = { { textAlign:'center' }}>
                                        <button  className="btn btn-large btn-dark" onClick={ (e) => this.arrangeMeetHandler(e) }>Arrange a meet</button>
                                        <ToastContainer/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default withRouter(ArrangeMeet);