import { DebugElement } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CreateProductRequest } from '../../../../core/models/product.model';
import { ProductForm } from './product-form';

describe('ProductForm', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ProductForm] }).compileComponents();
  });

  it('shows required validation and prevents an invalid submission', () => {
    const fixture = TestBed.createComponent(ProductForm);
    fixture.detectChanges();
    const emitted: CreateProductRequest[] = [];
    fixture.componentInstance.productSubmit.subscribe((value) => emitted.push(value));

    submitForm(fixture.nativeElement as HTMLElement);
    fixture.detectChanges();

    expect(emitted).toHaveLength(0);
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Title is required.');
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Category is required.');
  });

  it('rejects a zero price', () => {
    const fixture = TestBed.createComponent(ProductForm);
    fixture.detectChanges();
    const priceControl = fixture.debugElement
      .query(By.css('p-inputnumber'))
      .injector.get(NgControl);
    priceControl.control?.markAsTouched();
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Price must be greater than 0.',
    );
  });

  it('emits a strongly typed request for valid input', () => {
    const fixture = TestBed.createComponent(ProductForm);
    fixture.detectChanges();
    const request: CreateProductRequest = {
      title: 'Desk lamp',
      price: 32.5,
      description: 'A dimmable desk lamp for focused work.',
      category: 'electronics',
      image: 'https://example.com/lamp.jpg',
    };
    const emitted: CreateProductRequest[] = [];
    fixture.componentInstance.productSubmit.subscribe((value) => emitted.push(value));
    setControlValue(fixture.debugElement, '[formControlName="title"]', request.title);
    setControlValue(fixture.debugElement, 'p-inputnumber', request.price);
    setControlValue(fixture.debugElement, '[formControlName="description"]', request.description);
    setControlValue(fixture.debugElement, 'p-select', request.category);
    setControlValue(fixture.debugElement, '[formControlName="image"]', request.image);
    submitForm(fixture.nativeElement as HTMLElement);

    expect(emitted).toEqual([request]);
  });
});

function setControlValue(root: DebugElement, selector: string, value: string | number): void {
  root.query(By.css(selector)).injector.get(NgControl).control?.setValue(value);
}

function submitForm(element: HTMLElement): void {
  element.querySelector('form')?.dispatchEvent(new Event('submit'));
}
