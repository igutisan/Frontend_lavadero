import { Component  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlansService } from '../../Services/Plans/plans.service';
import { DialogModule } from 'primeng/dialog';
import {RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-clients-planes',
  standalone: true,
  imports: [CommonModule,CardModule, ButtonModule,TableModule,FormsModule,ReactiveFormsModule, DialogModule, RouterModule],
  templateUrl: './clients-planes.component.html',
  styleUrl: './clients-planes.component.scss'
})
export class ClientsPlanesComponent {
  planes: any[] = [];
  planForm: FormGroup;
  displayModal: boolean = false;
  modalHeader: string = '';
  currentClienteId:number= 0;
  suscription: Subscription =new Subscription();

  constructor(private fb: FormBuilder, private planService: PlansService) {
    this.planForm = this.fb.group({
      name: [''],
      description: [''],
      photo: [''],
      price: [''],

    });
  }


  ngOnInit(): void {
    this.cargarPlanes();
    this.suscription = this.planService.refresh$.subscribe(() => {
      this.cargarPlanes();
    });

  }
  cargarPlanes(): void {
    this.planService.getPlans().subscribe(
      (data) => {
        this.planes = data;
        console.log('Planes cargados:', this.planes);
      },
      (error) => {
        console.error('Error al cargar los planes', error);
      }
    );
  }
}
