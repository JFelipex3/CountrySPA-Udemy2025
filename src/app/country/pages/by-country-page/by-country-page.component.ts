import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

  countryServices = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal<string>( () => this.queryParam);

  countryResource = resource({
    request: () => ({ query: this.query()}),
    loader: async({request}) => {
      if (!request.query) return [];

      this.router.navigate(['country/by-country'], {
        queryParams: {
          query: request.query
        }
      });

      return await firstValueFrom(
        this.countryServices.searchByCountry(request.query)
      );
    }
  });

}

