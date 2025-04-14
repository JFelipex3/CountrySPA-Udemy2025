import { Routes } from "@angular/router";
import { ByCapitalPageComponent } from "./pages/by-capital-page/by-capital-page.component";

export const countryRoutes: Routes = [
  {path: '', component: ByCapitalPageComponent}
];

//Necesario para realizar exportación por defecto y no usar .then en app.routes.ts
export default countryRoutes;
