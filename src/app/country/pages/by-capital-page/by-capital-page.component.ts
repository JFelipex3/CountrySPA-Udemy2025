import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryService } from '../../services/country.service';
import { ListComponent } from "../../components/list/list.component";
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countryServices = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal<string>(() => this.queryParam);

  countryResource = resource({
    request: () => ({ query: this.query()}),
    loader: async({request}) => {
      if (!request.query) return [];

      // Define los parameters de la URL navegando a la nueva página
      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          // Se pueden agregar más parámetros
          query: request.query
        }
      });

      return await firstValueFrom(
        this.countryServices.searchByCapital(request.query)
      );
    }
  });

  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch( query: string ) {
  //   console.log({query});

  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryServices.searchByCapital(query)
  //     .subscribe({
  //       next: (countries) => {
  //         this.isLoading.set(false);
  //         this.countries.set(countries);
  //       },
  //       error: (err) => {
  //         this.isLoading.set(false);
  //         this.countries.set([]);
  //         this.isError.set(err);
  //       }
  //     });
  // }


}

