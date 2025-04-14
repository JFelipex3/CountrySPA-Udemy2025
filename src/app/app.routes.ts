import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'country', loadChildren: () => import('./country/country.routes') }, // Si no se indica exports por defecto se debe usar .then
  { path: '**', redirectTo: '' } // Redirecciona a la pagina del path vacío
];
