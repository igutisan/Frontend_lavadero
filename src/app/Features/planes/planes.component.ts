import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,  FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PlansService } from '../../Services/Plans/plans.service';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.scss'
})
export class PlanesComponent {
  planForm: FormGroup;

  constructor(private fb: FormBuilder, private plan: PlansService, private toastr: ToastrService) {
    this.planForm = this.fb.group({
      name: ['', [Validators.required,]],
      description: ['', Validators.required],
      photo: [null],
      price: ['', Validators.required],

    });

  }

  async onSubmit() {

    const value = this.planForm.get('photo')?.value;
    if (value === '') {
      this.planForm.get('photo')?.setValue(null);
    }
    if (this.planForm.valid) {

      try {
        const response = await firstValueFrom(this.plan.createPlans(this.planForm.value));
        this.toastr.success('Plan creado con exito', '¡Éxito!');
        console.log('plan created successfully', response);
        this.resetForm();
      } catch (error) {
        this.toastr.error('Hubo un problema al crear el plan', 'Error');
        console.error('Error creating plan', error);
      }
    } else {
      alert('Please fill in all fields correctly.');
    }
  }
  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
  resetForm(): void {
    this.planForm.reset({
      name: null,
      description: null,
      price: null,
      photo: null
    });
  }

}
