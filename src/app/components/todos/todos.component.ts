import { Component, OnInit } from '@angular/core';
import { Todo } from '../../Models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor(private service: TodoService) {}

  ngOnInit(): void {
    this.service.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }
  deleteTodo(todo: Todo) {
    /* let index = this.todos.indexOf(todo);
    this.todos.splice(index, 1); */

    //delet with filter method
    this.todos = this.todos.filter((t) => t.id !== todo.id);
    //to delete it from the server
    this.service.deleteTodo(todo).subscribe();
  }
  addTodo(todo: Todo) {
    this.service.addTodo(todo).subscribe((todod) => {
      this.todos.push(todo);
    });
  }
}
