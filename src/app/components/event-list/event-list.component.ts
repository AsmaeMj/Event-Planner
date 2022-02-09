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
import {UserMeeting} from "../../models/userMeeting.model";

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
  activedTab:string = "all";
  createdok: any;
  constructor(private router: Router, private userService: UserService, private eventService: EventService, public authenticationService: JwtAuthenticationService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUser();
    this.triggerViewAnimation();
    this.getEvents(this.route.snapshot.params['ifOk']);
    console.log(this.activedTab);

  }

  getEvents(tab) {
    //this.events=this.eventService.getEvents();
    switch(tab){
      case "all":
        this.eventService.getEventsFromBackEnd().subscribe(result=>{
          this.events=result;
          console.log(result);
        })
        this.activedTab="all";
        break;
      case "created":
        this.getCreatedEvents();
        break;
      case "invited":
        this.getInvitedEvents();
        break;
      case "accepted":
        this.getAcceptedEvents();
        break;
      case "Rejected":
        this.getRejectedEvents();
        break;
      default:
        this.eventService.getEventsFromBackEnd().subscribe(result=>{
          this.events=result;
          console.log(result);
        })
        this.activedTab="all";
        break;
    }
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
      console.log("created event",events);
      this.events=events;
    }),error=>{
      console.log(error)
    };
    this.activedTab="created";
  }

  getAcceptedEvents(){
    let username= this.authenticationService.getAuthenticatedUser();
    this.eventService.getAcceptedEvents(username).subscribe(events=>{
      console.log("accepted event",events);
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
      this.router.navigate(["/"]);
      //alert('not logged in')
    }
  }

  goTo(url) {
    //console.log(param);
    this.router.navigate([url]);
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
    this.eventService.deleteEvent(id).subscribe(
      data=>{
        console.log("delete event response",data)
        this.getCreatedEvents();
      },
      err=>console.log(err)
    );

  }

  getUserMeetingStatusToUpdate( userMeetingList: Array<UserMeeting>, username: string ){
    for( let oneUserMeeting of userMeetingList ){
      if( oneUserMeeting.user.username == username )
        return oneUserMeeting;
    }

    return null;
  }
  updateMeetingStatus( meetingStatus: number, event: Event ){
    let username= this.authenticationService.getAuthenticatedUser();

    let userMeetingStatusToUpdate = this.getUserMeetingStatusToUpdate( event.userEventStatus, username );
    userMeetingStatusToUpdate.statut = meetingStatus;

    this.eventService.changeMeetingStatus( username, userMeetingStatusToUpdate ).subscribe(
      response=>{
        console.log(response);
        // console.log("Successfully changed the meeting status to", response.meetingStatus );
        this.getCreatedEvents();
      },
      error=> console.log( error )
    );
  }

  acceptEvent(event: any) {
    let meetingStatus: number = 3;
    // let meetingStatus: number = STATUS_ACCEPTED;
    this.updateMeetingStatus( meetingStatus, event );
  }
}
