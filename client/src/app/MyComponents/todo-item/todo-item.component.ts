// todo-item.component.ts

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo?: Todo;
  @Input() i: number = 0; // Define i as an input property and provide a default value

  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter();
  @Output() todoUpdate: EventEmitter<Todo> = new EventEmitter();
  isEditing: boolean = false;
  editedTitle: string = '';
  editedDesc: string = '';

  constructor() { }

  ngOnInit(): void {
    this.editedTitle = this.todo?.title || '';
    this.editedDesc = this.todo?.desc || '';
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
  }

  updateTodo(): void {
    if (this.todo) {
      this.todo.title = this.editedTitle;
      this.todo.desc = this.editedDesc;
      this.todoUpdate.emit(this.todo);
      this.toggleEditMode(); // Exit edit mode after updating
    }
  }
  onCheckboxClick(todo: Todo): void {
    if (todo) {
      todo.active = !todo.active;
      // You can emit an event here if needed
    }
  }

  onClick(todo: Todo): void {
    this.todoDelete.emit(todo);
  }
}
