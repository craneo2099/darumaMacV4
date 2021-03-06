import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio-login',
    pathMatch: 'full'
  },
  {
    path: 'acerca',
    loadChildren: () => import('./pages/acerca/acerca.module').then( m => m.AcercaPageModule)
  },
  {
    path: 'add-daruma-qr',
    loadChildren: () => import('./pages/add-daruma-qr/add-daruma-qr.module').then( m => m.AddDarumaQrPageModule)
  },
  {
    path: 'ajustes',
    loadChildren: () => import('./pages/ajustes/ajustes.module').then( m => m.AjustesPageModule)
  },
  {
    path: 'cambio-pass',
    loadChildren: () => import('./pages/cambio-pass/cambio-pass.module').then( m => m.CambioPassPageModule)
  },
  {
    path: 'darumas-gral',
    loadChildren: () => import('./pages/darumas-gral/darumas-gral.module').then( m => m.DarumasGralPageModule)
  },
  {
    path: 'detalle-daruma',
    loadChildren: () => import('./pages/detalle-daruma/detalle-daruma.module').then( m => m.DetalleDarumaPageModule)
  },
  {
    path: 'formulario-daruma',
    loadChildren: () => import('./pages/formulario-daruma/formulario-daruma.module').then( m => m.FormularioDarumaPageModule)
  },
  {
    path: 'inicio-login',
    loadChildren: () => import('./pages/inicio-login/inicio-login.module').then( m => m.InicioLoginPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
