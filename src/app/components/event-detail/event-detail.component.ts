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
    var id=this.route.snapshot.params['id']
    this.eventService.getCurrentEvent(id).subscribe(result=>{
      this.event=result;
    })
       console.log(this.event);
  }

  getCreatorEvent(event){
    return event.userEventStatus.find(element=>element.statut===1).user;
    // return event.userEventStatus.find(function(element){return element.statut===1}).user;
  }

  viewDirections(url) {
    window.open(url, '_blank');
  }

}
