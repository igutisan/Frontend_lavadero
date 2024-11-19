import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {RouterModule } from '@angular/router';
@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule,CardModule, ButtonModule,RouterModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {

}
