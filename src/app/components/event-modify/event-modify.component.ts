import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Event} from "../../models/event.model";
import {Typeevents} from "../../models/typeEvents.model";
import {User} from "../../models/user.model";
import {GoogleMapsService} from "../../services/google-maps.service";
import {EventService} from "../../services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {JwtAuthenticationService} from "../../services/jwt-authentication.service";
import {dateValidator, endDateIsBeforeStartDateValidator} from "../create-event/create-event.validators";
import {UserMeeting} from "../../models/userMeeting.model";

@Component({
  selector: 'app-event-modify',
  templateUrl: './event-modify.component.html',
  styleUrls: ['./event-modify.component.css']
})
export class EventModifyComponent implements OnInit  {
  DatesRadioOptions: String='One Date';
  createEventForm: FormGroup;
  name: AbstractControl;
  eventType: AbstractControl;
  // host: AbstractControl;
  start: AbstractControl;
  end: AbstractControl;
  guests: AbstractControl;
  location: AbstractControl;
  message: AbstractControl;
  //  guestsTouched: boolean = false; // Workaround to create <tag-input> component validation...
  // currentUser: User;

  meeting: Event;
  allUsernames;
  search1 = '';
  meetingInvitees: Array<string> = [];
  //allUsers: Array<User> = [];
  alltypeevents: Array<Typeevents>=[];
  alltypeeventsname: Array<string>=[];
  selected_type_event_name: string;
  ifOk: string = "all";
  buttonDisable=true;
  usernameOfCurrentlyLoggedInUser : string;
  // events:any;
  dates:FormArray;
  private ismultipledates: Boolean;
  private mycontacts: Array<User> = [];


  constructor(
    private fb: FormBuilder,
    private googleMaps: GoogleMapsService,
    private eventService: EventService,
    private router: Router,
    private userService: UserService,
    private authenticationService: JwtAuthenticationService,
    private route:ActivatedRoute
  ) {}

  ngOnInit() {
    let id=this.route.snapshot.params['id']

    this.eventService.getCurrentEvent(id).subscribe(
      data=>{
        this.meeting=data;
        this.selected_type_event_name=this.meeting.typeEvent.name;
        //let objects = this.meeting.userEventStatus.find(o => o.statut === 2);
        //this.meetingInvitees=this.extractAllUsernamesFromUsers(this.meeting.userEventStatus.)
      }
    )
    //this.getCurrentUser();
    this.getmycontacts();
    this.getAlltypes();
    //this.getEvents();
    this.buildForm();
    this.usernameOfCurrentlyLoggedInUser = this.authenticationService.getAuthenticatedUser();
  }

  buildForm() {
    this.googleMaps.initAutoComplete();
    this.createEventForm = this.fb.group({
      'name'      : ['', Validators.required],
      'eventType' : ['', Validators.required],
      // 'host'      : ['', Validators.required],
      'start'     : ['', [ dateValidator, Validators.required ]],
      'end'       : ['', [ dateValidator, Validators.required ]],
      dates: this.fb.array([ this.createItemDate() ]),
      'guests'    : ['', Validators.required],
      'location'  : [''],
      'message'   : ['']
    }, { validator: endDateIsBeforeStartDateValidator('start', 'end') } );

    this.name = this.createEventForm.controls['name'];
    this.eventType = this.createEventForm.controls['eventType'];
    // this.host = this.createEventForm.controls['host'];
    this.start = this.createEventForm.controls['start'];
    this.end = this.createEventForm.controls['end'];
    this.guests = this.createEventForm.controls['guests'];
    this.location = this.createEventForm.controls['location'];
    this.message = this.createEventForm.controls['message'];
    //this.guests.patchValue([]);
  }

  getmycontacts(){
    this.userService.getUser().subscribe(
      response=>{
        console.log( response );
        //this.allUsers = response;
        for(let follow of response.following)  {
          this.mycontacts.push(follow.to)
        }
        this.allUsernames = this.extractAllUsernamesFromUsers( this.mycontacts );
      },
      error=>console.log(error)
    )
  }
  extractAllUsernamesFromUsers( response ){
    let res = [];

    for(let oneUser of response)
      res.push(oneUser.username);

    return res;
  }

