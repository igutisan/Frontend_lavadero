import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-usuarios',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule,RouterModule],
  templateUrl: './menu-usuarios.component.html',
  styleUrl: './menu-usuarios.component.scss'
})
export class MenuUsuariosComponent {

}
