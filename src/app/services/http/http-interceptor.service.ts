import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import { JwtAuthenticationService } from '../jwt-authentication.service';
import {Observable, throwError} from "rxjs";
import {catchError, map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private authService: JwtAuthenticationService
  ) { }

  // The parameter request is the HttpRequest being sent out
  // In the method below, we will intercept the request, add header
  // and forward the request to next http handler
  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{

    let authHeaderString = this.authService.getAuthenticateToken();
    let username = this.authService.getAuthenticatedUser();

    if( authHeaderString && username ){
      request = request.clone({
        setHeaders : {
          Authorization : authHeaderString
        }
      });
    }

    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
          }
          else if(error.status==401) {
            console.log('this is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
              this.authService.logout();

          }
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
  }
}
