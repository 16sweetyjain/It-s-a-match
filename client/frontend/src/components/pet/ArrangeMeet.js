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
        console.log(this.state.meetDate);       
    }

    handleTime = () => {
        this.setState({
            meetTime : this.meettime.current.value
        });
        console.log(this.state.meetTime);
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
        axios.put('/sendMeetRequest',request)
            .then((response) => {
                console.log(response);
                toast.success('Meet Request sent', { position: toast.POSITION.BOTTOM_RIGHT , autoClose: 1000 });
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(this.state.meetDate);
        console.log(this.state.meetTime);
    }

    render(){
        const { petName } = this.props.location.state;
        return(
            <div>
                <MainPage/>
                <div className='container'>
                    <div className ="row " >
                        <div className ='col'>
                            <div className='row' >
                                <div className='col s12' style = { { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
                                    <h3>Arrange a Meet with {petName}</h3>
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
                                    <div className="input-field col s12">
                                        <button style={ { width: '200', borderRadius: '3px', letterSpacing: '1.5px' } } className="btn btn-large waves-effect waves-light hoverable blue accent-3"onClick={ (e) => this.arrangeMeetHandler(e) }>Arrange a meet</button>
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