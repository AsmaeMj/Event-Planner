import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  event: any;

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
     
       this.event=this.eventService
       .getCurrentEvent(this.route.snapshot.params['id']); 
       console.log(this.event);
  }

  viewDirections(url) {
    window.open(url, '_blank');
  }

}
