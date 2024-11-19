import { ReceiptsService } from './../../Services/receipts/receipts.service';
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
import { GalleriaThumbnails } from 'primeng/galleria';

@Component({
  selector: 'app-lista-facturas',
  standalone: true,
  imports: [CommonModule,CardModule, ButtonModule,TableModule,FormsModule,ReactiveFormsModule, DialogModule, RouterModule],
  templateUrl: './lista-facturas.component.html',
  styleUrl: './lista-facturas.component.scss'
})
export class ListaFacturasComponent implements OnInit {
  receiptDetails : any[] = [];
  receipts: any[] = [];
  displayModal: boolean = false;
  modalHeader : string = '';
  currentReceiptId: number =0;
  subscription: Subscription = new Subscription();


  constructor( private receiptService: ReceiptsService){}

  ngOnInit(): void {
    this.receiptService.getReceiptsHistory().subscribe((data) => {
      this.receipts  = data;
    });
  }

  loadReceipt(idReceipt: number): void {
    this.receiptService.getReceiptDetails(idReceipt).subscribe({
      next: (details) => {
        this.receiptDetails = details;
        this.showReceiptModal();
      },
      error: (error) => {
        console.error('Error loading receipt details:', error);
      }
    });
  }

showReceiptModal(): void{
  this.displayModal= true;

}
closeModal():void {
  this.displayModal = false;
  this.receiptDetails =[];
}
getTotalPrice(): number {
  return this.receiptDetails.reduce((total, item) => total + item.total, 0);
}
deleteReceipt(id: number) {
  if (confirm('¿Estás seguro de que deseas eliminar esta factura?')) {
    this.receiptService.deleteReceipt(id).subscribe(
      () => {
        console.log('factura eliminada exitosamente');
      },
      (error) => {
        console.error('Error al eliminar la factura', error);
      }
    );
  }
}


}
