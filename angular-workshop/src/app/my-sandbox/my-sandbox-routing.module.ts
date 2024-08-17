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
        loadChildren: () => import('./todos/todos.module').then((m) => m.TodosModule),
      },
      {
        path: 'counter',
        loadChildren: () =>
          import('./sb-counter/sb-counter.module').then((m) => m.SbCounterModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MySandboxRoutingModule {}
