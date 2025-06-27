import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

interface User {
  email: string;
  password: string;
  dni: string;
  role: string;
  name: string;
  address: string;
  lastName: string;
  phone: string;
  salary: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  API_URL: string = `${environment.apiUrl}/users`;

  private _refresh$ = new Subject<void>();

  constructor(private httpClient: HttpClient){

  }

  get refresh$(){
    return this._refresh$;

  }
  createUser(user: User): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/create`, user);
  }

  getUsers(): Observable<any>{
    return this.httpClient.get(`${this.API_URL}/all`).pipe(res => res)
  }

  updateUser(id: number, userData: any): Observable<any> {
    const url = `${this.API_URL}/update/${id}`;
    return this.httpClient.put(url, userData).pipe(
      tap(() => {
        this._refresh$.next();

      }));
  }
  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/delete/${id}`).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }






}

