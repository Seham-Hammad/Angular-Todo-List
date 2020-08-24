import { Todo } from './../Models/Todo';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'applicatin/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  url: string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit = '?_limit=10';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.url}${this.todosLimit}`);
  }
  toggleCompleted(todo: Todo): Observable<any> {
    const urlById = `${this.url}/${todo.id}`;
    return this.http.put(urlById, todo, httpOptions);
  }
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.url, todo, httpOptions);
  }
  deleteTodo(todo: Todo): Observable<Todo> {
    const urlById = `${this.url}/${todo.id}`;
    return this.http.delete<Todo>(urlById, httpOptions);
  }
}
