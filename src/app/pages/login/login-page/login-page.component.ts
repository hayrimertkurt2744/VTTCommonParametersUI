import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../Services/api.service.user';

import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatLabel,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    RouterModule,
    FormsModule,
    CommonModule,
    
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  
  email:string='';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private userService: UserService, private router: Router, private authService:AuthService) {}

  onSubmit(): void {
    this.userService.Login(this.email, this.password).subscribe(
      response => {
        // Handle successful login
        console.log("old token:"+this.authService.getToken());
        this.authService.clearToken();
        //Set the current token using the response from the user.
        this.authService.setToken(response.data);
        console.log("Login successful. New Token :"+this.authService.getToken());
        this.router.navigate(['pages/list/page-list']); 
        
      },
      error => {
        // Handle login error
        console.error('Login failed', error);
        this.errorMessage = 'Login failed. Please check your email and password.';
      }
    );
  }
  
}

