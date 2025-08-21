import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  private fb = inject(FormBuilder);
  private countryService = inject(CountryService);

  public regions = signal(this.countryService.regions);
  public countries = signal<Country[]>([]);
  public borders = signal<Country[]>([]);

  public myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  onFormChanged = effect((onCleanUp) => {
    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();

    onCleanUp(() => {
      console.log('Unsuscribed');
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
    });
  });

  onRegionChanged() {
    return this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => this.myForm.get('border')!.setValue('')),
        tap(() => {
          this.countries.set([]);
          this.borders.set([]);
        }),
        switchMap((region) => this.countryService.getCountriesByRegion(region!))
      )
      .subscribe((countries) => {
        this.countries.set(countries);
      });
  }

  onCountryChanged() {
    return this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        filter((value) => value!.length > 0),
        switchMap((alphacode) =>
          this.countryService.getCountryByAlphaCode(alphacode ?? '')
        ),
        switchMap((country) =>
          this.countryService.getCountriesBordersByCode(country.borders)
        )
      )
      .subscribe((borders) => {
        this.borders.set(borders);
      });
  }
}
