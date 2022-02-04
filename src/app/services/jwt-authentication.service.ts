import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticatedUser';

export const API_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class JwtAuthenticationService {

  constructor( private http: HttpClient) { }

  executeJWTAuthenticationService(username, password) {

    let url = `${API_URL}/authenticate`;

    return this.http.post<any>(url, {
       "username":username,
        "password":password
      }).pipe(
      map(
        data=> {
          localStorage.setItem(AUTHENTICATED_USER, username);
          localStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        }
      )
    );
  }

  getAuthenticatedUser(){
    return localStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticateToken(){
    if( this.getAuthenticatedUser() )
      return localStorage.getItem(TOKEN);
  }
  
  isUserLoggedIn(){
    let user = localStorage.getItem(AUTHENTICATED_USER);
    console.log("user authenticated=",user);
    return !(user ===null);
  }

  logout(){
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem('token');
  }

}
