import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import { loadUsersSuccess, addUserSuccess } from './user.actions';

/**
 * Interface representing the shape of the user state in the store.
 */
export interface UserState {
  users: User[]; // Array of User objects representing the current list of users
}

/**
 * Initial state for the user reducer.
 * It initializes the users array as empty.
 */
export const initialState: UserState = {
  users: []
};

/**
 * User reducer function to manage the user state.
 * This function listens for specific actions and updates the state accordingly.
 */
export const userReducer = createReducer(
  initialState, // Set the initial state for the reducer
  /**
   * Handle the loadUsersSuccess action to update the users state with the retrieved user list.
   * @param state - The current state of the UserState.
   * @param users - The new list of users to be set in the state.
   */
  on(loadUsersSuccess, (state, { users }) => ({ ...state, users })),

  /**
   * Handle the addUserSuccess action to add a new user to the existing user list.
   * @param state - The current state of the UserState.
   * @param user - The user object to be added to the state.
   */
  on(addUserSuccess, (state, { user }) => ({ ...state, users: [...state.users, user] }))
);
