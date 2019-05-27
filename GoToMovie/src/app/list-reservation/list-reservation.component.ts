import { Component, OnInit, OnDestroy } from '@angular/core';
import ReservationModel from '../models/reservation.model';
import RoomModel from '../models/room.model';
import MovieModel from '../models/movie.model';
import ProjectionModel from '../models/projection.model';
import UserModel from '../models/user.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MOVIES_IMAGES_FOLDER } from '../services/url.service';
import ReservationService from '../services/reservation.service';
import RoomService from '../services/room.service';
import UserService from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.css']
})
export class ListReservationComponent implements OnInit {

  listReservations: ReservationModel[];
  listRooms: RoomModel[];
  isLoading: boolean = true;
  reservationForm: FormGroup;
  movieImageFolder: string;
  reservationSubscription: Subscription;
  roomSubscription: Subscription;
  user: UserModel;

  constructor(private reservationService: ReservationService,
              private userService: UserService,
              private roomService: RoomService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initData();
    this.subscribe();
    this.initList();
    this.initForm();
  }

  initData() {
    this.movieImageFolder = MOVIES_IMAGES_FOLDER;
    this.user = this.userService.getUser();
  }

  initForm() {
    this.reservationForm = this.formBuilder.group({
      movieTitle: [''],
      userFirstName: [''],
      userName: [''],
      projectionRoom: [''],
      projectionDay: ['']
    });
  }

  subscribe() {
    this.reservationSubscription = this.reservationService.getSubject.subscribe(
      (data: ReservationModel[]) => {
        this.isLoading = false;
        this.listReservations = data;
      },
      (err) => {
        alert('Une erreur s\'est produite, veuillez contactez l\'administrateur');
        this.isLoading = false;
      }
    );

    this.roomSubscription = this.roomService.getSubject.subscribe(
      (data: RoomModel[]) => {
        this.listRooms = data;
      },
      (err) => {
        alert(err);
      }
    );
  }

  unsubscribe() {
    this.reservationSubscription.unsubscribe();
    this.roomSubscription.unsubscribe();
  }

  initList() {
    this.reservationService.getReservation(this.user);
    this.roomService.getRoom();
  }

  formatDate(text: string) {
    let d = text.split('T');
    d = d[0].split('-');
    return d[2] + '-' + d[1] + '-' + d[0];
  }

  onSubmitForm() {
    const formValue = this.reservationForm.value;
    const newUser = new UserModel (
      null,
      formValue['userName'],
      formValue['userFirstName'],
      '',
      '',
      '',
      '',
      null
    );
    const newMovie = new MovieModel(
      null,
      formValue['movieTitle'],
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    );
    const newProjection = new ProjectionModel(
      null,
      formValue['projectionRoom'],
      newMovie,
      formValue['projectionDay'],
      '',
      '',
      null
    );
    const newReservation = new ReservationModel(
      null,
      newUser,
      newProjection,
      null
    );
    this.isLoading = true;
    this.listReservations = [];
    this.reservationService.findReservation(newReservation);
  }

}
