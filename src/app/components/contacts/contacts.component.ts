import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../models/user.model";
import {JwtAuthenticationService} from "../../services/jwt-authentication.service";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  public mycontacts: Array<User> = [];
  public allusers:Array<User> = [];
  public otherusers: Array<User> = [];
  constructor(private userService: UserService, private router: Router,    private authenticationService: JwtAuthenticationService,
  ) { }

  ngOnInit(): void {
    this.getmycontacts();


  }

  private getmycontacts() {
    this.userService.getUser().subscribe(
      response=>{
        console.log( response );
        //this.allUsers = response;
        for(let follow of response.following)  {
          this.mycontacts.push(follow.to)
        }
        this.getallusers();
      },
      error=>console.log(error)
    )
  }

  private getallusers() {
    this.userService.getAllUsers().subscribe(
      response=>{
        console.log( response );
        //this.allUsers = response;
        for(let user of response)  {
          this.allusers.push(user)
        }
        this.allusers = this.allusers.filter(user => user.username != this.authenticationService.getAuthenticatedUser());
        this.otherusers= this.allusers.filter(el=>
          this.mycontacts.every((f) => f.username !==el.username)
        );
      },
      error=>console.log(error)

    )




  }

  addcontact(username: string) {
    this.userService.addcontact(this.authenticationService.getAuthenticatedUser(),username).subscribe(
      response=>{
        console.log( response );

      },
      error=>console.log(error)

    )
  }
}
