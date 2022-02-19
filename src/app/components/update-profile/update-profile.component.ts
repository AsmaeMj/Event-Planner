import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtAuthenticationService} from "../../services/jwt-authentication.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  selectedFile: File;
  currentuser:String;
  user:User
  message: string;
  showSpinner: boolean = true;
   imageToShow: any=null;

  constructor(private httpClient: HttpClient,private authenticationService : JwtAuthenticationService,private userservice : UserService) {
    this.user=new User(-1,null,null,null,null,null,null,null,null,null,null,null);

  }

  ngOnInit(): void {

    this.currentuser=this.authenticationService.getAuthenticatedUser();
    this.userservice.getUser().subscribe(
      data=>{
        this.user=data;
      }
    )
    this.userservice.getimage(this.currentuser).subscribe(
      image => {
        this.createImage(image)
      },
        err => this.handleImageRetrievalError(err));

  }
  //Gets called when the user selects an image
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];

  }
  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    //Make a call to the Spring Boot Application to save the image
    this.httpClient.put(`http://localhost:8080/${this.currentuser}/image/upload`, uploadImageData, { observe: 'response' })
      .subscribe((response) => {
          if (response.status === 200) {
            this.message = 'Image uploaded successfully';
            window.location.reload();
          } else {
            this.message = 'Image not uploaded successfully';
          }
        }
      );
  }

  private createImage(image: Blob) {
    if (image && image.size > 0) {
      let reader = new FileReader();

      reader.addEventListener("load", () => {
        this.imageToShow = reader.result;
        this.showSpinner = false;
      }, false);

      reader.readAsDataURL(image);
    } else {
      this.showSpinner = false;
    }
    console.log("image to show ",this.imageToShow)


  }

  private handleImageRetrievalError(err: any) {
    console.error(err);
    this.showSpinner = false;
  }

  update() {
    this.userservice.updateUser(this.user).subscribe(
      data=>{
        console.log("user succefully updated")
      }
    )
  }
}
