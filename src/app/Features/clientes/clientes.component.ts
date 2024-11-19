import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder,  AbstractControl, FormGroup, Validators,ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { ClientsService } from '../../Services/clients/clients.service';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


export function passwordMatchValidator(): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value; // Asegúrate de que el nombre sea correcto

    return password === confirmPassword ? null : { notMatching: true };
  };
}


@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {
  clientForm: FormGroup;

  constructor(private fb: FormBuilder, private client: ClientsService, private toastr: ToastrService) {
    this.clientForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      dni: ['', Validators.required]
    }, { validators: passwordMatchValidator() });

  }

  async onSubmit() {
    console.log(this.clientForm.value);

    if (this.clientForm.valid) {
      try {
        const response = await firstValueFrom(this.client.createClient(this.clientForm.value));
        this.toastr.success('Cliente creado exitosamente!', '¡Éxito!');
        console.log('User created successfully', response);
      } catch (error) {
        console.error('Error creating user', error);
        this.toastr.error('Hubo un problema al crear el cliente', 'Error');
      }
    } else {
      this.toastr.error('Please fill in all fields correctly', 'Error');
     // alert('Please fill in all fields correctly.');
    }
  }
}
