import {React,Component} from 'react';
import axios from 'axios';
import {Row,Col,Card,Icon,CardTitle} from 'react-materialize';
import { connect } from "react-redux";
import MainPage from '../MainPage';

class ShowMatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
        users:[],
    }
  }
  componentDidMount(){
    axios.get('http://localhost:8000/api/getAllUsers')
    .then((response)=>{
        this.setState({users:response.data.result});
    },(error)=>{
        console.log(error);
    });  
}
  render() {
      console.log(this.props.email)
    let common_interests = [];
    let show_matches = [];
    let number_of_interests = 0;
    let my_logged_in_user = this.state.users.filter((user) => user.email === this.props.email);
    let other_users=this.state.users.filter(user=>user.email !== this.props.email);
    const my_pet_name = my_logged_in_user.map(user=>user.profile.pet_name);
    const my_pet_interests =  my_logged_in_user.map(user=>user.profile.interests.split(','));
    my_pet_interests.map(i=>{
            number_of_interests=i.length;
        })      
      other_users.map((user)=>{
         const check_interests= user.profile.interests.split(',');
         const pet=user.profile.pet_name;
         my_pet_interests.map(i=>{
            common_interests=i.filter(x=>check_interests.indexOf(x)!=-1)
         })
         const percent_match=(common_interests.length/number_of_interests)*100;
         show_matches.push({'common_interests':percent_match,'user':user});
      });
      show_matches.sort(function compare(a,b){
        const pa=a.common_interests;
        const pb=b.common_interests;
        let comparison=0;
        if(pa>pb){
            comparison=-1;
        }
        else if(pa<pb){
            comparison=1
        }
        return comparison;
    });

        return(
            <div>
                <MainPage/>
                <div>
                <h1>List of Matches for your pet</h1>
                </div>
                {show_matches.map((it)=>{
                    return(
                <div>
                    <Row>
                        <Col m={6} s={12}>
                            <Card actions={[ <a key="1" href="#">View Profile</a> ]} closeIcon={<Icon>close</Icon>}
                            header={<CardTitle image={`http://localhost:8000/${it.user.profile.image_of_pet.substr(8)}`}>{it.user.profile.pet_name}</CardTitle>} 
                            revealIcon={<Icon>more_vert</Icon>}
                            >
                                {it.common_interests}% match
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

export default connect(mapStateToProps)(ShowMatches);