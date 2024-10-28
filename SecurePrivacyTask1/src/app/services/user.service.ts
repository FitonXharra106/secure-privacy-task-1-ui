import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

/**
 * Service for handling user-related operations.
 * This service communicates with the backend API to perform actions
 * such as retrieving users and adding a new user.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * The base URL for the user-related API endpoints.
   */
  private apiUrl = 'https://localhost:7115/api/Users';

  /**
   * Constructs the UserService and injects the HttpClient.
   * @param http - The HttpClient used for making HTTP requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Retrieves the list of users from the API.
   * @returns An observable containing an array of User objects.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  /**
   * Adds a new user to the API.
   * @param user - The User object to be added.
   * @returns An observable containing the added User object.
   */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
