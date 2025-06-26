import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';




interface Plan {
  name: string;
  description: string;
  photo: string;
  price: number;


}


@Injectable({
  providedIn: 'root'
})
export class PlansService {

  API_URL: string='https://lavadero-back.onrender.com/api/plans';

 private _refresh$ = new Subject<void>();


  constructor(private httpClient: HttpClient){

  }
  get refresh$(){
    return this._refresh$;

  }

  createPlans(plan: Plan): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/create`, plan);
  }

  getPlans(): Observable<any>{
    return this.httpClient.get(`${this.API_URL}/all`).pipe(res => res)
  }

  updatePlan(id: number, planData: any): Observable<any> {
    const url = `${this.API_URL}/update/${id}`;
    return this.httpClient.put(url, planData).pipe(
      tap(() => {
        console.log('Notificando cambio con refresh$');
        this._refresh$.next();
  })
    );
  }
  deletePlan(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/delete/${id}`).
    pipe(
      tap(() => {

        this._refresh$.next();
  })
    );
  }
}
