import { FormGroup } from "@angular/forms";

export class FormUtils {

  static isValidField(form: FormGroup, field: string): boolean | null {
    return !!form.controls[field].errors && form.controls[field].touched;
  }

  static getFieldError(form: FormGroup, field: string): string | null {
    const errors = form.controls[field].errors;
    if (errors?.['required']) return 'Este campo es requerido.';
    if (errors?.['minlength']) return `El mínimo es de ${errors['minlength'].requiredLength} caracteres.`;
    if (errors?.['min']) return `El valor mínimo es ${errors['min'].min}.`;
    return null;
  }

}
