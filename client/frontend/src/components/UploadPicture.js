import { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";


export default class UploadPicture extends Component {
  constructor(props){
    super(props);
    this.state={
      selectedFile:null
    }
    this.fileChangedHandler=this.fileChangedHandler.bind(this);
    this.uploadHandler=this.uploadHandler.bind(this);
  }
  

  fileChangedHandler=(event)=>{
    const file = event.target.files[0];
    this.setState({ selectedFile: URL.createObjectURL(event.target.files[0]) })

  }
  uploadHandler=()=>{
    console.log(this.state.selectedFile)

  }
  
    render(){
      
  return (
    <div>
   <input type="file" left="200" onChange={this.fileChangedHandler}/>
   <button onClick={this.uploadHandler} left="200">Upload!</button>
   
  <img
    alt=""
    src={this.state.selectedFile}
    width="400"
    left="1000"
  />

    </div>
    

  );
    
    }
}


