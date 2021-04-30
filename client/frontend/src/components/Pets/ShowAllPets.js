import {React,Component} from 'react';
import axios from 'axios';
import {Row,Col,Card,Icon,CardTitle} from 'react-materialize';
import {Link} from "react-router-dom";

export default class ShowAllPets extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let my_logged_in_user = this.props.my_logged_in_user;
        let other_users=this.props.other_users;
 
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