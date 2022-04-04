import { DummyComponent } from './UI/Dummies/dummy.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { LoginStatus } from './Services/login-status.service';
import { FileUploadService } from './Services/file-upload.service';
import { HttpClientModule } from '@angular/common/http';

import {
  HeaderComponent,
  FooterComponent,
  AddMeetupComponent,
  LoginFormComponent,
  PageErrorComponent,
  LinksComponent,
  InputComponent,
  LoginComponent,
  TextLinkComponent,
  LogoComponent,
  AboutComponent,
  ContactComponent,
  RetinopathyComponent,
  DashboardComponent,
  SearchComponent,
  FileUploadComponent,
} from './UI';

export const components = [
  AppComponent,
  HeaderComponent,

  AddMeetupComponent,

  LoginFormComponent,
  FooterComponent,
  PageErrorComponent,
  LinksComponent,
  InputComponent,
  LoginComponent,

  DummyComponent,
  TextLinkComponent,
  LogoComponent,
  AboutComponent,
  ContactComponent,
  RetinopathyComponent,
  DashboardComponent,
  SearchComponent,
  FileUploadComponent,
];

export const bootstrap = [AppComponent];

export const imports = [
  BrowserModule,
  AppRoutingModule,
  FormsModule,
  HttpClientModule,
];

export const providers = [LoginStatus, FileUploadService];
