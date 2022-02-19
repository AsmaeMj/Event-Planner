import * as moment from 'moment';
import { User } from './user.model';
import { Typeevents } from './typeEvents.model';
import { UserMeeting } from './userMeeting.model';

export class Event {

  id: number;
  isPublic: boolean;
  title: string;
  adresse: any;
  description: string;
  date_debut: Date;
  date_fin: Date;
  typeEvent: Typeevents;
  file: string;
  userEventStatus: Array<UserMeeting>
  event_dates: any;
  
  // privateEvent: boolean;
  // isMine: boolean;
  

  constructor(id,isPublic, title, adresse, description, date_debut, date_fin,event_dates, typeEvent, file, userEventStatus) {
    this.id = id;
    this.isPublic=isPublic;
    this.title = title;
    this.typeEvent = typeEvent;
    this.adresse = adresse;
    this.description = description;
    this.date_debut = date_debut;
    this.date_fin = date_fin;
    this.event_dates = event_dates;
    this.file = file;
    this.userEventStatus = userEventStatus;
    //this.mapImage = 'https://maps.googleapis.com/maps/api/staticmap?center=' + encodeURIComponent(adresse) + '&scale=2&zoom=14&size=640x640&maptype=roadmap&key=AIzaSyC5-1er5cL2OCpfYLu7rVzt_bmRJHb9Uck';
    // this.date_debut = {
    //   moment: moment(start).format('MMMM Do YYYY [at] hh:mm a'),
    //   raw: start
    // };
    // this.date_fin = {
    //   moment: moment(end).format('MMMM Do YYYY [at] hh:mm a'),
    //   raw: end
    // };
    // this.privateEvent=privateEvent;
    // this.isMine=isMine;
  }
}
