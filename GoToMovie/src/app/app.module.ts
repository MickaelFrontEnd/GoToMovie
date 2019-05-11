import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { FormMovieComponent } from './form-movie/form-movie.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule  } from '@angular/forms';

import MovieService from './services/movie.service';
import RoomService from './services/room.service';
import ProjectionService from './services/projection.service';
import UserService from './services/user.service';

import { ErrorModalComponent } from './error-modal/error-modal.component';
import { ListMovieComponent } from './list-movie/list-movie.component';
import { DetailMovieComponent } from './detail-movie/detail-movie.component';
import { FormRoomComponent } from './form-room/form-room.component';
import { ListRoomComponent } from './list-room/list-room.component';
import { FormProjectionComponent } from './form-projection/form-projection.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { FormRegisterComponent } from './form-register/form-register.component';
import { AddProjectionComponent } from './add-projection/add-projection.component';
import { ListProjectionComponent } from './list-projection/list-projection.component';

const appRoutes:Routes = [
  { path: '', component: AppComponent, children: [
    { path: 'login', component: FormLoginComponent },
    { path: 'register', component: FormRegisterComponent }
  ]},
  { path: '', component: BaseLayoutComponent, children: [
    { path: 'movies/add', component: FormMovieComponent },
    { path: 'movies/list', component: ListMovieComponent },
    { path: 'movies/:id', component: DetailMovieComponent },
    { path: 'rooms/add', component: FormRoomComponent },
    { path: 'rooms/list', component: ListRoomComponent },
    { path: 'projections/add', component: AddProjectionComponent },
    { path: 'projections/add/:id', component: FormProjectionComponent },
    { path: 'projections/list', component: ListProjectionComponent },
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    FormMovieComponent,
    ErrorModalComponent,
    ListMovieComponent,
    DetailMovieComponent,
    FormRoomComponent,
    ListRoomComponent,
    FormProjectionComponent,
    FormLoginComponent,
    BaseLayoutComponent,
    FormRegisterComponent,
    AddProjectionComponent,
    ListProjectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    MovieService,
    RoomService,
    ProjectionService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
