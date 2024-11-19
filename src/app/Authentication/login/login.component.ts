import { Router } from '@angular/router';
import { AuthService } from './../../Services/auth/auth.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    dni: string ='';
    password: string='';

    constructor(private authService: AuthService, private router: Router, private toastr: ToastrService){

    }

    login(): void{
      this.authService.login(this.dni, this.password).subscribe({
        next: (response) => {
          const userRole = this.authService.getRole();

          if (userRole === 'Administrador') {
            this.router.navigate(['/menu']);
          } else if (userRole === 'CLIENT') {
            this.router.navigate(['/menuClient']);
          }
        },

        error: (err) => {
          console.error('Login failed', err)
          this.toastr.error('Credenciales incorrectas', 'Error');
        }
      });
}}
