import {React,Component} from 'react';
import { connect } from "react-redux";


 class ShowMatches extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <div>
                {this.props.email}
            </div>

        );
    }
}
const mapStateToProps=state=>({
    ...state
})
export default connect(mapStateToProps)(ShowMatches);