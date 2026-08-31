import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { CreateProductRequest } from '../../../../core/models/product.model';
import { httpUrlValidator } from '../../../../shared/validators';

@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    MessageModule,
    SelectModule,
    TextareaModule,
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductForm {
  readonly #formBuilder = inject(FormBuilder);
  readonly #host = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly #submitted = signal(false);

  readonly categories = input<readonly string[]>([]);
  readonly categoriesLoading = input(false);
  readonly submitting = input(false);
  readonly productSubmit = output<CreateProductRequest>();

  protected readonly categoryOptions = computed(() => [...this.categories()]);

  protected readonly form = this.#formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    category: ['', Validators.required],
    image: ['', [Validators.required, httpUrlValidator]],
  });

  protected submit(): void {
    if (this.submitting()) {
      return;
    }

    this.#submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      const firstInvalidControl = Object.entries(this.form.controls).find(
        ([, control]) => control.invalid,
      )?.[0];
      if (firstInvalidControl) {
        this.#host.nativeElement.querySelector<HTMLElement>(`#${firstInvalidControl}`)?.focus();
      }
      return;
    }

    this.productSubmit.emit(this.form.getRawValue());
  }

  protected showError(controlName: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || this.#submitted());
  }

  protected hasError(controlName: keyof typeof this.form.controls, errorName: string): boolean {
    return this.form.controls[controlName].hasError(errorName);
  }
}
