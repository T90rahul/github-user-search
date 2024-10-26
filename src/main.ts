import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Route } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserSearchComponent } from './app/components/user-search/user-search.component';
import { UserProfileComponent } from './app/components/user-profile/user-profile.component';

const routes: Route[] = [
  { path: '', component: UserSearchComponent },
  { path: 'user/:username', component: UserProfileComponent }
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), importProvidersFrom(HttpClientModule)]
});
