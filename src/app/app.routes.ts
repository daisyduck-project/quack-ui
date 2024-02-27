import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JoinComponent } from './join/join.component';
import { LoginComponent } from './login/login.component';
import { FeedComponent } from './feed/feed.component';
import { MomentComponent } from './moment/moment.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'join', component: JoinComponent },
  { path: 'login', component: LoginComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'moment', component: MomentComponent },
];
