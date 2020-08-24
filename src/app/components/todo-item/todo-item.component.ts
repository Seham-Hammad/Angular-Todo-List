import { TodoService } from 'src/app/services/todo.service';
import { Component,Output, Input,EventEmitter } from '@angular/core';
import { Todo } from 'src/app/Models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private service: TodoService) {}

  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed,
    };
    return classes;
  }

  onToggle(todo) {
    //toggle in the UI
    todo.completed = !todo.completed;
    //toggle in the server
    this.service.toggleCompleted(todo).subscribe(todo =>
      console.log(todo));
  }
  onDelete(todo) {
    this.deleteTodo.emit(todo);
  }
}
