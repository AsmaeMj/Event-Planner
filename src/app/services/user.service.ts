import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './../models/user.model';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  public currentUser: any = new BehaviorSubject<User | null>(null);
  private user: User;

  constructor() {}

  public getUser(): Observable<User> {
    return this.currentUser.asObservable();
  }

  public setUser(user: any): void {
    this.user = user;
    this.currentUser.next(user);
  }

  public userIsLoggedIn(): boolean {
   // return this.user ? true : false;
   return true;
  }
}

