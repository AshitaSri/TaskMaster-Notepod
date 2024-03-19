// todos.component.ts

import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../todo.service';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(todo: Todo): void {
    this.todoService.addTodo(todo).subscribe(newTodo => {
      this.todos.push(newTodo);
    });
  }

  deleteTodo(todo: Todo): void {
    this.todoService.deleteTodo(todo._id).subscribe(() => {
      this.todos = this.todos.filter(t => t._id !== todo._id);
    });
  }

  toggleTodo(todo: Todo): void {
    todo.active = !todo.active;
    this.todoService.updateTodo(todo).subscribe(updatedTodo => {
      const index = this.todos.findIndex(t => t._id === updatedTodo._id);
      if (index !== -1) {
        this.todos[index] = updatedTodo;
      }
    });
  }

  updateTodo(todo: Todo): void { // Add updateTodo method
    this.todoService.updateTodo(todo).subscribe(updatedTodo => {
      const index = this.todos.findIndex(t => t._id === updatedTodo._id);
      if (index !== -1) {
        this.todos[index] = updatedTodo;
      }
    });
  }
}
