
import { Component , OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormBuilder, FormGroup, Validators,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlansService } from '../../Services/Plans/plans.service';
import { DialogModule } from 'primeng/dialog';
import {RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-planes',
  standalone: true,
  imports: [CommonModule,CardModule, ButtonModule,TableModule,FormsModule,ReactiveFormsModule, DialogModule, RouterModule],
  templateUrl: './lista-planes.component.html',
  styleUrl: './lista-planes.component.scss'
})
export class ListaPlanesComponent {
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
  deletePlan(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este plan?')) {
      this.planService.deletePlan(id).subscribe(
        () => {
          console.log('Plan eliminado exitosamente');
        },
        (error) => {
          console.error('Error al eliminar el plan', error);
        }
      );
    }
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

  abrirModal(plan: any) {
    this.modalHeader = 'Editar plan';
    this.currentClienteId = plan.id;
    this.planForm.patchValue(plan);
    this.displayModal = true;
  }

  cerrarModal() {
    this.displayModal = false;
    this.planForm.reset();
    this.currentClienteId= 0;
  }
  showEditPlanModal(plan: any) {
    this.abrirModal(plan);
  }
  onSubmit() {
    if (this.planForm.valid) {
      this.planService.updatePlan( this.currentClienteId, this.planForm.value).subscribe(
        (response) => {
          console.log('plan actualizado con éxito', response);

          this.cerrarModal();


        },
        (error) => {
          console.error('Error al actualizar el plan', error);
        }

      );
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    console.log('Observable cerrado')
  }
}
