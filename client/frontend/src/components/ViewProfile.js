import {Component} from 'react';
import MainPage from './MainPage';

export default class ViewProfile extends Component{
    constructor(props){
        super(props);
        this.onClick=this.onClick.bind(this);
    }
    onClick=()=>{
        console.log('err')

    }
    render(){
        console.log(this.props.location.state.image)
        const pet_name = this.props.location.state.pet_name;
        const image = this.props.location.state.image;
        const dislikes = this.props.location.state.dislikes;
        const interests=this.props.location.state.interests;
        const short_info=this.props.location.state.short_info;
      
        
        return (
            <div>
                <MainPage/>
                
                    <div className ="row">
                    <div class="col s6" style={{
      display:"flex",
      justifyContent: "center",
      alignItems: "center"
    }}   >
                      <img class="activator" src={`http://localhost:8000/${image.substr(8)}`}/>
                      </div>
                      <div class="col s6"   >
                     <h2>Pet name :{pet_name}</h2>
                     <h5>Interests: {interests}</h5>
                     <h5>Dislikes: {dislikes}</h5>
                     <h5>Short_Description : {short_info}</h5>
                     <button style={{
                  width: "200",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"onClick={this.onClick}>Arrange a meet</button>
                        </div>
                        </div>
</div>

                
        )
    }
}