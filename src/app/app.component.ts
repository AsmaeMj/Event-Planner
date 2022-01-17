import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { initScrollListener,backToTop } from './shared/resources';
import { User } from './models/user.model';
import { UserService } from './services/user.service';

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
  currentUser: User;
  hideNav: boolean = true;
  menuAnimation: string = 'in';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.getCurrentUser();
    initScrollListener();
  }

  backToTop(){
    backToTop();
  }

  signUp() {
    this.router.navigate(['/create-account']);
  }


  getCurrentUser() {
    this.userService.getUser().subscribe(user => {
      this.currentUser = user;
      console.log(user);
      return this.currentUser;
    });
  }

  logOut() {
    this.userService.setUser(null);
    this.router.navigate(['/']);
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