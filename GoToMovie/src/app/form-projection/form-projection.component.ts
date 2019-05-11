import { Component, OnInit } from '@angular/core';
import 'date-input-polyfill';
import 'time-input-polyfill/auto';
import MovieModel from '../models/movie.model';
import { MOVIES } from '../models/movie.model';
import RoomModel from '../models/room.model';
import ProjectionModel from '../models/projection.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import ProjectionService from '../services/projection.service';
import MovieService from '../services/movie.service';
import RoomService from '../services/room.service';
import ResponseModel from '../models/response.model';
import { SUCCESS } from '../models/status.model';

@Component({
  selector: 'app-form-projection',
  templateUrl: './form-projection.component.html',
  styleUrls: ['./form-projection.component.css']
})
export class FormProjectionComponent implements OnInit {

  projectionForm: FormGroup;
  movie: MovieModel;
  rooms: RoomModel[];

  constructor(private formBuilder: FormBuilder,
              private projectionService: ProjectionService,
              private movieService: MovieService,
              private roomService: RoomService,
              private router:Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscribe();
    this.initData();
    this.initForm();
    this.subscribeToService();
  }

  subscribe() {
    this.movieService.getSubject.subscribe(
      (data: MovieModel[]) => {
        if(data.length > 0) {
          this.movie = data[0];
        }
      },
      (err) => { alert(err); console.log(err); }
    );

    this.roomService.getSubject.subscribe(
      (data: RoomModel[]) => { this.rooms = data },
      (err) => { alert(err); console.log(err); }
    );
  }

  initData() {
    this.movieService.getMovieDetail(this.activatedRoute.snapshot.params['id']);
    this.roomService.getRoom();
  }

  subscribeToService() {
    this.projectionService.postSubject.subscribe(
      (data: ResponseModel) => {
        if(data.status === SUCCESS) {
          this.router.navigate(['projections/list']);
        }
       },
      (err) => { alert(err); console.log(err); }
    );
  }

  initForm() {
    this.projectionForm = this.formBuilder.group({
      projectionMovie: ['', Validators.required],
      projectionRoom: ['', Validators.required],
      projectionDay: ['', Validators.required],
      projectionBegin: ['', Validators.required],
      projectionEnd: ['', Validators.required]
    });
  }

  onSubmitForm() {
    const formValue = this.projectionForm.value;
    const id = this.movie._id as string;
    const newProjection = new ProjectionModel(
      null,
      formValue['projectionRoom'],
      id,
      formValue['projectionDay'],
      formValue['projectionBegin'],
      formValue['projectionEnd']
    );
    this.projectionService.addProjection(newProjection);
  }

}
