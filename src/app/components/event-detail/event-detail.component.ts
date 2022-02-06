import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  event: Event;
  mapImage: string;
  mapLink: string;

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    var id=this.route.snapshot.params['id']
    this.eventService.getCurrentEvent(id).subscribe(result=>{
      this.event=result;
      console.log(this.event);
      this.mapImage = 'https://maps.googleapis.com/maps/api/staticmap?center=' + encodeURIComponent(this.event.adresse) + '&scale=2&zoom=14&size=640x640&maptype=roadmap&key=AIzaSyC5-1er5cL2OCpfYLu7rVzt_bmRJHb9Uck';
      this.mapLink = 'https://maps.google.com/?q='+ encodeURIComponent(this.event.adresse);
    })
    

    //console.error(this.event.adresse);
    
  }

  getCreatorEvent(event){
    return event.userEventStatus.find(element=>element.statut===1).user;
    // return event.userEventStatus.find(function(element){return element.statut===1}).user;
  }

  viewDirections(url) {
    window.open(url, '_blank');
  }

  viewImage(adresse){
    
  }

}
