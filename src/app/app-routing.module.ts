import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AddMeetupComponent,
  LoginFormComponent,
  PageErrorComponent,
  DummyComponent,
  DashboardComponent,
  AboutComponent,
  ContactComponent,
  RetinopathyComponent,
  SearchComponent,
  FileUploadComponent,
} from './UI';

const routes: Routes = [
  {
    path: '',

    component: DashboardComponent,
  },
  {
    path: 'about',

    component: AboutComponent,
  },

  { path: 'contact', component: ContactComponent },
  {
    path: 'retinopathy',
    component: RetinopathyComponent,
  },

  {
    path: 'login',
    component: LoginFormComponent,
  },

  {
    path: 'search',
    component: FileUploadComponent,
  },

  {
    path: 'refresh',
    component: DummyComponent,
  },
  {
    path: 'register',
    component: AddMeetupComponent,
  },

  {
    path: '**',
    component: PageErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
