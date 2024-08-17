import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: any;
  constructor(private todoSvc: TodoService) {}

  ngOnInit(): void {
    this.todoSvc
      .getTodos()
      .then((response: any) => {
        console.log('response: ', response);
        this.todos = response;
      })
      .catch((err: any) => {
        console.log('error: ', err);
      });
  }
}
