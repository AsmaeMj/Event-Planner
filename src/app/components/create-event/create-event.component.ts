import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { dateValidator, endDateIsBeforeStartDateValidator } from './create-event.validators';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { EventService } from 'src/app/services/event.service';
import { GoogleMapsService } from 'src/app/services/google-maps.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  createEventForm: FormGroup;
  name: AbstractControl;
  eventType: AbstractControl;
  host: AbstractControl;
  start: AbstractControl;
  end: AbstractControl;
  guests: AbstractControl;
  location: AbstractControl;
  message: AbstractControl;
  guestsTouched: boolean = false; // Workaround to create <tag-input> component validation...


  currentUser: User;
  events:any;

  constructor(
    private fb: FormBuilder,
    private googleMaps: GoogleMapsService,
    private eventService: EventService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getCurrentUser();
    this.getEvents();
    this.buildForm();
  }

  buildForm() {
    this.googleMaps.initAutoComplete();
    this.createEventForm = this.fb.group({
      'name'      : ['', Validators.required],
      'eventType' : ['', Validators.required],
      'host'      : ['', Validators.required],
      'start'     : ['', [ dateValidator, Validators.required ]],
      'end'       : ['', [ dateValidator, Validators.required ]],
     // 'guests'    : [''],
      'location'  : [''],
      'message'   : ['']
    }, { validator: endDateIsBeforeStartDateValidator('start', 'end') } );

    this.name = this.createEventForm.controls['name'];
    this.eventType = this.createEventForm.controls['eventType'];
    this.host = this.createEventForm.controls['host'];
    this.start = this.createEventForm.controls['start'];
    this.end = this.createEventForm.controls['end'];
    this.guests = this.createEventForm.controls['guests'];
    this.location = this.createEventForm.controls['location'];
    this.message = this.createEventForm.controls['message'];
    this.guests.patchValue([]);
  }

  checkGuestList(item) {
    this.guestsTouched = true;
  }

  getCurrentUser() {
    this.userService.getUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  geolocate() {
    this.googleMaps.geolocate();
  }

  updateEndTime() {
    this.end.setValue(this.start.value);
  }

  getEvents() {
    this.events=this.eventService.getEvents();
  }

  updateLocationValue() {
    console.log('update location value')
    let locationValue = (<HTMLInputElement>document.getElementById('location')).value;
    this.location.setValue(locationValue);
  }

  onSubmit() {
    let eventId = this.events.length + 1;
    let event = new Event(eventId, this.currentUser, this.name.value, this.eventType.value, this.host.value, this.start.value, this.end.value, this.location.value,null, this.message.value, this.googleMaps.getPlace().url, null, null);
    this.eventService.addEvent(event);
    this.router.navigate(['/']);
  }

}
