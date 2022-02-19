import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../models/user.model";
import {JwtAuthenticationService} from "../../services/jwt-authentication.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public mycontacts: Array<User> = [];
  public allusers:Array<User> = [];
  public otherusers: Array<User> = [];
  public avatars:{[key: string]: any}={}
  selected;
  searchTerm: string;
  term: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private authenticationService: JwtAuthenticationService,
  ) { }

  ngOnInit(): void {
    this.getmycontacts();
  }

  update(e){
    this.selected = e.target.value
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
        for(let user of response) {
          this.allusers.push(user)
          console.log( "user=",user );

        }
        this.allusers = this.allusers.filter(user => user.username != this.authenticationService.getAuthenticatedUser());
        this.otherusers= this.allusers.filter(el=>
          this.mycontacts.every((f) => f.username !==el.username)
        );
        this.getallavatars();

      },
      error=>console.log(error)

    )
  }

  addcontact(username) {
    console.log("usernameeee" ,username);

    this.userService.addcontact(this.authenticationService.getAuthenticatedUser(),username).subscribe(
      response=>{
        console.log( response );
        window.location.reload();
      },
      error=>console.log(error)

    )

  }

  deletecontact(username){
    console.log("deleted contact" ,username);

    this.userService.deletecontact(this.authenticationService.getAuthenticatedUser(),username).subscribe(
      response=>{
        console.log( response );
      },
      error=>console.log(error)
    )
    window.location.reload();

  }

  private getallavatars() {
      //console.log("jai entre a get all avatars this.allusers=",this.allusers)
    //je stock chaque image d avatar dans le tableau
    console.log("j ai entre",this.allusers)
    this.allusers.forEach(user=> {
        this.userService.getimage(user.username).subscribe(
          image => {
              let reader = new FileReader();

            reader.addEventListener("load", () => {
              this.avatars[user.username] = reader.result;
            }, false);

            reader.readAsDataURL(image);
            console.log("redear url:",reader)

             });
      }
    )
  }
}
