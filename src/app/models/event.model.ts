import * as moment from 'moment';
import { User } from './user.model';

export class Event {

  id: number;
  user: User;
  name: string;
  eventType: string;
  host: string;
  start: string;
  end: string;
  location: any;
  guests: Array<string>;
  message: string;
  startDate: Object;
  endDate: Object;
  mapLink: string;
  mapImage: string;

  constructor(id, user, name, eventType, host, start, end, location, guests, message, mapLink) {
    this.id = id;
    this.user = user;
    this.name = name;
    this.eventType = eventType;
    this.host = host;
    this.location = location;
    this.mapLink = mapLink;
    this.guests = guests;
    this.message = message;
    this.mapImage = 'https://maps.googleapis.com/maps/api/staticmap?center=' + encodeURIComponent(location) + '&scale=2&zoom=14&size=640x640&maptype=roadmap&key=AIzaSyC5-1er5cL2OCpfYLu7rVzt_bmRJHb9Uck';
    this.startDate = {
      moment: moment(start).format('MMMM Do YYYY [at] hh:mm a'),
      raw: start
    };
    this.endDate = {
      moment: moment(end).format('MMMM Do YYYY [at] hh:mm a'),
      raw: end
    };
  }
}
