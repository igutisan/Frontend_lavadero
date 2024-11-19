import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormBuilder, FormGroup, Validators,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../Services/users/users.service';
import { DialogModule } from 'primeng/dialog';
import {RouterModule } from '@angular/router';



@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule,CardModule, ButtonModule,TableModule,FormsModule,ReactiveFormsModule, DialogModule, RouterModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.scss'
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  userForm: FormGroup;
  displayModal: boolean = false;
  modalHeader: string = '';
  currentUserId:number= 0;

  constructor(private fb: FormBuilder, private userService: UsersService) {
    this.userForm = this.fb.group({
      email: [''],
      password: [''],
      confirmPassword: [''],
      role: [''],
      name: [''],
      lastName: [''],
      phone: [''],
      salary: [''],
      dni: [''],
      address: ['']
    });
  }
  limpiarCampoPassword() {
    this.userForm.get('password')?.setValue('');
  }
  deleteUser(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          console.log('Usuario eliminado exitosamente');
        },
        (error) => {
          console.error('Error al eliminar el usuario', error);
        }
      );
    }
  }

  ngOnInit(): void {
    this.cargarUsuarios();

  }
  cargarUsuarios(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.usuarios = data;
        console.log('Usuarios cargados:', this.usuarios);
      },
      (error) => {
        console.error('Error al cargar los usuarios', error);
      }
    );
  }

  abrirModal(usuario: any) {
    this.modalHeader = 'Editar Usuario';
    this.currentUserId = usuario.id;
    this.userForm.patchValue(usuario);
    this.displayModal = true;
  }

  cerrarModal() {
    this.displayModal = false;
    this.userForm.reset();
    this.currentUserId = 0;
  }
  showEditUserModal(user: any) {
    this.abrirModal(user);
  }
  onSubmit() {
    if (this.userForm.valid) {
      this.userService.updateUser( this.currentUserId, this.userForm.value).subscribe(
        (response) => {
          console.log('Usuario actualizado con éxito', response);

          this.cerrarModal();
          this.ngOnInit();

        },
        (error) => {
          console.error('Error al actualizar el usuario', error);
        }
      );
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

  /*actualizarUsuario(): void {
    if (this.editForm.valid && this.selectedUserId) {
      this.userService.updateUser(this.selectedUserId, this.editForm.value).subscribe(
        (response) => {
          console.log('Usuario actualizado:', response);
          this.cargarUsuarios(); // Recargar la lista de usuarios
          this.cancelarEdicion(); // Limpiar formulario y ocultar
        },
        (error) => {
          console.error('Error al actualizar el usuario', error);
        }
      );
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
  cancelarEdicion(): void {
    this.selectedUserId = null; // Resetear el ID seleccionado
    this.editForm.reset(); // Limpiar el formulario
  }*/
}
