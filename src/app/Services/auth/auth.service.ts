import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LOGIN_URL='https://lavadero-back.onrender.com/api/login';
  private tokenKey = 'authToken';


  constructor(private httpClient:HttpClient,
    private router:Router) { }

    login(dni: string , password: string): Observable<any> {
      return this.httpClient.post<any>(this.LOGIN_URL,{dni, password}).pipe (
        tap(response => {
          if(response.token){

            console.log(response.token);
            this.setToken(response.token);  // Guarda el token en localStorage
          }
        })
      )
    }

    private setToken(token:string): void {
      localStorage.setItem(this.tokenKey, token);
    }

     getToken(): string|null{
      if(typeof window !== 'undefined'){
        return localStorage.getItem(this.tokenKey);
      }else{
        return null;
      }

    }
    isAuthenticated(): boolean{

      const token = this.getToken();
      if(!token){
        return false;
      }
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      return Date.now() < exp;
    }
    logout(): void{
      localStorage.removeItem(this.tokenKey)
      this.router.navigate(['/login'])
    }

    private getPayloadFromToken(token: string): any {
      const payloadBase64 = token.split('.')[1];
      return JSON.parse(atob(payloadBase64));
    }
    getRole(): string | null {
      const token = this.getToken();
      if (!token) return null;

      try {
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));
        return payload.role || null;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    hasRole(role: string): boolean {
      const userRole = this.getRole();
      return userRole === role;
    }
    getId(token: string): string | null {
      try {
          console.log('Token en getId:', token);
          const payloadBase64 = token.split('.')[1];
          console.log('Payload codificado en Base64:', payloadBase64);

          const payloadDecoded = JSON.parse(atob(payloadBase64)); 
          console.log('Payload decodificado:', payloadDecoded);

          // Retornar el ID desde el campo 'id'
          return payloadDecoded.id ? payloadDecoded.id.toString() : null;
      } catch (error) {
          console.error('Error al decodificar el token:', error);
          return null;
      }
   }

}
