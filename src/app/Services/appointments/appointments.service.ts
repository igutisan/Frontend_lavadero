import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';


interface Appointment {
  date: string;
  description: string;
  status: string;
  idClient: number;


}
@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  API_URL: string='http://localhost:8080/api/appoint';
  private _refresh$ = new Subject<void>();

  constructor(private httpClient: HttpClient) { }

  get refresh$(){
    return this._refresh$;

  }

  createService(appointment: Appointment): Observable<any>{
    return this.httpClient.post<any>(`${this.API_URL}/create`,appointment);
  }
  deleteAppoint(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/delete/${id}`).
    pipe(
      tap(() => {

        this._refresh$.next();
    })
  )}

  updateAppointments(id: number, appointmentData: any): Observable<any> {
    const url = `${this.API_URL}/edit/${id}`;
    return this.httpClient.put(url, appointmentData).pipe(
      tap(() => {
        console.log('Notificando cambio con refresh$');
        this._refresh$.next();
  })
    );
  }


  getAppointments(): Observable<any>{
    return this.httpClient.get(`${this.API_URL}/all`).pipe(res => res);
  }

  getAppointmentsByClient(id:number): Observable<any>{
    return this.httpClient.get(`${this.API_URL}/all/${id}`).pipe(res => res);
  }

}
