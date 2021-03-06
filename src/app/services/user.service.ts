import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './../models/user.model';
import { JwtAuthenticationService } from 'src/app/services/jwt-authentication.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  API_URL = 'http://localhost:8080';
  public currentUser: any = new BehaviorSubject<User | null>(null);
  private user: User;

  constructor( private http: HttpClient , private authenticationService: JwtAuthenticationService) {}

  public getUser():Observable<User>{
    let username=this.authenticationService.getAuthenticatedUser();
    return this.http.get<User>("http://localhost:8080/user/"+username);
  }

  public setUser(user: any): Observable<User> {
    this.user = user;
    this.currentUser.next(user);
    //let url = `${this.API_URL}/users`;
    return this.http.post<User>("http://localhost:8080/users", user)
  }

  getAllUsers(){
    let url = `${this.API_URL}/users`;
    return this.http.get<User[]>(url);
  }

  public userIsLoggedIn(): boolean {

    return this.authenticationService.isUserLoggedIn();
   //return true;
  }
  public addcontact(userfrom:string,userto:string){
    let url = `http://localhost:8080/${userfrom}/${userto}/addcontact`;
    return this.http.get<any>(url);
  }

  public deletecontact(userfrom:string,userto:string){
    let url = `http://localhost:8080/${userfrom}/${userto}/deletecontact`;
    return this.http.delete<any>(url);}
    
  public getimage(username:String){
    return this.http.get(`http://localhost:8080/${username}/image/get/`, { responseType: 'blob' } )
  }


  updateUser(user: User) {
    let url = `http://localhost:8080/user/update`;
    return this.http.put<User>(url,user);


  }
}

