import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  API_URL: string='http://localhost:8080/api';

 private _refresh$ = new Subject<void>();


  constructor(private httpClient: HttpClient){

  }
  get refresh$(){
    return this._refresh$;

  }

  createService(service: any[]): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/service/create`, service);
  }
  getPlans(): Observable<any>{
    return this.httpClient.get(`${this.API_URL}/plans/all`).pipe(res => res)
  }
  getUsers(): Observable<any>{
    return this.httpClient.get(`${this.API_URL}/users/all`).pipe(res => res)
  }
  getClients(): Observable<any>{
    return this.httpClient.get(`${this.API_URL}/clients/all`).pipe(res => res)
  }
}
