import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbCounterRoutingModule } from './sb-counter-routing.module';
import { SbCounterComponent } from './sb-counter.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SbCounterComponent],
  imports: [CommonModule, SbCounterRoutingModule, FormsModule],
})
export class SbCounterModule {}
