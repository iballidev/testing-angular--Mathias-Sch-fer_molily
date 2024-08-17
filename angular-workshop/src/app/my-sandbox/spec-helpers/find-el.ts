import { By } from '@angular/platform-browser';
import { testIdSelector } from './testId-selector';
import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

export function findEl<T>(
  fixture: ComponentFixture<T>,
  selector: string,
): DebugElement {
  const debugElement = fixture.debugElement.query(By.css(testIdSelector(selector)));

  if (!debugElement) throw new Error(`queryByCss: Element with ${selector} not found`);

  return debugElement;
}
