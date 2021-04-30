import {React,Component} from 'react';
import ShowAllPets from './Pets/ShowAllPets';


export default class MainPage extends Component {
 render(){
     return(
        <nav>
        <div class="nav-wrapper">
          <a href="#" class="brand-logo right">Logo</a>
          <ul id="nav-mobile" class="left hide-on-med-and-down">
            <li><a href="/showAllPets">List of all Pets</a></li>
            <li><a href="/showMatches">Find your match</a></li>
            <li><a href="/notifications">Notifications</a></li>
          </ul>
        </div>
        <ShowAllPets/>
      </nav>
     )
 }
  }