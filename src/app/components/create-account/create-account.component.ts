import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { emailValidator, lowercaseValidator, uppercaseValidator, numberValidator, symbolValidator, lengthValidator, matchPasswords } from './create-account.validators';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  accountCreateForm: FormGroup;
  firstname: AbstractControl;
  lastname: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  verifyPassword: AbstractControl;
  bio: AbstractControl;

  constructor(fb: FormBuilder, private userService: UserService, private router: Router) {
    this.accountCreateForm = fb.group({
      'firstname'           : ['', Validators.required],
      'lastname'           : ['', Validators.required],
      'email'           : ['', emailValidator],
      'password'        : ['', [lengthValidator, lowercaseValidator, uppercaseValidator, numberValidator, symbolValidator]],
      'verifyPassword'  : ['', Validators.required],
      'bio'             : ['']
    }, { validator: matchPasswords('password', 'verifyPassword') });

    this.firstname          = this.accountCreateForm.controls['firstname'];
    this.lastname          = this.accountCreateForm.controls['lastname'];
    this.email          = this.accountCreateForm.controls['email'];
    this.password       = this.accountCreateForm.controls['password'];
    this.verifyPassword = this.accountCreateForm.controls['verifyPassword'];
    this.bio            = this.accountCreateForm.controls['bio'];
  }

  ngOnInit() {}

  onSubmit() {
    let user = new User(this.firstname.value, this.lastname.value, this.email.value, this.password.value, this.verifyPassword.value, this.bio.value , null);
    this.userService.setUser(user);
    this.router.navigate(['/']);
  }
}
