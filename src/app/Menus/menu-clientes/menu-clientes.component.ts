import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-clientes',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule,RouterModule],
  templateUrl: './menu-clientes.component.html',
  styleUrl: './menu-clientes.component.scss'
})
export class MenuClientesComponent {

}
