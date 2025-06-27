import { routes } from './../../app.routes';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder,  AbstractControl, FormGroup, Validators,ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { ClientsService } from '../../Services/clients/clients.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';



export function passwordMatchValidator(): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value; // Asegúrate de que el nombre sea correcto

    return password === confirmPassword ? null : { notMatching: true };
  };
}



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  clientForm: FormGroup;

  constructor(private fb: FormBuilder, private client: ClientsService, private toastr: ToastrService, private router: Router ) {
    this.clientForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required]],
      dni: ['', Validators.required]
    }, { validators: passwordMatchValidator() });

  }
  async onSubmit() {
console.log(this.clientForm.value);

    if (this.clientForm.valid) {
      try {
        const response = await firstValueFrom(this.client.createClient(this.clientForm.value));
        this.toastr.success('Usuario registrado exitosamente!', '¡Éxito!');
        this.router.navigate(['/login'])
      } catch (error) {
        console.error('Error creating user', error);
        this.toastr.error('Hubo un problema al registrar el usuario', 'Error');
      }
    } else {
      alert('Please fill in all fields correctly.');
    }
  }

}
