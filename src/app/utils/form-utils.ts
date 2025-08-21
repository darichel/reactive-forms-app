import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {
  //Expresiones regulares
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static isValidField(form: FormGroup, field: string): boolean | null {
    return !!form.controls[field].errors && form.controls[field].touched;
  }

  static getFieldError(form: FormGroup, field: string): string | null {
    if (!form.controls[field]) return null;
    const errors = form.controls[field].errors ?? {};
    return this.getErrorMessage(errors);
  }

  static isValidFieldInArray(
    formArray: FormArray,
    index: number
  ): boolean | null {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    if (formArray.controls.length == 0) return null;
    const errors = formArray.controls[index].errors ?? {};
    return this.getErrorMessage(errors);
  }

  private static getErrorMessage(errors: ValidationErrors): string | null{
    for (let key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido.';
        case 'minlength':
          return `El mínimo es de ${errors['minlength'].requiredLength} caracteres.`;
        case 'min':
          return `El valor mínimo es ${errors['min'].min}.`;
        case 'email':
          return 'El formato del email es inválido.';
        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return `El formato es inválido. Se esperaba: xxx@yyy.zzz`;
          }
          return 'El formato es inválido.';
        default:
          return 'Error desconocido.';
      }
    }
    return null;
  }
}
