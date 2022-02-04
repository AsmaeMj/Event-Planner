import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { initScrollListener,backToTop } from './shared/resources';
import { User } from './models/user.model';
import { UserService } from './services/user.service';
import { JwtAuthenticationService } from './services/jwt-authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('shrink', [
      state('in', style({ height: '54px' })),
      state('out', style({ height: '200px' })),
      transition('in => out', animate('.2s')),
      transition('out => in', animate('.2s'))
    ]),
    trigger('fade', [
      state('out', style({ opacity: 1 })),
      state('in', style({ opacity: 0 })),
      transition('* => *', animate('.5s'))
    ])
  ]
})
export class AppComponent {

  constructor(/*private router: Router,private authenticationService: JwtAuthenticationService, private userService: UserService*/) {}

  ngOnInit() {
   /* this.getCurrentUser();*/
    initScrollListener();
  }
/*
  backToTop(){
    backToTop();
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
    alert('not logged in')
  }

  logOut() {
    this.authenticationService.logout();
    this.userService.setUser(null);
    this.router.navigate(['/']);
    alert('succesfully logged out!')
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
  }*/
  backToTop(){
    backToTop();
  }
}