import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notifications: any = new BehaviorSubject< Array<Event> | null>(null);


  constructor() { }
  isthereanynotifs(){
    console.error('wana see what is inside notif',this.notifications._value);
    return this.notifications._value;
  }

}
