import { ComponentFixture } from '@angular/core/testing';
import { findEl } from './find-el';
import { makeClickEvent } from './make-click-event';

export function click<T>(fixture: ComponentFixture<T>, testId: string): void {
  const element = findEl(fixture, testId);
  const event = makeClickEvent(element.nativeElement);
  element.triggerEventHandler('click', event);
}
