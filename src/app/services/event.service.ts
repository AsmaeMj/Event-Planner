import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {


  private events: Array<Event> = [];
  public eventsObservable : BehaviorSubject<Event | undefined |null> ;
  // private currentEvent: Event;
  public currentEventObservable : BehaviorSubject<Event | undefined |null> ;
  private seed: Array<any> = this.getSeed();

  constructor() {
    this.seed.forEach((obj) => {
      let event = new Event(obj.id, obj.user, obj.name, obj.eventType, obj.host, obj.start, obj.end, obj.location, obj.guests, obj.message, obj.mapLink);
      this.events.push(event);
    });

//    this.updateEvents(this.events);
  }

  addEvent(event: Event): void {
    this.events.push(event);
    //this.updateEvents(this.events);
  }

  // updateEvents(events) {
  //   this.eventsObservable.next(events);
  // }

  getEvents() {
    return this.getSeed();
  }

  getCurrentEvent(id) {
    let eventId = +id;
    var event = _.find(this.events, { 'id': eventId });
    return event;
    //this.currentEventObservable.next(event);
    //return this.currentEventObservable.asObservable();
  }

  getSeed() {
    return [
      {
        id: 1,
        user: { firstname: 'Phil', lastname: 'Merrell', email: 'philbot5000@gmail.com', bio: '' },
        end: '2016-09-29T22:00',
        eventType: 'Party',
        host: 'Universal Studios',
        location: '1342 Diamond Street, Brooklyn, NY, United States',
        guests: ['Pedro Gaston', 'Siu	Dooley', 'Maryellen	Hobson', 'Isabel Billups'],
        message: 'rain assault gang jeans monofilament cyber- 3D-printed marketing. cartel Legba rebar saturation point garage numinous boy gang. gang apophenia physical market nodality digital weathered vinyl. render-farm boat office kanji garage -space car shoes. footage stimulate futurity franchise realism sign sensory office. ',
        name: 'Silent Wristwatch Film Festival',
        start: '2016-09-29T22:00',
        mapLink: 'https://www.google.com/maps/place/Diamond+St,+Brooklyn,+NY+11222/@40.7268212,-73.9497294,17z/data=!3m1!4b1!4m5!3m4!1s0x89c25948a387ece7:0x29260d175271dc23!8m2!3d40.7268212!4d-73.9475407',
        private: false,
        isMine: true
      },
      {
        id: 2,
        user: { firstname: 'Phil', lastname: 'Merrell', email: 'philbot5000@gmail.com', bio: '' },
        name: 'Augmented Reality Dolphin Drone Demo',
        eventType: 'Birthday',
        start: '2016-09-29T20:00',
        end: '2016-09-29T20:00',
        host: 'Beats by Dre',
        location: 'Beatson Hollow, Butte County, CA, United States',
        guests: ['Jenifer	Hardin', 'Marquetta	Randle', 'Raisa	Talbert', 'Emmie	Faber', 'Sage	Ngo'],
        message: 'convenience store advert DIY A.I. franchise warehouse neural uplink. singularity sensory denim Tokyo vinyl skyscraper meta- skyscraper. marketing disposable tower knife plastic artisanal euro-pop concrete. hotdog cardboard dolphin network assassin dolphin receding dome. apophenia woman disposable Kowloon realism long-chain hydrocarbons boat tank-traps. ',
        private: false,
        isMine: true
      },
      {
        id: 3,
        user: { firstname: 'Phil', lastname: 'Merrell', email: 'philbot5000@gmail.com', bio: '' },
        name: 'Tokyo Denim Franchise Conference',
        eventType: 'Conference',
        host: 'Tokyo Denim Inc.',
        start: '2016-09-26T22:00',
        end: '2016-09-26T22:00',
        location: '23, Mooka, Tochigi Prefecture, Japan',
        guests: ['Cori	Bellamy', 'Anastasia	Horvath', 'Reuben	Redding'],
        message: 'office Shibuya decay math- katana boy numinous Shibuya. plastic dolphin katana tanto pre- network refrigerator advert. geodesic pistol euro-pop assassin wonton soup carbon realism semiotics.Tokyo wristwatch j-pop geodesic Tokyo monofilament network uplink. human meta- monofilament rifle katana modem footage garage. ',
        mapLink: 'https://www.google.com/maps/place/23+Matsuyamach%C5%8D,+Mooka-shi,+Tochigi-ken+321-4346,+Japan/@36.4141643,139.9655168,17z/data=!3m1!4b1!4m5!3m4!1s0x601f576e23dacb53:0xd045bc3448a0e0ab!8m2!3d36.4141643!4d139.9677055',
        private: true,
        isMine: true
      },
      {
        id: 4,
        user: { firstname: 'Phil', lastname: 'Merrell', email: 'philbot5000@gmail.com', bio: '' },
        name: 'St Hamburger\'s All Star BBQ',
        eventType: 'Party',
        host: 'St BBQ',
        start: '2016-09-25T22:00',
        end: '2016-09-25T22:00',
        location: '2345 Main Street, Buda, TX, United States',
        guests: ['Leopoldo	Connors', 'Ron Anderson', 'Frank Smith'],
        message: 'Office Shibuya decay math- katana boy numinous Shibuya. plastic dolphin katana tanto pre- network refrigerator advert. geodesic pistol euro-pop assassin wonton soup carbon realism semiotics.Tokyo wristwatch j-pop geodesic Tokyo monofilament network uplink. human meta- monofilament rifle katana modem footage garage. ',
        mapLink: 'https://www.google.com/maps/place/2345+Main+St,+Buda,+TX+78610/@30.088852,-97.8240578,17z/data=!3m1!4b1!4m5!3m4!1s0x865b528cbf632b51:0x2a0c3c4e84bc726b!8m2!3d30.0888474!4d-97.8218638',
        private: true,
        isMine: false
      },
      {
        id: 7,
        user: { firstname: 'Phil', lastname: 'Merrell', email: 'philbot5000@gmail.com', bio: '' },
        name: 'Augmented Reality Dolphin Drone Demo',
        eventType: 'Birthday',
        start: '2016-09-29T20:00',
        end: '2016-09-29T20:00',
        host: 'Beats by Dre',
        location: 'Beatson Hollow, Butte County, CA, United States',
        guests: ['Jenifer	Hardin', 'Marquetta	Randle', 'Raisa	Talbert', 'Emmie	Faber', 'Sage	Ngo'],
        message: 'convenience store advert DIY A.I. franchise warehouse neural uplink. singularity sensory denim Tokyo vinyl skyscraper meta- skyscraper. marketing disposable tower knife plastic artisanal euro-pop concrete. hotdog cardboard dolphin network assassin dolphin receding dome. apophenia woman disposable Kowloon realism long-chain hydrocarbons boat tank-traps. ',
        mapLink: 'https://www.google.com/maps/place/Beatson+Hollow/@39.5748849,-121.6076154,15z/data=!3m1!4b1!4m5!3m4!1s0x809ccb1beedc65cd:0x8625ffba93046914!8m2!3d39.5748857!4d-121.5988606',
        private: false,
        isMine: false
      },
      {
        id: 6,
        user: { firstname: 'Phil', lastname: 'Merrell', email: 'philbot5000@gmail.com', bio: '' },
        name: 'Augmented Reality Dolphin Drone Demo',
        eventType: 'Birthday',
        start: '2016-09-29T20:00',
        end: '2016-09-29T20:00',
        host: 'Beats by Dre',
        location: 'Beatson Hollow, Butte County, CA, United States',
        guests: ['Jenifer	Hardin', 'Marquetta	Randle', 'Raisa	Talbert', 'Emmie	Faber', 'Sage	Ngo'],
        message: 'convenience store advert DIY A.I. franchise warehouse neural uplink. singularity sensory denim Tokyo vinyl skyscraper meta- skyscraper. marketing disposable tower knife plastic artisanal euro-pop concrete. hotdog cardboard dolphin network assassin dolphin receding dome. apophenia woman disposable Kowloon realism long-chain hydrocarbons boat tank-traps. ',
        mapLink: 'https://www.google.com/maps/place/Beatson+Hollow/@39.5748849,-121.6076154,15z/data=!3m1!4b1!4m5!3m4!1s0x809ccb1beedc65cd:0x8625ffba93046914!8m2!3d39.5748857!4d-121.5988606',
        private: true,
        isMine: true
      },
      {
        id: 44,
        user: { firstname: 'Phil', lastname: 'Merrell', email: 'philbot5000@gmail.com', bio: '' },
        name: 'Augmented Reality Dolphin Drone Demo',
        eventType: 'Birthday',
        start: '2016-09-29T20:00',
        end: '2016-09-29T20:00',
        host: 'Beats by Dre',
        location: 'Beatson Hollow, Butte County, CA, United States',
        guests: ['Jenifer	Hardin', 'Marquetta	Randle', 'Raisa	Talbert', 'Emmie	Faber', 'Sage	Ngo'],
        message: 'convenience store advert DIY A.I. franchise warehouse neural uplink. singularity sensory denim Tokyo vinyl skyscraper meta- skyscraper. marketing disposable tower knife plastic artisanal euro-pop concrete. hotdog cardboard dolphin network assassin dolphin receding dome. apophenia woman disposable Kowloon realism long-chain hydrocarbons boat tank-traps. ',
        mapLink: 'https://www.google.com/maps/place/Beatson+Hollow/@39.5748849,-121.6076154,15z/data=!3m1!4b1!4m5!3m4!1s0x809ccb1beedc65cd:0x8625ffba93046914!8m2!3d39.5748857!4d-121.5988606',
        private: false,
        isMine: false
      }
    ];
  }

}
