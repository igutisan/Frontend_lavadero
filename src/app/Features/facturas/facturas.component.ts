import { ReceiptsService } from './../../Services/receipts/receipts.service';


import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormsModule, ReactiveFormsModule, FormArray } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';
@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, DropdownModule, CommonModule],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.scss'
})
export class FacturasComponent implements OnInit{
  services: any[] = [];
  totalFactura: number = 0;

  constructor(private router: Router,
    private receiptService: ReceiptsService
  ) {}

  ngOnInit(): void {
    const serviciosGuardados = localStorage.getItem('serviciosSeleccionados');
    const totalGuardado = localStorage.getItem('totalFactura');

    if (serviciosGuardados) {
      const data = JSON.parse(serviciosGuardados);

      let total = 0

      data.forEach((entry: any) => {
        const userId = entry.idUser?.id;
        const clientId = entry.idClient?.id;
        const planId = entry.idPlan?.id;

        console.log('Entry:', entry);  

        if (userId && clientId && planId) {
          this.receiptService.getUserById(userId).subscribe(
            (user) => entry.user = user,
            (error) => console.error('Error al obtener usuario:', error)
          );

          this.receiptService.getClientById(clientId).subscribe(
            (client) => entry.client = client,
            (error) => console.error('Error al obtener cliente:', error)
          );

          this.receiptService.getPlanById(planId).subscribe(
            (plan) => {
              entry.plan = plan;
              this.services.push(entry);
              total += plan.price;

              this.totalFactura = total;

            },
            (error) => console.error('Error al obtener plan:', error)
          );
        } else {
          console.error('IDs faltantes en el entry:', entry);
        }
      });

    if (totalGuardado) {
      this.totalFactura = +totalGuardado;
    }
  }
}

  imprimirFactura(): void {
    window.print();
  }

  volverMenu(): void {
    this.router.navigate(['/']);
  }
}
