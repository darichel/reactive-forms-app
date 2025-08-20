import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder);
  public formUtils = FormUtils;
  public newFavorite = this.fb.control('', [
    Validators.required,
    Validators.minLength(2),
  ]);

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['Metal Gear Solid', [Validators.required, Validators.minLength(2)]],
        ['Final Fantasy VII', [Validators.required, Validators.minLength(2)]],
      ],
      Validators.minLength(2)
    ),
  });

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites() {
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;

    this.favoriteGames.push(
      this.fb.control(newGame, [
        Validators.required,
        Validators.minLength(2),
      ])
    );

    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
