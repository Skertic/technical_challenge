import { AbstractControl, ValidationErrors } from '@angular/forms';

export function httpUrlValidator(control: AbstractControl<string>): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  try {
    const url = new URL(control.value);
    return url.protocol === 'http:' || url.protocol === 'https:' ? null : { url: true };
  } catch {
    return { url: true };
  }
}
