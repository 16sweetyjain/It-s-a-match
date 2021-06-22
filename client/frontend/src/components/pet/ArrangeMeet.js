import React, { useRef,useState,useEffect }  from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Materialize from 'materialize-css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../Navbar';
import HomeNavbar from './HomeNavbar';


export default function ArrangeMeet() {

    const history = useHistory();
    const location = useLocation();
    const [ meetDate, setmeetDate] = useState('');
    const [ meetTime, setmeetTime] = useState('');
    const meetdate = useRef();
    const meettime = useRef();
    const { pet_name } = location.state;
    const [meetPlace, selectMeetPlace] = useState('');

    useEffect(() => {
        //var context = this;
        var elemDate = document.querySelectorAll('.datepicker');
        Materialize.Datepicker.init(elemDate,{
            onClose:handleDate
        });
        var elemTime = document.querySelectorAll('.timepicker');
        Materialize.Timepicker.init(elemTime,{
            onCloseEnd:handleTime
        });
        var elemPlace = document.querySelectorAll('select');
        Materialize.FormSelect.init(elemPlace, {

        });
    },[]);

    const handleDate = () => {
        setmeetDate(meetdate.current.value);       
    };

    const handleTime = () => {
        setmeetTime(meettime.current.value);
    };

    const handleChangeTime = e => {
        setmeetTime(e.target.value);
    };

    const handleChangeDate = e => {
        setmeetDate(e.target.value);
    };

    const arrangeMeetHandler = (e) => {
        e.preventDefault();
        const { senderEmail, receiverEmail, meetRequestStatus, image, name } = location.state;
        const request = {
            senderEmail:senderEmail,
            receiverEmail:receiverEmail,
            meetRequestStatus:meetRequestStatus,
            pet_name:name,
            image:image,
            meetDate:meetDate,
            meetTime:meetTime,
            meetPlace:meetPlace
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
    };

    const meetPlaceChange = (e) => {
        selectMeetPlace(e.target.value);
    };

    console.log(meetPlace);

    return(
        <div>
            <Navbar/>
            <HomeNavbar/>
            <i className=" medium material-icons" onClick={() => history.goBack()}>arrow_back</i>
            <div className='container'  style = { { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
                <div className ="row " >
                    <div className ='col'>
                        <div className='row' >
                            <div className='col s12'>
                                <h3>Arrange a Meet with {pet_name}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <form className="col s12" autoComplete='off'>
                            <div className='row'>
                                <div className="input-field col s12">
                                    <input  id ="meetDate" type='text' className='datepicker' value={meetDate} onChange={handleChangeDate} ref={meetdate}/>
                                    <label>Pick a date</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="input-field col s12">
                                    <input id ="meetTime" type='text' className='timepicker' value = {meetTime} onChange={handleChangeTime} ref={meettime} />
                                    <label>Pick a time</label>
                                </div>
                            </div>
                            <div className='row'>
                                <dic className='col s12'>
                                    <select onChange = {meetPlaceChange} value = {meetPlace}>
                                        <option value ='' disabled selected>Pick a place</option>
                                        <option value='PMC Park'>PMC Park</option>
                                        <option value ='Ronnie Pethouse'>Ronnie Pethouse</option>
                                        <option value = 'Govind Raja Park'>Govind Raja Park</option>
                                        <label>Pick a place</label>
                                    </select>
                                </dic>
                            </div>
                            <div className="row">
                                <div className="input-field col s12" style = { { textAlign:'center' }}>
                                    <button  className="btn btn-large btn-dark" onClick={ (e) => arrangeMeetHandler(e) }>Arrange a meet</button>
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