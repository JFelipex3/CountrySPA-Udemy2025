import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper {

  static mapRestCountryToCountry( restCountry: RESTCountry): Country {
    return {
      capital: restCountry.capital?.length ? restCountry.capital.join(', ') : 'No capital',
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      escudo: restCountry.coatOfArms.svg,
      name: restCountry.name.common,
      nameSpanish: restCountry.translations['spa'].common ?? 'No Spanish name',
      population: restCountry.population,
      region: restCountry.region,
      subregion: restCountry.subregion,
      area: restCountry.area
    };
  }

  static mapRestCountryArrayToCountryArray( restCountries: RESTCountry[]): Country[] {
    return restCountries.map(this.mapRestCountryToCountry);
  }
}
