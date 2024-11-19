import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { FormsModule} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { AuthService } from './Services/auth/auth.service';
import { ToastrModule } from 'ngx-toastr';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CardModule, ButtonModule, ReactiveFormsModule, FormsModule, DialogModule, RouterModule,DropdownModule,  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  constructor(private authService: AuthService){}
  logOut(): void{
    this.authService.logout();
  }
  isLogged(): any{
    return this.authService.isAuthenticated();
  }
  title = 'LavaderoFrontend';

}
