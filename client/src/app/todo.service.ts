import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of ,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Todo } from './Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3001/todo'; // Update the API URL

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    if (typeof localStorage !== 'undefined') {
      // Get the token from localStorage if available
      const token = localStorage.getItem('token');

      // Set the authorization token in the request headers
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

      // Send the HTTP GET request with the headers
      return this.http.get<Todo[]>(this.apiUrl, { headers }).pipe(
        catchError(error => {
          console.error('Error fetching todos:', error);
          return of([]); // Return an empty array in case of an error
        })
      );
    } else {
      // Handle the case where localStorage is not available (e.g., server-side rendering)
      console.error('localStorage is not available. Cannot retrieve todos.');
      return of([]); // Return an empty array
    }
  }

  addTodo(todo: Todo): Observable<Todo> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError('Token is missing');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Todo>(this.apiUrl, todo, { headers }).pipe(
      catchError(error => {
        return throwError('Failed to add todo');
      })
    );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError('Token is missing');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.patch<Todo>(`${this.apiUrl}/${todo._id}`, todo, { headers }).pipe(
      catchError(error => {
        return throwError('Failed to update todo');
      })
    );
  }

  deleteTodo(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError('Token is missing');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(error => {
        return throwError('Failed to delete todo');
      })
    );
  }
}
