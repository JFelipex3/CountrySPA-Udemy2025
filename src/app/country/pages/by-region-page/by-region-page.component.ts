import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/region.type';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam( queryParam: string): Region {
  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic'
  };

  return validRegions[queryParam.toLowerCase()] || 'Africa';
}

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

  selectedRegion = linkedSignal<Region | null>( () => validateQueryParam(this.regionParam) );

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
