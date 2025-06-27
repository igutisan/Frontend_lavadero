import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';


interface ReceiptHistory {
  idFactura: number;
  dniCliente: string;
  fecha: string;
  total: number;
}



@Injectable({
  providedIn: 'root'
})
export class ReceiptsService {

  API_URL: string = environment.apiUrl;

  private _refresh$ = new Subject<void>();


   constructor(private httpClient: HttpClient){

   }
   get refresh$(){
     return this._refresh$;

   }
   getPlanById(planId:number): Observable<any>{
    console.log('Obteniendo plan con ID:', planId);
    return this.httpClient.get(`${this.API_URL}/plans/${planId}`)
   }
   getUserById(UserId:number): Observable<any>{
    console.log('Obteniendo user con ID:', UserId);
    return this.httpClient.get(`${this.API_URL}/users/${UserId}`)
   }
   getClientById(clientId:number): Observable<any>{
    console.log('Obteniendo cliente con ID:', clientId);
    return this.httpClient.get(`${this.API_URL}/clients/${clientId}`)
   }
   getReceiptDetails(receiptId:number):Observable<any>{
      return this.httpClient.get(`${this.API_URL}/receiptdetail/receipt/${receiptId}`)
   }
   deleteReceipt(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/receipt/delete/${id}`).
    pipe(
      tap(() => {

        this._refresh$.next();
  })
)}

   getReceiptsHistory(): Observable<ReceiptHistory[]>{
     return this.httpClient.get<ReceiptHistory[]>(`${this.API_URL}/receiptdetail/history`).pipe(res => res)
   }

}
