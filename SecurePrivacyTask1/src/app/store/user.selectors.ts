import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

/**
 * Selects the entire user state from the store.
 * This is used as a base selector for other selectors.
 */
export const selectUserState = createFeatureSelector<UserState>('users');

/**
 * Selector to retrieve the list of users from the user state.
 * It uses the selectUserState selector to get the current user state 
 * and extracts the users array from it.
 * 
 * @param state - The current state of UserState.
 * @returns An array of User objects.
 */
export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);
