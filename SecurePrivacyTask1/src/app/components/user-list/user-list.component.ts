import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsers } from '../../store/user.actions';
import { User } from '../../models/user.model';
import { selectUsers } from '../../store/user.selectors';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

/**
 * Component for displaying a list of users.
 */
@Component({
  selector: 'app-user-list',
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]> | undefined; // Observable to hold the list of users

  /**
   * Initializes the UserListComponent.
   * 
   * @param store - The NgRx store for state management.
   * @param router - The Angular router for navigation.
   */
  constructor(private store: Store, private router: Router) { }

  /**
   * Lifecycle hook that is called after the component is initialized.
   * Dispatches the loadUsers action and subscribes to the users selector.
   */
  ngOnInit() {
    this.store.dispatch(loadUsers()); // Load users from the store
    this.users$ = this.store.select(selectUsers); // Select users from the store
  }

  /**
   * Navigates to the Add User page.
   */
  redirectToAddUser() {
    this.router.navigate(['/add-user']); // Redirect to the add user route
  }
}
