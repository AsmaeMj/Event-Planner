import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { JwtAuthenticationService } from 'src/app/services/jwt-authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User;
  hideNav: boolean = true;
  menuAnimation: string = 'in';


  constructor(private router: Router,public authenticationService: JwtAuthenticationService, private userService: UserService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  signUp() {
    this.router.navigate(['/create-account']);
  }


  getCurrentUser() {
    if(this.authenticationService.isUserLoggedIn()) {
    this.userService.getUser().subscribe(user => {
      this.currentUser = user;
    },
    error => {
      alert(error);
    });}
    else
    console.log('not logged in')
  }

  logOut() {
    this.authenticationService.logout();
    this.userService.setUser(null);
    this.router.navigate(['/']);
    console.log('succesfully logged out!')
  }

  goTo(url, event) {
    event.preventDefault();
    this.hideNav = true;
    this.menuAnimation = 'in';
    this.router.navigate([url]);
  }

  toggleNavbar() {
    this.hideNav = !this.hideNav;
    if (this.hideNav) {
      this.menuAnimation = 'in';
    } else {
      this.menuAnimation = 'out';
    }
  }

}
