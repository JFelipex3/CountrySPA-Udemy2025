import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';
import { ListComponent } from "../../components/list/list.component";

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countryServices = inject(CountryService);
  query = signal<string>('');

  countryResourse = resource({
    request: () => ({ query: this.query()}),
    loader: async({request}) => {
      if (!request.query) return [];

      return await firstValueFrom(
        this.countryServices.searchByCapital(request.query)
      );
    }
  })

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
