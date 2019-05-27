import { Component, OnInit, OnDestroy } from '@angular/core';
import ProjectionModel from '../models/projection.model';
import RoomModel from '../models/room.model';
import MovieModel from '../models/movie.model';
import ProjectionService from '../services/projection.service';
import RoomService from '../services/room.service';
import UserService from '../services/user.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MOVIES_IMAGES_FOLDER } from '../services/url.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-projection',
  templateUrl: './list-projection.component.html',
  styleUrls: ['./list-projection.component.css']
})
export class ListProjectionComponent implements OnInit, OnDestroy {

  listProjections: ProjectionModel[];
  listRooms: RoomModel[];
  isLoading: boolean = true;
  projectionForm: FormGroup;
  movieImageFolder: string;
  isUserBackOffice: boolean = false;
  subscription: Subscription;
  roomSubscription: Subscription;

  constructor(private projectionService: ProjectionService,
              private activatedRoute: ActivatedRoute,
              private roomService: RoomService,
              private userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initData();
    this.subscribe();
    this.initList();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  initData() {
    this.movieImageFolder = MOVIES_IMAGES_FOLDER;
    this.isUserBackOffice = this.userService.isUserBackOffice();
  }

  initForm() {
    this.projectionForm = this.formBuilder.group({
      movieTitle: [''],
      movieLanguage: [''],
      movieType: [''],
      projectionMovie: [''],
      projectionRoom: [''],
      projectionDay: [this.activatedRoute.snapshot.params['date'] ? this.activatedRoute.snapshot.params['date'] : '']
    });
  }

  subscribe() {
    this.subscription = this.projectionService.getSubject.subscribe(
      (data: ProjectionModel[]) => {
        this.isLoading = false;
        this.listProjections = data;
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
    this.subscription.unsubscribe();
    this.roomSubscription.unsubscribe();
  }

  initList() {
    if(this.activatedRoute.snapshot.params['date']) {
      const newProjection = new ProjectionModel(
        null,
        null,
        null,
        this.activatedRoute.snapshot.params['date'],
        '',
        ''
      );
      this.projectionService.findProjection(newProjection);
    }
    else {
      this.projectionService.getProjection();
    }
    this.roomService.getRoom();
  }

  formatDate(text: string) {
    let d = text.split('T');
    d = d[0].split('-');
    return d[2] + '-' + d[1] + '-' + d[0];
  }

  onSubmitForm() {
    const formValue = this.projectionForm.value;
    const newMovie = new MovieModel (
      null,
      formValue['movieTitle'],
      '',
      formValue['movieLanguage'],
      formValue['movieType'],
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
      ''
    );
    this.isLoading = true;
    this.listProjections = [];
    this.projectionService.findProjection(newProjection);
  }

}
