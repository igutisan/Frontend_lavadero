

import { Routes } from '@angular/router';
import { MenuComponent } from './Core/menu/menu.component';
import { MenuUsuariosComponent } from './Menus/menu-usuarios/menu-usuarios.component';
import { MenuClientesComponent } from './Menus/menu-clientes/menu-clientes.component';
import { MenuPlanesComponent } from './Menus/menu-planes/menu-planes.component';
import {ClientCitasComponent} from './Menus/client-citas/client-citas.component';
import{ClientComponent} from './Menus/client/client.component';
import { UsuariosComponent } from './Features/usuarios/usuarios.component';
import { ClientesComponent } from './Features/clientes/clientes.component';
import { PlanesComponent } from './Features/planes/planes.component';
import { ServiciosComponent } from './Features/servicios/servicios.component';
import { FacturasComponent } from './Features/facturas/facturas.component';
import { ListaClientesComponent } from './Listas/lista-clientes/lista-clientes.component';
import { ListaUsuariosComponent } from './Listas/lista-usuarios/lista-usuarios.component';
import { ListaPlanesComponent } from './Listas/lista-planes/lista-planes.component';
import { ListaFacturasComponent } from './Listas/lista-facturas/lista-facturas.component';
import { ListaCitasComponent } from './Listas/lista-citas/lista-citas.component';
import {ClientCitasListComponent } from './Listas/client-citas-list/client-citas-list.component';
import { ClientsPlanesComponent } from './Core/clients-planes/clients-planes.component';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { AuthGuard } from './Services/guards/auth.guard';
import { AuthenticatedGuard } from './Services/guards/authenticated.guard';
import { CitasComponent } from './Features/citas/citas.component';



export const routes: Routes = [
  {path: 'menu', component: MenuComponent,canActivate:[AuthGuard], data: { role: 'Administrador' },},
  {path: 'menu/usuarios', component: MenuUsuariosComponent, canActivate:[AuthGuard], data: { role: 'Administrador' },},
  {path: 'menu/clientes', component: MenuClientesComponent,canActivate:[AuthGuard], data: { role: 'Administrador' },},
  {path: 'menu/planes', component: MenuPlanesComponent,canActivate:[AuthGuard], data: { role: 'Administrador' },},
  {path: 'menu/citas', component: ClientCitasComponent,canActivate:[AuthGuard], data: { role: 'CLIENT' },},
  {path: 'usuarios/create', component: UsuariosComponent,canActivate:[AuthGuard], data: { role: 'Administrador' }},
  {path: 'usuarios/list', component: ListaUsuariosComponent,canActivate:[AuthGuard], data: { role: 'Administrador' },},
  {path: 'clientes/create', component: ClientesComponent,canActivate:[AuthGuard], data: { role: 'Administrador' },},
  {path: 'clientes/list', component: ListaClientesComponent,canActivate:[AuthGuard], data: { role: 'Administrador' }},
  {path: 'planes/create', component: PlanesComponent,canActivate:[AuthGuard], data: { role: 'Administrador' }},
  {path: 'planes/list', component: ListaPlanesComponent,canActivate:[AuthGuard], data: { role: 'Administrador' }},
  {path: 'servicios/create', component: ServiciosComponent,canActivate:[AuthGuard], data: { role: 'Administrador' }},
  {path: 'servicios/factura', component: FacturasComponent,canActivate:[AuthGuard], data: { role: 'Administrador' }},
  {path: 'facturas/list', component: ListaFacturasComponent,canActivate:[AuthGuard], data: { role: 'Administrador' }},
  {path: 'citas/create', component: CitasComponent,data: { role: 'CLIENT' }  },
  {path: 'citas/lista', component: ClientCitasListComponent,data: { role: 'CLIENT' }  },

  {path: 'citas/list', component: ListaCitasComponent, data: { role: 'Administrador' } },

  {path: 'login', component: LoginComponent, canActivate:[AuthenticatedGuard] },
  {path: 'register', component: RegisterComponent },
  {path: 'menuClient', component: ClientComponent,  canActivate:[AuthGuard],data: { role: 'CLIENT' } },
  {path: 'client/planes', component: ClientsPlanesComponent,canActivate:[AuthGuard], data: { role: 'CLIENT' }},
  { path: 'unauthorized',component: UsuariosComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/menu' }


];
