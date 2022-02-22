import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { JwtAuthenticationService } from 'src/app/services/jwt-authentication.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-event-vote',
  templateUrl: './event-vote.component.html',
  styleUrls: ['./event-vote.component.css']
})
export class EventVoteComponent implements OnInit {
  @Input() host;
  event: Event=null;
  currentUser: String;
  userId:any;
  votedDate:any;
  constructor(private router:Router,private userService:UserService,private eventService: EventService, private route: ActivatedRoute, private authenticationService: JwtAuthenticationService,
    ) { }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.getAuthenticatedUser();
    var id=this.route.snapshot.params['id'];

    this.eventService.getCurrentEvent(id).subscribe(result=>{
      this.event=result;
      console.log(this.event);
    })

    this.getVotedDate();

  }

  // getCreatorEvent(event){
  //   return event.userEventStatus.find(element=>element.statut===1).user;
  // }

  voteevent(date){
    console.log("Vote");
    this.eventService.votedateevent(this.event.id,this.currentUser = this.authenticationService.getAuthenticatedUser(),date).subscribe(
      (result)=>{
        console.log(result);
      });
  }

  getVotedDate(){
    this.eventService.getdatevoted(this.route.snapshot.params['id'],this.authenticationService.getAuthenticatedUser()).subscribe(result=>{
      console.log(result);
      this.votedDate=result;
    });
  }
  isVoted(date){
    console.log(date);
    if(this.votedDate !=null)
      return date.id == this.votedDate.id;

    return false;
  }

  max() {
    var max=this.event.event_dates[0].votes.length;
    this.event.event_dates.forEach(
      dates=>{
        if(max<dates.votes.length)
          max=dates.votes.length;
      }
    )
   return max;
  }

  select_fixed_date(dates: any) {
    this.event.date_debut=dates.start;
    this.event.date_fin=dates.start;
    this.event.event_dates=null;
    this.eventService.updateevent(this.event).subscribe(
      result=>{
        console.log(result)
        this.router.navigate([`/event-list`]);
      },
      err=>console.log(err)
    )
  }
}
