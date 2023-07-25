import { Component, OnInit } from '@angular/core';
import { CharacterCard } from './characterCard';
import { forkJoin } from 'rxjs';
import { APIService } from '../APIService/api.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css']
})
export class CharacterCardComponent implements OnInit {
  initialNumber = 1;
  initialNumberSearch = 1;
  isInputSearched: String = '';

  characterCard: CharacterCard = {
    id: 0,
    imgUrl: '',
    name: '',
    status: '',
    species: '',

  }
  characters: any[] = [

  ]

  apiCallData : any;

  constructor(private apiService: APIService) { }

  apiCall(initialNumber: number) {
    var requests = [];

    for (let i = initialNumber; i <= initialNumber + 9; i++) {
      requests.push(this.apiService.getPersonaje(i));
    }
  
    forkJoin(requests).subscribe(responses => {
      responses.forEach((data, index) => {
        let characterCard: CharacterCard = {
          id: data.id,
          imgUrl: data.image,
          name: data.name,
          status: data.status,
          species: data.species,
        }
        this.characters[index] = characterCard;
      });
    });

  }

  apiCallSearch() {
      var requests = [];
      for (let i = 0; this.apiCallData.results.length >=9 ? i <=  9 : i <=  this.apiCallData.results.length-1 ; this.apiCallData.results[i++].id) {
          requests.push(this.apiService.getPersonaje(this.apiCallData.results[i].id));
        }
      
        forkJoin(requests).subscribe(responses => {
          responses.forEach((data, index) => {
            let characterCard: CharacterCard = {
              id: data.id,
              imgUrl: data.image,
              name: data.name,
              status: data.status,
              species: data.species,
            }
            if (this.apiCallData.results.length < 9 ) {
              for (let i = this.apiCallData.results.length; i <= 9 ; i++) {
                this.characters[i] = null;
              }
            }
            
            this.characters[index] = characterCard;
            
          });
          console.log(this.characters);
        });

  }

  beforePage() {
    if(this.initialNumber !== 1 ) {
      this.apiCall(this.initialNumber-=9);
    }
  }

  beforePageSearch() {
    if(this.initialNumberSearch !== 1 ) {
      this.inputSearched(this.initialNumberSearch-=1);
    }
  }

  nextPage() {
      this.apiCall(this.initialNumber+=9);
    
  }

  nextPageSearch() {
    if(this.initialNumberSearch !== this.apiCallData.info.pages) {
      this.inputSearched(this.initialNumberSearch+=1);
    }
  }
  
  inputSearched(page:number) {      

    // metodo para recibir los dos parametros ( booleano i nombre personaje ) por array y guardar los valores a traves de las posiciones del array
    this.apiService.data$.subscribe((data) => {
      this.isInputSearched = data[0];
      var nameToSearch: string = data[1];
      
      if ( this.isInputSearched === 'true' ) {
        this.apiService.getPersonajePorNombre(nameToSearch,page).subscribe((data) => {
          this.apiCallData = data;
          this.apiCallSearch();
        
        });
        
      }

    });

  }

  ngOnInit() {
    
    this.apiCall(this.initialNumber);
    this.inputSearched(this.initialNumber);

  }

    
  }

  
