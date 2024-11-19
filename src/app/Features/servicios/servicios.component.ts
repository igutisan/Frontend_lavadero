
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormsModule, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ServiceService } from '../../Services/service/service.service';
import {RouterModule } from '@angular/router';

import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, DropdownModule, CommonModule, RouterModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.scss'
})
export class ServiciosComponent implements OnInit {
  serviceForm: FormGroup;
  clients: any[] = [];
  users: any[] = [];
  plans: any[] = [];
  selectedServices: any[] = [];

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private router:Router,
    private toastr: ToastrService

  ) {
    this.serviceForm = this.fb.group({
      idUser: ['', Validators.required],
      idClient: ['', Validators.required],
      idPlan: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadClients();
    this.loadUsers();
    this.loadPlans();
  }

  loadClients(): void {
    this.serviceService.getClients().subscribe((data: any) => {
      this.clients = data;
    });
  }

  loadUsers(): void {
    this.serviceService.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  loadPlans(): void {
    this.serviceService.getPlans().subscribe((data: any) => {
      this.plans = data;
    });
  }

  realizarServicio(): void {
    if (this.serviceForm.valid) {
      const service = {
        idUser: { id: this.serviceForm.value.idUser },
        idClient: { id: this.serviceForm.value.idClient },
        idPlan: { id: this.serviceForm.value.idPlan }
      };



      this.selectedServices.push(service);
      console.log('Servicios seleccionados:', this.selectedServices);
  this.toastr.success('Servicio creado con exito', 'Exito!');
      //this.serviceForm.reset();
     this.serviceForm.get('idPlan')?.reset;
    }else{
      this.toastr.error('Hubo un problema al crear el servicio', 'Error');
    }
  }

  generarFactura(): void {

    if (this.selectedServices.length > 0) {
      let total = this.selectedServices.reduce((acc, service) => acc + service.idPlan.price, 0);
      const serviciosGuardados= localStorage.setItem('serviciosSeleccionados', JSON.stringify(this.selectedServices));
      localStorage.setItem('totalFactura', total.toString());

      this.serviceService.createService(this.selectedServices).subscribe(
        response => {

          console.log('Factura generada:', response);
          this.router.navigate(['servicios/factura']);


        },
        error => {
          console.error('Error al generar factura:', error);
        }
      );
    } else {
      console.warn('No hay servicios seleccionados para facturar.');
    }
  }

}

