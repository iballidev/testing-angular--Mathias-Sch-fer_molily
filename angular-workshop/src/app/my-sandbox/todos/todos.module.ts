import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';

@NgModule({
  declarations: [TodoListComponent],
  imports: [CommonModule, TodosRoutingModule],
})
export class TodosModule {}
