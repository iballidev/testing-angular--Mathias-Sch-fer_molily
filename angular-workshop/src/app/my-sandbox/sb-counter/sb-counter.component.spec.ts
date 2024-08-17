import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SbCounterComponent } from './sb-counter.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { testIdSelector } from '../spec-helpers/testId-selector';
import { findEl } from '../spec-helpers/find-el';
import { click } from '../spec-helpers/click';
import { expectedText } from '../spec-helpers/expected-text';

describe('SbCounterComponent', () => {
  let component: SbCounterComponent;
  let fixture: ComponentFixture<SbCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SbCounterComponent],
      imports: [FormsModule],
    }).compileComponents;

    fixture = TestBed.createComponent(SbCounterComponent);
    component = fixture.componentInstance;

    /**
const { debugElement } = fixture;
const { nativeElement } = debugElement;
console.log(nativeElement.tagName);
console.log(nativeElement.textContent);
console.log(nativeElement.innerHTML); */

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('increase count - without DOM element', () => {
    component.count = 0;
    component.increment();
    fixture.detectChanges();
    expect(component.count).toEqual(1);
  });

  xit('decrease count - without DOM element', () => {
    component.count = 1;
    component.decrement();
    fixture.detectChanges();
    expect(component.count).toEqual(0);
  });

  xit('reset count - without DOM element', () => {
    component.count = 20;
    component.resetCounter();
    fixture.detectChanges();
    expect(component.count).toEqual(0);
  });

  /** */

  it('increase count', () => {
    component.count = 0;
    // const { debugElement } = fixture;

    // const incrementBtn = debugElement.query(By.css(testIdSelector('increase-count-btn')));
    // const incrementBtn = findEl(fixture, 'increase-count-btn');
    click(fixture, 'increase-count-btn');

    // const screen = debugElement.query(By.css('.screen'));
    const screen = findEl(fixture, 'screen');
    // incrementBtn.triggerEventHandler('click', null);
    // console.log('screen: ', screen.nativeElement.textContent);
    fixture.detectChanges();
    click(fixture, 'increase-count-btn');
    // incrementBtn.triggerEventHandler('click', null);
    fixture.detectChanges();
    click(fixture, 'increase-count-btn');
    // incrementBtn.triggerEventHandler('click', null);
    fixture.detectChanges();
    // console.log('screen: ', screen.nativeElement.textContent);
    const actualText = screen.nativeElement.textContent;

    expect(component.count).toEqual(3);
    expect(actualText).toEqual('3');
  });

  it('decrease count', () => {
    component.count = 5;
    // const { debugElement } = fixture;

    // const decrementBtn = debugElement.query(By.css(testIdSelector('decrease-count-btn')));
    // const decrementBtn = findEl(fixture, 'decrease-count-btn');
    click(fixture, 'decrease-count-btn');
    // const screen = debugElement.query(By.css('.screen'));
    const screen = findEl(fixture, 'screen');
    // decrementBtn.triggerEventHandler('click', null);
    // console.log('screen: ', screen.nativeElement.textContent);
    fixture.detectChanges();
    // decrementBtn.triggerEventHandler('click', null);
    click(fixture, 'decrease-count-btn');
    fixture.detectChanges();
    // decrementBtn.triggerEventHandler('click', null);
    click(fixture, 'decrease-count-btn');
    fixture.detectChanges();
    // console.log('screen: ', screen.nativeElement.textContent);
    const actualText = screen.nativeElement.textContent;

    expect(component.count).toEqual(2);
    expect(actualText).toEqual('2');
  });

  it('reset count', () => {
    component.count = 5;
    // const { debugElement } = fixture;

    // const resetBtn = debugElement.query(By.css(testIdSelector('reset-count-btn')));
    // const resetBtn = findEl(fixture, 'reset-count-btn');
    // const screen = debugElement.query(By.css('.screen'));
    const screen = findEl(fixture, 'screen');
    // resetBtn.triggerEventHandler('click', null);
    click(fixture, 'reset-count-btn');
    fixture.detectChanges();
    // console.log('screen: ', screen.nativeElement.textContent);
    // const actualText = screen.nativeElement.textContent;

    expect(component.count).toEqual(0);
    // expect(actualText).toEqual('0');

    expectedText(fixture, 'screen', '0')
  });

  it('get value from input field', () => {
    // Act
    component.count = 0;
    // const { debugElement } = fixture;
    // const input = debugElement.query(By.css(testIdSelector('counter-input')));
    const input = findEl(fixture, 'counter-input');
    // const incrementBtn = debugElement.query(By.css(testIdSelector('increase-count-btn')));
    const incrementBtn = findEl(fixture, 'increase-count-btn');
    incrementBtn.triggerEventHandler('click', null);
    // console.log('screen: ', screen.nativeElement.textContent);
    fixture.detectChanges();
    incrementBtn.triggerEventHandler('click', null);
    fixture.detectChanges();
    incrementBtn.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Assert
    input.nativeElement.value = component.count;
    expect(input.nativeElement.value).toBe('3');
  });
});
