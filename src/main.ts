import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Route,RouterModule } from '@angular/router';
import { importProvidersFrom, enableProdMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserSearchComponent } from './app/components/user-search/user-search.component';
import { UserProfileComponent } from './app/components/user-profile/user-profile.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthInterceptorService } from './app/auth.interceptor';
import { environment } from './environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


const routes: Route[] = [
  { path: '', component: UserSearchComponent },
  { path: 'user/:username', component: UserProfileComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
     importProvidersFrom(HttpClientModule,RouterModule),
     provideAnimations(),
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
    ]
}).catch(err => console.error(err));
