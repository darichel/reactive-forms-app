import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  public formUtils = FormUtils;

  public myForm: FormGroup = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.pattern(this.formUtils.namePattern)],
    ],
    email: [
      '',
      [Validators.required, Validators.pattern(this.formUtils.emailPattern)],
      [ this.formUtils.checkingServerResponse ]
    ],
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.formUtils.notOnlySpacesPattern),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirmation: ['', Validators.required],
  }, {
    validators: [this.formUtils.isFieldOneEqualFieldTwo('password', 'passwordConfirmation')]
  });



  onSubmit() {
    if (this.myForm.valid) {
      this.myForm.reset();
    } else {
      this.myForm.markAllAsTouched();
    }
  }
}
