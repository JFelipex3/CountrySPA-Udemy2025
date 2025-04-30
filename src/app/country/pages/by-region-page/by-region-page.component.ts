import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import type { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/region.type';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  regionParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

  selectedRegion = linkedSignal<Region | null>( () =>
    this.regions.includes(this.regionParam as Region) ? this.regionParam as Region : null
  );

  selectRegion( region: Region ) {
    this.selectedRegion.set(region);
  }

  countryResource = resource({
    request: () => ({ region: this.selectedRegion() }),
    loader: async({request}) => {
      if (!request.region) return [];

      this.router.navigate(['country/by-region'], {
        queryParams: {
          region: request.region
        }
      });

      return await firstValueFrom(
        this.countryServices.searchByRegion(request.region)
      );
    }
  })

}
