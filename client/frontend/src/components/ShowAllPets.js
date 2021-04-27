import {React,Component} from 'react';
import axios from 'axios';
import {Row,Col,Card,Icon,CardTitle} from 'react-materialize';

export default class ShowAllPets extends Component{
    constructor(props){
        super(props);
      
            this.state={
                profile:[],
              }

       
    }
    componentDidMount(){
        //console.log('start')
        axios.get('http://localhost:8000/api/getAllPets')
        .then((response)=>{
            console.log(response.data.result);
            this.setState({profile:response.data.result});
        },(error)=>{
            console.log(error);
        });
       // console.log(this.state.profile)
    }
    render(){
 
        return(
          <div>
              <div>
                  <h1>List of pets</h1>
              </div>
                {this.state.profile.map((profile)=>{
                    return(
                <div>
                    <Row>
                        <Col m={6} s={12}>
                            <Card actions={[ <a key="1" href="#">View Profile</a> ]} closeIcon={<Icon>close</Icon>}
                            header={<CardTitle image="https://materializecss.com/images/sample-1.jpg">{profile.profile.pet_name}</CardTitle>} 
                            revealIcon={<Icon>more_vert</Icon>}
                            >
                                {profile.profile.short_description}
                                </Card>
                                </Col>
                                </Row>
                </div>)
                })}
                
                </div>
                
        );
    }
}