import { Routes } from "@angular/router";
import { ByCapitalPageComponent } from "./pages/by-capital-page/by-capital-page.component";
import { CountryLayoutComponent } from "./layouts/CountryLayout/CountryLayout.component";

export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryLayoutComponent,
    children: [
      {path: 'by-capital', component: ByCapitalPageComponent},
      {path: '**', redirectTo: 'by-capital'},
    ]
  },
];

//Necesario para realizar exportación por defecto y no usar .then en app.routes.ts
export default countryRoutes;
