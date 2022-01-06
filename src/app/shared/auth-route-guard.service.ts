import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';
@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthRouteGuardService implements CanActivate {
    
    constructor(private userService: UserService) {}

    canActivate() {
        return this.userService.userIsLoggedIn();
    }
}
