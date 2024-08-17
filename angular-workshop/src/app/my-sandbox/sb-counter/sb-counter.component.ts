import { Component } from '@angular/core';

@Component({
  selector: 'app-sb-counter',
  templateUrl: './sb-counter.component.html',
  styleUrls: ['./sb-counter.component.css'],
})
export class SbCounterComponent {
  count = 5;

  decrement() {
    if (this.count) {
      --this.count;
    }
  }
  updateCounter() {}
  increment() {
    this.count++;
  }
  resetCounter() {
    this.count = 0;
  }
}
