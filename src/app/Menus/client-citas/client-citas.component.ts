import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-citas',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule,RouterModule],
  templateUrl: './client-citas.component.html',
  styleUrl: './client-citas.component.scss'
})
export class ClientCitasComponent {

}
