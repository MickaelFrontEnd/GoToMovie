import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
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
import FrontGuard from './services/fo-guard.service';
import BackGuard from './services/bo-guard.service';
import ReservationService from './services/reservation.service';

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
import { NotFoundComponent } from './not-found/not-found.component';
import { ListCinemaComponent } from './list-cinema/list-cinema.component';
import { ListUserComponent } from './list-user/list-user.component';
import { UserBoDashboardComponent } from './user-bo-dashboard/user-bo-dashboard.component';
import { FormPasswordComponent } from './form-password/form-password.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarProjectionComponent } from './calendar-projection/calendar-projection.component';
import localeFr from '@angular/common/locales/fr';
import { FormUserComponent } from './form-user/form-user.component';
import { FormReservationComponent } from './form-reservation/form-reservation.component';
import { FlatpickrModule } from 'angularx-flatpickr';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ListReservationComponent } from './list-reservation/list-reservation.component';
import { FormAdminComponent } from './form-admin/form-admin.component';

const appRoutes:Routes = [
  { path: '', component: AppComponent, children: [
    { path: '', component: FormLoginComponent },
    { path: 'login', component: FormLoginComponent },
    { path: 'register', component: FormRegisterComponent },
    { path: 'forgot-password', component: FormPasswordComponent },
    { path: 'request-admin', component: FormAdminComponent }
  ]},
  { path: '', component: BaseLayoutComponent, children: [
    { path: 'movies/add', canActivate: [BackGuard], component: FormMovieComponent },
    { path: 'movies/list', canActivate: [BackGuard], component: ListMovieComponent },
    { path: 'movies/:id', canActivate: [FrontGuard], component: DetailMovieComponent },
    { path: 'movies/:id/:di', canActivate: [FrontGuard], component: DetailMovieComponent },
    { path: 'rooms/add', canActivate: [BackGuard], component: FormRoomComponent },
    { path: 'rooms/list', canActivate: [BackGuard], component: ListRoomComponent },
    { path: 'projections/add', canActivate: [BackGuard], component: AddProjectionComponent },
    { path: 'projections/add/:id', canActivate: [BackGuard], component: FormProjectionComponent },
    { path: 'projections/list', canActivate: [FrontGuard], component: ListProjectionComponent },
    { path: 'projections/list/:date', canActivate: [FrontGuard], component: ListProjectionComponent },
    { path: 'projections/calendar', canActivate: [BackGuard], component: CalendarProjectionComponent },
    { path: 'projections/reservation/:id', canActivate: [FrontGuard], component: FormReservationComponent },
    { path: 'reservations/list', canActivate: [FrontGuard], component: ListReservationComponent },
    { path: 'cinema/list',canActivate: [FrontGuard], component: ListCinemaComponent },
    { path: 'users/list',canActivate: [BackGuard], component: ListUserComponent },
    { path: 'users/dashboard',canActivate: [FrontGuard], component: UserBoDashboardComponent },
    { path: 'users/profil',canActivate: [FrontGuard], component: FormUserComponent },
    { path: 'not-found', canActivate: [FrontGuard], component: NotFoundComponent }
  ]},
  { path: '**', redirectTo: 'not-found'}
];

registerLocaleData(localeFr);

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
    ListProjectionComponent,
    NotFoundComponent,
    ListCinemaComponent,
    ListUserComponent,
    UserBoDashboardComponent,
    FormPasswordComponent,
    CalendarProjectionComponent,
    FormUserComponent,
    FormReservationComponent,
    ListReservationComponent,
    FormAdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlatpickrModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    DragDropModule
  ],
  providers: [
    MovieService,
    RoomService,
    ProjectionService,
    UserService,
    FrontGuard,
    BackGuard,
    ReservationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
