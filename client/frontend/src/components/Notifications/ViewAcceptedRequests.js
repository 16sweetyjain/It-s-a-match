import { Component } from 'react';

export default class ViewAcceptedRequests extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let accepted_requests_users = this.props.accepted_requests_users;
        return(
            <div>
            <div>
            <h1>List of Matches for your pet</h1>
            </div>
            {accepted_requests_users.map((user) => {
                return(
            <div>
                <Row>
                    <Col m={6} s={12}>
                        <Card actions={[ <a key="1" href="#">View Profile</a> ]} closeIcon={<Icon>close</Icon>}
                        header={<CardTitle image={`http://localhost:8000/${it.user.profile.image_of_pet}`}>{user.profile.pet_name}</CardTitle>} 
                        revealIcon={<Icon>more_vert</Icon>}
                        >
                        </Card>
                    </Col>
                </Row>
            </div>)
            })}
      </div>
    );
    }
}
