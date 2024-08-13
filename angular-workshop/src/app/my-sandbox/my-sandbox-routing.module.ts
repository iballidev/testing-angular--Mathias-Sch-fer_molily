import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MySandboxComponent } from './my-sandbox.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  {
    path: '',
    component: MySandboxComponent,
    children: [
      {
        path: '',
        component: TodosComponent,
      },
      {
        path: 'todos',
        component: TodosComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MySandboxRoutingModule {}
