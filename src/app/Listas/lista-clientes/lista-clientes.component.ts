import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormBuilder, FormGroup, Validators,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientsService } from '../../Services/clients/clients.service';
import { DialogModule } from 'primeng/dialog';
import {RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-lista-clientes',
  standalone: true,
  imports: [CommonModule,CardModule, ButtonModule,TableModule,FormsModule,ReactiveFormsModule, DialogModule, RouterModule],
  templateUrl: './lista-clientes.component.html',
  styleUrl: './lista-clientes.component.scss'
})
export class ListaClientesComponent implements OnInit, OnDestroy{
  clientes: any[] = [];
  clienteForm: FormGroup;
  displayModal: boolean = false;
  modalHeader: string = '';
  currentClienteId:number= 0;
  suscription: Subscription =new Subscription();

  constructor(private fb: FormBuilder, private clService: ClientsService) {
    this.clienteForm = this.fb.group({
      email: [''],
      password: [''],
      name: [''],
      lastName: [''],
      phone: [''],
      dni: [''],
      address: ['']
    });
  }
  limpiarCampoPassword() {
    this.clienteForm.get('password')?.setValue('');
  }


  ngOnInit(): void {
    this.cargarClientes();
    this.suscription = this.clService.refresh$.subscribe(() => {
      this.cargarClientes();
    });

  }
  deleteClient(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      this.clService.deleteClient(id).subscribe(
        () => {
          console.log('Cliente eliminado exitosamente');
        },
        (error) => {
          console.error('Error al eliminar el cliente', error);
        }
      );
    }
  }
  cargarClientes(): void {
    this.clService.getClients().subscribe(
      (data) => {
        this.clientes = data;
        console.log('Cliente cargados:', this.clientes);
      },
      (error) => {
        console.error('Error al cargar los clientes', error);
      }
    );
  }

  abrirModal(cliente: any) {
    this.modalHeader = 'Editar Cliente';
    this.currentClienteId = cliente.id;
    this.clienteForm.patchValue(cliente);
    this.displayModal = true;
  }

  cerrarModal() {
    this.displayModal = false;
    this.clienteForm.reset();
    this.currentClienteId= 0;
  }
  showEditClientModal(cliente: any) {
    this.abrirModal(cliente);
  }
  onSubmit() {
    if (this.clienteForm.valid) {
      this.clService.updateClient( this.currentClienteId, this.clienteForm.value).subscribe(
        (response) => {
          console.log('cliente actualizado con éxito', response);

          this.cerrarModal();


        },
        (error) => {
          console.error('Error al actualizar el cliente', error);
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
