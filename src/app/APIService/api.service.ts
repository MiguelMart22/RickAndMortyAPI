import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class APIService {
  rutaAPI = "https://rickandmortyapi.com";
  private dataSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public data$ = this.dataSubject.asObservable();

  

  constructor(private http:HttpClient ) { }

  // metodo para enviar datos entre componentes
  sendDataToOtherComponents(data: string[]) {
    this.dataSubject.next(data);
  } 
  

  getPersonaje( id: number) : Observable<any>  {

    return this.http.get(`${this.rutaAPI}/api/character/${id}`);

  }

  getPersonajePorNombre( name: string, page: number) : Observable<any>  {

    return this.http.get(`${this.rutaAPI}/api/character/?name=${name}&page=${page}`);

  }

}
