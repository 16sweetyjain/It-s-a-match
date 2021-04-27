import {React,Component} from 'react';
import axios from 'axios';

export default class ShowAllPets extends Component{
    constructor(props){
        super(props);
      
            this.state={
                profile:[]
              }

       
    }
    componentDidMount(){
        axios.get('http://localhost:8000/api/getAllPets')
        .then((response)=>{
            console.log(response.data.result);
            this.setState({profile:response.data.result});
        },(error)=>{
            console.log(error);
        });

    }
    render(){
        return(
            <div>

            </div>
        );
    }
}