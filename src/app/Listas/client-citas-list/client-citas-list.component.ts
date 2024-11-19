import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AuthService } from './../../Services/auth/auth.service';
import { FormBuilder,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import {RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component , OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AppointmentsService } from '../../Services/appointments/appointments.service';

@Component({
  selector: 'app-client-citas-list',
  standalone: true,
  imports: [CommonModule,CardModule, ButtonModule,TableModule,FormsModule,ReactiveFormsModule, DialogModule, RouterModule],
  templateUrl: './client-citas-list.component.html',
  styleUrl: './client-citas-list.component.scss'
})
export class ClientCitasListComponent {
  appointements : any[]= [];
  currentAppointId:number=0;
  suscription: Subscription =new Subscription();
  constructor(  private authService: AuthService, private appointService:AppointmentsService, private fb:FormBuilder ){
  }




  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      const userId = this.authService.getId(token);
      if (userId) {

        this.appointService.getAppointmentsByClient(Number(userId)).subscribe((data) => {
          this.appointements = data;
        });
      }
    }
  }

  deleteAppoint(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
      this.appointService.deleteAppoint(id).subscribe(
        () => {
          console.log('cita eliminada exitosamente');
          this.ngOnInit();
        },
        (error) => {
          console.error('Error al eliminar la cita', error);
        }
      );
    }
  }
}
