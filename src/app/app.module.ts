import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthRouteGuardService } from './shared/auth-route-guard.service';
import { UserService } from './services/user.service';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { EventModifyComponent } from './components/event-modify/event-modify.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpInterceptorService } from './services/http/http-interceptor.service';
import '@fortawesome/fontawesome-free/js/all.js';
import { ContactsComponent } from './components/contacts/contacts.component';


const routes: Routes = [
{ path: '', component: EventListComponent },
{ path: 'event-list/:ifOk', component: EventListComponent },
{path: 'event/:id', component: EventDetailComponent},
{ path: 'create-account', component: CreateAccountComponent },
{ path: 'login', component: LoginComponent },
{ path: 'create-event', component: CreateEventComponent, canActivate: [ AuthRouteGuardService ] },
{ path: 'event/:id/modify', component: EventModifyComponent },
{ path: 'profile', component: ProfileComponent },
  { path: 'mycontacts', component: ContactsComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateAccountComponent,
    CreateEventComponent,
    EventListComponent,
    EventDetailComponent,
    EventModifyComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ProfileComponent,
    ContactsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    NgbModule,
    NgSelectModule
  ],

  providers: [UserService, AuthRouteGuardService, {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
