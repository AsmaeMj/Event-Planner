import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthRouteGuardService } from './shared/auth-route-guard.service';

const routes: Routes = [{ path: '', component: HomeComponent },
];

@NgModule({
  imports: [],
  exports: []
})
export class AppRoutingModule { }
