import { Component } from '@angular/core';
import { Navbar } from './navbar';
import { APIService } from '../APIService/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  data: any;
  
  constructor(private apiService: APIService) { }

    navbar: Navbar = {
    iconUrl: '../assets/imgs/logo.png',
    name: 'Rick&Morty',
    searchInput: '',
    searched: false
    }



  sendInput() {
    var name:string = document.forms[0]['searchBar'].value; // recojo el valor del input searchbar en el form dentro de document(html)
    this.navbar.searched = true;

    // aqui guardo los dos datos que enviare en un array de datos
    this.navbar.searched + "";
    var data = [this.navbar.searched + "", name];

    // en la linea de abajo enviamos el booleano en true al componente characterCard i el nombre escrito en el
    this.apiService.sendDataToOtherComponents(data);


  }




}
