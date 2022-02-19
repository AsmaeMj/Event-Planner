import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { datesValidator, dateValidator, endDateIsBeforeStartDateValidator } from './create-event.validators';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { EventService } from 'src/app/services/event.service';
import { GoogleMapsService } from 'src/app/services/google-maps.service';
import { Event } from 'src/app/models/event.model';
import { JwtAuthenticationService } from 'src/app/services/jwt-authentication.service';
import { Typeevents } from 'src/app/models/typeEvents.model';
import { UserMeeting } from 'src/app/models/userMeeting.model';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
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

  isPublic: boolean;
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
  ) {}

  ngOnInit() {
    this.meeting = new Event(-1,true, "", "", "", "","",[],{id:-1,name:""},"",[]);
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

  saveMeeting(){
    console.log("The line below contains all the meeting invitees");
    console.log(this.meetingInvitees);
    //si on a selectionne le choix multiple dates
    if(this.isSelected('Multiple dates'))
    this.meeting.event_dates = this.dates.value;
    else
      this.meeting.event_dates=[];

    this.meeting.isPublic = this.isPublic;
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
    alert("Successfully saved the meeting");
    console.log( response );
    //[ngClass]="{'active-tab':activedTab==='created'}" (click)="goTo('/event-list', $event)"
    this.ifOk="created";
    this.router.navigate([`/event-list/${this.ifOk}`]);
  }

  onItemChange(value){
    console.log('ispublic:', value);
    this.isPublic = value;
    console.log('22',this.isPublic);

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
