import { Component, OnInit } from '@angular/core';
import { JwtAuthenticationService } from 'src/app/services/jwt-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = "";
  password = "";
  invalidLogin: boolean = false;
  invalidLoginMessagePart1: string = "Invalid username or password. If you have not yet created an account, please press on the ";
  invalidLoginMessagePart2: string = " link below";

  constructor(private authenticationService : JwtAuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    // console.log("The username is ", this.username);
    // console.log("The password is ", this.password);
   
    this.authenticationService.executeJWTAuthenticationService(this.username, this.password).subscribe(data=> {
      console.log(data);
        // In the line of code below, navigate accepts an array as an argument
        // The first element in the array is the page(component) you want to navigate to
      this.router.navigate(['/']);
      this.invalidLogin = false;
      },
      error=>{
        console.log(error);
        this.invalidLogin = true;
      }
    )
  }

  showPassword() {
    let passwordd = (<HTMLInputElement>document.getElementById('pwd'));
    if (passwordd.type === 'password') {
      passwordd.type = "text";
    }
    else {
      passwordd.type = "password";
    }
    }
}
