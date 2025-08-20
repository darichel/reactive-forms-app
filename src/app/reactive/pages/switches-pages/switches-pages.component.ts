import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-pages',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-pages.component.html',
})
export class SwitchesPagesComponent {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;
  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }

}
