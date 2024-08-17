import { ComponentFixture } from '@angular/core/testing';
import { findEl } from './find-el';

export function expectedText<T>(
  fixture: ComponentFixture<T>,
  testId: string,
  text: string,
) {
  const element = findEl(fixture, testId);
  const actualText = element.nativeElement.textContent;
  expect(actualText).toEqual(text);
}
