import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

/**
 * Action creators for user-related operations in the NgRx store.
 * These actions represent various states of user data loading and addition processes.
 */

// Action to initiate the loading of users
export const loadUsers = createAction('[User] Load Users');

// Action dispatched when users are successfully loaded
export const loadUsersSuccess = createAction(
    '[User] Load Users Success',
    props<{ users: User[] }>() // Payload containing the array of users
);

// Action dispatched when loading users fails
export const loadUsersFailure = createAction(
    '[User] Load Users Failure',
    props<{ error: any }>() // Payload containing error details
);

// Action to initiate adding a new user
export const addUser = createAction(
    '[User] Add User',
    props<{ user: User }>() // Payload containing the user to be added
);

// Action dispatched when a user is successfully added
export const addUserSuccess = createAction(
    '[User] Add User Success',
    props<{ user: User }>() // Payload containing the added user
);

// Action dispatched when adding a user fails
export const addUserFailure = createAction(
    '[User] Add User Failure',
    props<{ error: any }>() // Payload containing error details
);
