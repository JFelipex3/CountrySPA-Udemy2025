import { Component, inject, signal } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryService } from '../../services/country.service';
import type { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [ListComponent, SearchInputComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countryServices = inject(CountryService);

  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  onSearch( query: string ) {
    console.log({query});

    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.countryServices.searchByCapital(query)
      .subscribe(countries => {
        this.isLoading.set(false);
        this.countries.set(countries);

        console.log({countries});
      });
  }
}
