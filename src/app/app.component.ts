import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { initScrollListener,backToTop } from './shared/resources';
import { User } from './models/user.model';
import { UserService } from './services/user.service';
import { JwtAuthenticationService } from './services/jwt-authentication.service';
import { scheduleJob } from 'node-schedule';
import { EventService } from './services/event.service';
import { NotificationService } from './services/notification.service';


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
  constructor(private eventService: EventService, private authenticationService: JwtAuthenticationService, private notificationService: NotificationService) {}
  newNotification: boolean=false;

  ngOnInit() {
   /* this.getCurrentUser();*/

  //initScrollListener();

  //scheduleJob("*/2 * * * * *", this.syncEvents.bind(this));

  }

  syncEvents(){
    if(this.authenticationService.isUserLoggedIn()) {
      let username = this.authenticationService.getAuthenticatedUser();
      this.eventService.getSyncNotifications(username).subscribe(events => {
        if ((events as Array<Event>).length > 0) {
          console.log("New invited event", events);
          this.newNotification = true;
          this.notificationService.notifications.next(events);
        } else {
          this.newNotification = false;
        }
        // this.events=events;
        return events;
      }), error => {
        console.log(error)
      };
    }
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
