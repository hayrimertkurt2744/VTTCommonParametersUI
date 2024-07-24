import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: APIService, private authService: AuthService) {}

  baseUrl = "http://localhost:5194/";

  Register(user: any[]): Observable<any> {
    return this.apiService.post(this.baseUrl + `Auth/Register`, user);
  }

  Login(email: string, password: string): Observable<any> {
    console.log(" login")
    return this.apiService.post(this.baseUrl + `Auth/Login?email=${email}&password=${password}`, {email,password})
    
  }
}