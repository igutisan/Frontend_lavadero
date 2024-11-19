import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-planes',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule,RouterModule],
  templateUrl: './menu-planes.component.html',
  styleUrl: './menu-planes.component.scss'
})
export class MenuPlanesComponent {

}
