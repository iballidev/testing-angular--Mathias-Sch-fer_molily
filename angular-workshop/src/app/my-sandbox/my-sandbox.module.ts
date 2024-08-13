import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MySandboxRoutingModule } from './my-sandbox-routing.module';
import { TodosComponent } from './todos/todos.component';
import { MySandboxComponent } from './my-sandbox.component';
import { TodoService } from './todos/services/todo.service';

@NgModule({
  declarations: [TodosComponent, MySandboxComponent],
  imports: [CommonModule, MySandboxRoutingModule],
  providers: [TodoService],
})
export class MySandboxModule {}
