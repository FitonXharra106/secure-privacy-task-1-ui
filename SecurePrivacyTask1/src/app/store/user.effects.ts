import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import { addUser, addUserSuccess, loadUsers, loadUsersSuccess } from './user.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { of } from 'rxjs';

/**
 * UserEffects class handles side effects for user-related actions in the NgRx store.
 * It listens for actions dispatched from components and interacts with the UserService
 * to perform asynchronous operations, such as loading users and adding a new user.
 */
@Injectable()
export class UserEffects {
    /**
     * Effect to handle loading users from the server.
     * Listens for the loadUsers action, calls the UserService to retrieve users,
     * and dispatches the appropriate success or failure action based on the result.
     */
    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(loadUsers), // Listen for loadUsers action
        mergeMap(() => this.userService.getUsers().pipe(
            map(users => loadUsersSuccess({ users })), // Dispatch success with users
            catchError((error) => of(UserActions.loadUsersFailure({ error }))) // Dispatch failure with error
        ))
    ));

    /**
     * Effect to handle adding a new user.
     * Listens for the addUser action, calls the UserService to add the user,
     * and dispatches the appropriate success or failure action based on the result.
     */
    addUser$ = createEffect(() => this.actions$.pipe(
        ofType(addUser), // Listen for addUser action
        mergeMap(action => this.userService.addUser(action.user).pipe(
            map(user => addUserSuccess({ user })), // Dispatch success with added user
            catchError((error) => of(UserActions.addUserFailure({ error }))) // Dispatch failure with error
        ))
    ));

    /**
     * Constructor for UserEffects class.
     * @param actions$ - Stream of actions dispatched to the store.
     * @param userService - Service for interacting with user-related API endpoints.
     */
    constructor(private actions$: Actions, private userService: UserService) { }
}
