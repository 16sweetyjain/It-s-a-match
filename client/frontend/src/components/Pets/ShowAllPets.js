import {React,Component} from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import {Row,Col,Card,Icon,CardTitle} from 'react-materialize';
import {Link} from "react-router-dom";

class ShowAllPets extends Component{
    constructor(props){
        super(props);
      
        this.state = {
            users: [],
        }
    }
    componentDidMount(){
        //console.log('start')
        axios.get('http://localhost:8000/api/getAllUsers')
        .then((response)=>{
            //console.log(response.data);
            this.setState({users:response.data.result});
        },(error)=>{
            console.log(error);
        });
       
    }
    render(){
        let my_logged_in_user = this.state.users.filter((user) => user.email === this.props.email);
        let other_users=this.state.users.filter(user=>user.email !== this.props.email);
 
        return(
          <div>
              <div>
                  <h1>List of  all pets</h1>
              </div>
                {other_users.map((profile)=>{
                    return(
                <div>
                    <Row>
                        <Col m={6} s={12}>
                            <Card actions={[ <a key="1" href="#">View Profile</a> ]} closeIcon={<Icon>close</Icon>}
                            header={<CardTitle image={`http://localhost:8000/${profile.profile.image_of_pet}`}>{profile.profile.pet_name}</CardTitle>} 
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

const mapStateToProps= (state) => {
    const { userEmail } = state;
    return userEmail
};

export default connect(mapStateToProps)(ShowAllPets);