import { Component, signal } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import type { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region-page',
  imports: [ListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  countries = signal<Country[]>([]);
}
