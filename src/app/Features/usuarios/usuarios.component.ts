import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../Services/users/users.service';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private user: UsersService, private toastr: ToastrService) {
    this.userForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: ['', Validators.required],
      role: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      salary: [0, Validators.required],
      dni: ['', Validators.required]
    });

  }passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  async onSubmit() {


    if (this.userForm.valid) {
      try {
        const response = await firstValueFrom(this.user.createUser(this.userForm.value));
        this.toastr.success('Usuario creado exitosamente!', '¡Éxito!');
        this.userForm.reset();
        console.log('User created successfully', response);
      } catch (error) {
        this.toastr.error('Hubo un problema al crear el usuario', 'Error');
        console.error('Error creating user', error);
      }
    } else {
      alert('Please fill in all fields correctly.');
    }
  }

}
