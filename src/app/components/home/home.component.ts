import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { JwtAuthenticationService } from 'src/app/services/jwt-authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('title', [
      state('fadeInDown', style({ opacity: 1, transform: 'translate3d(0, 0, 0)' })),
      state('fadeOutUp', style({ opacity: 0, transform: 'translate3d(0, -30%, 0)'})),
      transition('* => *', animate('.2s'))
    ]),
    trigger('fade', [
      state('fadeIn', style({ opacity: 1 })),
      state('fadeOut', style({ opacity: 0 })),
      transition('* => *', animate('.5s'))
    ])
  ]
})
export class HomeComponent implements OnInit {

  currentUser: User;
  titleAnimation: string = 'fadeOutUp';
  fadeAnimation: string = 'fadeOut';

  constructor(private router: Router,private authenticationService: JwtAuthenticationService, private userService: UserService) {}

  ngOnInit() {
    if(this.authenticationService.isUserLoggedIn()) {
    this.userService.getUser().subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser);
      return this.currentUser;
    });
    this.triggerHomeAnimation();
  }else console.log('not logged in')
}

  goTo(url) {
    this.router.navigate([url]);
  }

  triggerHomeAnimation() {
    setTimeout(() => {
      this.titleAnimation = 'fadeInDown';
      this.fadeAnimation = 'fadeIn';
    }, 300);
  }

}
