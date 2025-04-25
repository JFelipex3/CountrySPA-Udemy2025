import { Component, inject, resource, signal } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import type { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/region.type';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  imports: [ListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryServices = inject(CountryService);

  selectedRegion = signal<Region | null>(null);

  selectRegion( region: Region ) {
    this.selectedRegion.set(region);
  }

  countryResource = resource({
    request: () => ({ region: this.selectedRegion() }),
    loader: async({request}) => {
      if (!request.region) return [];

      return await firstValueFrom(
        this.countryServices.searchByRegion(request.region)
      );
    }
  })

}
