import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  title: string = '';
  desc: string = '';
  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    const todo: Todo = {
      sno: 0,
      _id: '', // You should generate a unique ID on the server-side
      title: this.title,
      desc: this.desc,
      active: true,
      editMode: false // Add the editMode property here
    };
    this.todoAdd.emit(todo);
  }
}
