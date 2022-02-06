import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import * as moment from 'moment';
import { result } from 'lodash';
import { JwtAuthenticationService } from 'src/app/services/jwt-authentication.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
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

export class EventListComponent implements OnInit {

  currentUser: User;
  events: any;
  titleAnimation: string = 'fadeOutUp';
  fadeAnimation: string = 'fadeOut';
  activedTab:string="all";
  createdok: any;
  constructor(private router: Router, private userService: UserService, private eventService: EventService, public authenticationService: JwtAuthenticationService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUser();
    this.getEvents();
    this.triggerViewAnimation();
    if(this.route.snapshot.params['ifOk']){
      this.activedTab="created";
    }
  }

  getEvents() {
    //this.events=this.eventService.getEvents();
    this.activedTab="all";
    this.eventService.getEventsFromBackEnd().subscribe(result=>{
      this.events=result;
      console.log(result);
    })
  }

  getInvitedEvents(){
    let username= this.authenticationService.getAuthenticatedUser();
    this.eventService.getInvitedEvents(username).subscribe(events=>{
      console.log("invited event",events);
      this.events=events;
    }),error=>{
      console.log(error)
    };
    this.activedTab="invited";
  }

  getCreatedEvents(){
    let username= this.authenticationService.getAuthenticatedUser();
    this.eventService.getCreatedEvents(username).subscribe(events=>{
      console.log("invited event",events);
      this.events=events;
    }),error=>{
      console.log(error)
    };
    this.activedTab="created";
  }

  getAcceptedEvents(){
    let username= this.authenticationService.getAuthenticatedUser();
    this.eventService.getAcceptedEvents(username).subscribe(events=>{
      console.log("invited event",events);
      this.events=events;
    }),error=>{
      console.log(error)
    };
    this.activedTab="accepted";
  }

  getRejectedEvents(){
    let username= this.authenticationService.getAuthenticatedUser();
    this.eventService.getRejectedEvents(username).subscribe(events=>{
      console.log("invited event",events);
      this.events=events;
    }),error=>{
      console.log(error)
    };
    this.activedTab="Rejected";
  }

  getUser() {
    if(this.authenticationService.isUserLoggedIn()) {
      this.userService.getUser().subscribe(user => {
        this.currentUser = user;
        console.error('testhamza', this.currentUser);
      });
    }else{
      this.router.navigate(["/login"]);
      alert('not logged in')
    } 
  }

  goTo(url, param) {
    console.log(param);
    this.router.navigate([url], param);
  }

  triggerViewAnimation() {
    setTimeout(() => {
      this.titleAnimation = 'fadeInDown';
      this.fadeAnimation = 'fadeIn';
    }, 300);
  }

  setStartDate(date) {
    return moment(date).format('MMMM Do YYYY [at] hh:mm a');
  }

  onKey(event: any) { // without type info
    var query = event.target.value;
    console.log(query);
    this.events=(query) ? this.querySearch(query) : this.eventService.getEvents();  
  }

  createFilterFor(query) {
      var lowercaseQuery = String(query).toLowerCase().split(' ');
      return function filterFn(item) {
        var label = String(item.name +';'+ item.eventType).toLowerCase().split(' ').join('');
        for(var element of lowercaseQuery)
        {
          if(!label.includes(element))
            return false;
          console.log(element);
        }
        return true;
      };
    }

  querySearch (query) {
    return  query ? this.eventService.getEvents().filter(this.createFilterFor(query) ) : [];
  }

  deleteEvent(id){
    this.events = this.eventService.deleteEvent(id);
  }
}
