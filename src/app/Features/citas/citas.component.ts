import { AppointmentsService } from './../../Services/appointments/appointments.service';
import { AuthService } from './../../Services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,  AbstractControl, FormGroup, Validators,ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {Router } from '@angular/router';
@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.scss'
})
export class CitasComponent implements OnInit {

    appointForm: FormGroup;

    constructor(
      private authService: AuthService,
      private fb: FormBuilder,
      private appointmentsService: AppointmentsService,
      private toastr: ToastrService,
      private router:Router

    ) {
      this.appointForm = this.fb.nonNullable.group({
        date: ['', Validators.required],
        description: ['', Validators.required],
        status: ['Pendiente'],
        client: null
      });
    }


    ngOnInit(): void {
      const token = this.authService.getToken();
      if (token) {
        const userId = this.authService.getId(token);
        if (userId) {
          this.appointForm.patchValue({ client: { id: Number(userId) } });
        }
      }
    }

    async onSubmit() {
      console.log(this.appointForm.value);

      if (this.appointForm.valid) {
        try {
          const response = await firstValueFrom(
            this.appointmentsService.createService(this.appointForm.value)
          );
          this.toastr.success('Cita creada exitosamente!', '¡Éxito!');
          console.log('Cita creada:', response);
          this.router.navigate(['/menuClient']);


        } catch (error) {
          console.error('Error al crear la cita', error);
          this.toastr.error('Hubo un problema al crear la cita', 'Error');
        }
      } else {
        alert('Por favor, completa todos los campos correctamente.');
      }
    }
  }


