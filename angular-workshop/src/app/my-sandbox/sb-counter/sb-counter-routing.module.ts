import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SbCounterComponent } from './sb-counter.component';

const routes: Routes = [
  {
    path: '',
    component: SbCounterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SbCounterRoutingModule {}
