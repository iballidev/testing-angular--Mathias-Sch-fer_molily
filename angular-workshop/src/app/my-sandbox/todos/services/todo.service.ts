import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  async getTodos() {
    const response = await fetch('http://localhost:3100/todos/');

    try {
      console.log('response: ', await response.json());
    } catch (error) {
      console.error('error: ', error);
    }
  }
}
