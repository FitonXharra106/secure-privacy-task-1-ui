import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Ensure this is correct
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { userReducer } from './store/user.reducer';
import { UserEffects } from './store/user.effects';
import { RouterModule, Routes } from '@angular/router';

// Define application routes
const routes: Routes = [
  { path: 'add-user', component: AddUserComponent }, // Route for adding a user
  { path: 'user-list', component: UserListComponent }, // Route for listing users
  { path: '', redirectTo: '/user-list', pathMatch: 'full' }, // Redirect to user list on empty path
  { path: '**', redirectTo: '/user-list' } // Catch-all redirect to user list
];
@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ users: userReducer }),
    EffectsModule.forRoot([UserEffects]),
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }