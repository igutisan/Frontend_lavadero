import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface Client {
  email: string;
  password: string;
  dni: string;
  name: string;
  address: string;
  lastName: string;
  phone: string;

}



@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  API_URL: string='http://localhost:8080/api/clients';

 private _refresh$ = new Subject<void>();


  constructor(private httpClient: HttpClient){

  }
  get refresh$(){
    return this._refresh$;

  }

  createClient(client: Client): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/create`, client);
  }

  getClients(): Observable<any>{
    return this.httpClient.get(`${this.API_URL}/all`).pipe(res => res)
  }

  updateClient(id: number, clientData: any): Observable<any> {
    const url = `${this.API_URL}/update/${id}`;
    return this.httpClient.put(url, clientData).pipe(
      tap(() => {
        console.log('Notificando cambio con refresh$');
        this._refresh$.next();
  })
    );
  }
  deleteClient(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/delete/${id}`).
    pipe(
      tap(() => {

        this._refresh$.next();
  })
    );
  }

}
