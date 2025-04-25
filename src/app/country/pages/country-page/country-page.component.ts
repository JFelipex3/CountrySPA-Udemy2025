import { Component, inject, resource } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryInformationComponent } from "./country-information/country-information.component";

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  // Se puede obtener de ActivatedRoute o pasar con input
  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  CountryService = inject(CountryService);

  countryResource = resource({
    request: () => ({code: this.countryCode}),
    loader: async ({ request }) => {
      return await firstValueFrom(
          this.CountryService.searchByAlphaCode(request.code)
      );
    }
  });
}
