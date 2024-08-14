import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public baseUrl: string = 'http://localhost:3000';
  constructor(
    private http: HttpClient,
  )
  {}

  async getTodos(): Promise<any> {
    const response = await fetch(this.baseUrl + '/todos');
    // if (!response.ok) {
    //   throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    // }
    try {
      const data = await response.json();
      console.log('response: ', data);
      return data;
    } catch (error) {
      console.error('error: ', error);
    }

    return [];
  }
}
