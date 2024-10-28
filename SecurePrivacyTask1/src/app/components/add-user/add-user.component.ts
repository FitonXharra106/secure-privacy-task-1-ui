import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { addUser, addUserSuccess, addUserFailure } from '../../store/user.actions';
import { User } from '../../models/user.model';

/**
 * Component for adding a new user.
 */
@Component({
  selector: 'app-add-user',
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup; // FormGroup for managing the user input form

  /**
   * Initializes the AddUserComponent.
   * 
   * @param store - The NgRx store for state management.
   * @param actions$ - The stream of actions for handling side effects.
   * @param router - The Angular router for navigation.
   * @param fb - The FormBuilder for creating reactive forms.
   */
  constructor(
    private store: Store,
    private actions$: Actions,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialize the user form with validators
    this.addUserForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]], // First name validation
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]], // Last name validation
      email: ['', [Validators.required, Validators.email]], // Email validation
      consentGiven: [false, Validators.requiredTrue] // Consent validation
    });
  }

  /**
   * Lifecycle hook that is called after the component is initialized.
   */
  ngOnInit() { }

  /**
   * Handles the form submission.
   * Dispatches an action to add a new user if the form is valid.
   */
  onSubmit() {
    if (this.addUserForm.valid) {
      const newUser: User = this.addUserForm.value; // Get the form values
      this.store.dispatch(addUser({ user: newUser })); // Dispatch add user action

      // Listen for success or failure action after dispatching
      this.actions$.pipe(
        ofType(addUserSuccess, addUserFailure), // Filter actions
        take(1) // Unsubscribe after receiving the first action
      ).subscribe((action) => {
        if (action.type === '[User] Add User Success') {
          this.router.navigate(['/user-list']); // Navigate on success
        } else if (action.type === '[User] Add User Failure') {
          console.error('Failed to add user', action.error); // Log error on failure
        }
      });
    }
  }
}
