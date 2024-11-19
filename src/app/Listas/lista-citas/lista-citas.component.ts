import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormBuilder, FormGroup, Validators,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import {RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component , OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AppointmentsService } from '../../Services/appointments/appointments.service';
@Component({
  selector: 'app-lista-citas',
  standalone: true,
  imports: [CommonModule,CardModule, ButtonModule,TableModule,FormsModule,ReactiveFormsModule, DialogModule, RouterModule],
  templateUrl: './lista-citas.component.html',
  styleUrl: './lista-citas.component.scss'
})
export class ListaCitasComponent implements OnInit {
  appointements : any[]= [];
  appointForm:FormGroup;
  displayModal: boolean = false;
  currentAppointId:number=0;
  currentDniAppoint:string='';
  suscription: Subscription =new Subscription();

  constructor(private appointService:AppointmentsService, private fb:FormBuilder ){
    this.appointForm = this.fb.group({
      description: [''],
      date: [''],
      status:[''],
      client:[''],
      dni:['']

    });

  }

  ngOnInit(): void {
    this.appointService.getAppointments().subscribe((data) => {
      this.appointements = data
    })
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
  abrirModal(appoint: any) {
    this.currentDniAppoint = appoint.client.dni;
    this.currentAppointId = appoint.id;

    this.appointForm.patchValue({
      description: appoint.description,
      date: appoint.date,
      status: appoint.status,
      dni: appoint.client.dni,

      client: {
        id: appoint.client.id
      }
    });

    this.displayModal = true;
  }
  cerrarModal() {
    this.displayModal = false;
    this.appointForm.reset();
    this.currentAppointId= 0;
    this.currentDniAppoint = '';
  }
  onSubmit() {
    console.log('Datos antes de enviar:', this.appointForm.value);

    if (this.appointForm.valid) {
      this.appointService.updateAppointments(this.currentAppointId, this.appointForm.value).subscribe(
        (response) => {
          console.log('Cita actualizada con éxito', response);
          this.ngOnInit();
          this.cerrarModal();
        },
        (error) => {
          console.error('Error al actualizar la cita', error);
        }
      );
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }




}
