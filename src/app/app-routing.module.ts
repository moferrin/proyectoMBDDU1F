import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { SigninComponent } from './components/signin/signin.component';
import { AuthGuard } from './auth.guard';
import { FacturacionComponent } from './components/facturacion/facturacion.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { SignupComponent } from './components/signup/signup.component';
import { Reporte1Component } from './components/reportes/reporte1/reporte1.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  },
  {
    path: 'facturacion', 
    component: FacturacionComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'productos', 
    component: ProductosComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'clientes', 
    component: ClientesComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'proveedores', 
    component: ProveedoresComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'reporte1', 
    component: Reporte1Component, 
    canActivate: [AuthGuard]
  },
  {
    path: 'signin', 
    component: SigninComponent
  },
  {
    path: 'signup', 
    component: SignupComponent
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