  private getAlltypes() {
    this.eventService.gettypeevents().subscribe(
      response=>{
        this.alltypeevents=response;
        console.log( response );
        this.alltypeeventsname = this.extractnameFromTypeevents( response );
      },
      error=>console.log(error)
    )
  }

  extractnameFromTypeevents( response ){
    let res = [];

    for(let oneType of response)
      res.push(oneType.name);

    return res;
  }

  updateMeeting(){
    console.log("The line below contains all the meeting invitees");
    console.log(this.meetingInvitees);
    //si on a selectionne le choix multiple dates
    if(this.isSelected('Multiple dates'))
      this.meeting.event_dates = this.dates.value;
    else
      this.meeting.event_dates=[];

    this.meeting.title = this.name.value;
    this.selected_type_event_name = this.eventType.value;
    //si on a selectionne le choix one date
    if(this.isSelected('One Date')){
      this.meeting.date_debut = this.start.value;
      this.meeting.date_fin = this.end.value;
    }

    this.meeting.description = this.message.value;
    // console.log(this.meeting.time);
    let username = this.authenticationService.getAuthenticatedUser();
    //ajouter le type devenement selectionner dans l'object
    this.meeting.typeEvent={id:this.alltypeevents.find(x=>x.name==this.selected_type_event_name).id,name:this.selected_type_event_name}
    //ajout des utilisateurs
    this.meeting.userEventStatus = this.createUserMeetingStatusFromUsernames();
    console.log("this meeting= ",this.meeting);
    this.eventService.deleteEvent(this.meeting.id);
    this.eventService.createNewMeeting(this.meeting, username).subscribe(
      response=>this.handleSuccessfulResponse(response),
      error=>alert(error)
    )
  }

  createUserMeetingStatusFromUsernames(){
    let res = [];

    // Add the meeting organizer to a list of invitees. Ideally, meeting should have two different type of
    // users. One should be the meeting organizer while the other type of users should be the meeting
    //attendees. But, this fix is better than not including the meeting organizer in the meeting at all

    for( let oneUsername of this.meetingInvitees ){
      for( let oneUser of this.mycontacts ){
        if(oneUser.username == oneUsername){
          // res.push( oneUser );
          //let userMeetingKey = new UserMeetingKey( oneUser.id, -1);
          let userMeeting = new UserMeeting( null, oneUser, 1 ); //One means creator
          console.log("usermeeting",userMeeting);
          res.push( userMeeting );
        }

      }
    }
    return res;
  }

  handleSuccessfulResponse(response){
    console.log("Successfully saved the meeting");
    console.log( response );
    //[ngClass]="{'active-tab':activedTab==='created'}" (click)="goTo('/event-list', $event)"
    this.ifOk="created";
    this.router.navigate([`/event-list/${this.ifOk}`]);
  }

  selectedStatic(result) {
    this.search1 = result;
    this.meetingInvitees.push(result);
    console.log(this.meetingInvitees);
  }

  // checkGuestList(item) {
  //   this.guestsTouched = true;
  // }

  updateEndTime() {
    this.end.setValue(this.start.value);
  }

  geolocate() {
    this.googleMaps.geolocate();
  }

  updateLocationValue() {
    let locationValue = (<HTMLInputElement>document.getElementById('location')).value;
    this.meeting.adresse = locationValue;
  }

  addProposedDate(){
    this.dates = this.createEventForm.get('dates') as FormArray;
    this.dates.push(this.createItemDate());
    console.error(this.dates.value);
  }
  createItemDate(): FormGroup{
    return this.fb.group({
      start: new FormControl(''),
      end: new FormControl('')     });
  }
  getDates() {
    return (<FormArray>this.createEventForm.get('dates')).value;
  }

  setRadio(e:string){
    this.DatesRadioOptions=e;
  }
  isSelected(name:string){
    if(!this.DatesRadioOptions){
      return false;
    }
    return (this.DatesRadioOptions === name);
  }
}
