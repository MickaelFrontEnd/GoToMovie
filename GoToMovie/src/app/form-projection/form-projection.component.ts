import { Component, OnInit, OnDestroy } from '@angular/core';
import 'date-input-polyfill';
import 'time-input-polyfill/auto';
import MovieModel from '../models/movie.model';
import { MOVIES } from '../models/movie.model';
import RoomModel from '../models/room.model';
import ProjectionModel from '../models/projection.model';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import ProjectionService from '../services/projection.service';
import MovieService from '../services/movie.service';
import RoomService from '../services/room.service';
import ResponseModel from '../models/response.model';
import { SUCCESS } from '../models/status.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-projection',
  templateUrl: './form-projection.component.html',
  styleUrls: ['./form-projection.component.css']
})
export class FormProjectionComponent implements OnInit, OnDestroy {

  projectionForm: FormGroup = null;
  movie: MovieModel;
  rooms: RoomModel[];
  disableBtn: boolean = false;
  subscriptionProjection: Subscription;
  subscriptionMovie: Subscription;
  subscriptionRoom: Subscription;

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
    this.initChangeListener();
    this.subscribeToService();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  subscribe() {
    this.subscriptionMovie = this.movieService.getSubject.subscribe(
      (data: MovieModel[]) => {
        if(data.length > 0) {
          this.movie = data[0];
        }
      },
      (err) => { alert(err); console.log(err); }
    );

    this.subscriptionRoom = this.roomService.getSubject.subscribe(
      (data: RoomModel[]) => {
        this.rooms = data;
        this.projectionForm.get('projectionRoom').setValue(this.rooms[0].roomName);
      },
      (err) => { alert(err); console.log(err); }
    );
  }

  unsubscribe() {
    this.subscriptionMovie.unsubscribe();
    this.subscriptionRoom.unsubscribe();
    this.subscriptionProjection.unsubscribe();
  }

  initData() {
    this.movieService.getMovieDetail(this.activatedRoute.snapshot.params['id']);
    this.roomService.getRoom();
  }

  subscribeToService() {
    this.subscriptionProjection = this.projectionService.postSubject.subscribe(
      (data: ResponseModel) => {
        this.disableBtn = false;
        if(data.status === SUCCESS) {
          this.router.navigate(['projections/list']);
        }
        else {
          alert(data.message);
        }
       },
      (err) => {
        this.disableBtn = false;
        alert(err);
      }
    );
  }

  initForm() {
    this.projectionForm = this.formBuilder.group({
      projectionMovie: [''],
      projectionRoom: ['', Validators.required],
      projectionDay: ['', Validators.required],
      projectionBegin: ['', [Validators.required, this.validateBeginTime]],
      projectionEnd: ['', [Validators.required, this.validateEndTime]]
    });
  }

  onSubmitForm() {console.log(this.projectionForm);
    if(this.projectionForm.valid) {
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
      this.disableBtn = true;
      this.projectionService.addProjection(newProjection);
    }
    else {
      Object.keys(this.projectionForm.controls).forEach(field => {
        const control = this.projectionForm.get(field);
        control.markAsDirty({ onlySelf: true });
      });
    }
  }

  initChangeListener() {
    if(this.projectionForm && this.projectionForm.get('projectionBegin')) {
      this.projectionForm.get('projectionBegin').valueChanges.subscribe(
        () => {
          this.projectionForm.get('projectionEnd').updateValueAndValidity({onlySelf:true, emitEvent:false});
        }
      );
    }
    if(this.projectionForm && this.projectionForm.get('projectionEnd')) {
      this.projectionForm.get('projectionEnd').valueChanges.subscribe(
        () => {
          this.projectionForm.get('projectionBegin').updateValueAndValidity({onlySelf:true, emitEvent:false});
        }
      );
    }
  }

  validateBeginTime = (control: AbstractControl): ValidationErrors | null => {
    if(this.projectionForm) {
      let endTime = this.projectionForm.get('projectionEnd').value;
      return this.isBefore(control.value, endTime) ? null : { 'timeInvalid': 'Doit être inferieur au date fin' };
    }
    return null;
  }

  validateEndTime = (control: AbstractControl): ValidationErrors | null => {
    if(this.projectionForm) {
      let beginTime = this.projectionForm.get('projectionBegin').value;
      return this.isBefore(beginTime, control.value) ? null : { 'timeInvalid': 'Doit être superieur au date début' };
    }
    return null;
  }

  isBefore(date1: string, date2: string): boolean {
    if(!date1 || !date2) {
      return true;
    }
    const date1Hour = parseInt(date1.split(':')[0]); console.log(date1Hour);
    const date2Hour = parseInt(date2.split(':')[0]); console.log(date2Hour);
    if(date1Hour < date2Hour) { console.log('TRUE KOSA');
      return true;
    }
    else if(date1Hour === date2Hour) { console.log('FALSE MITOVY VE KOSA');
      const date1Minute = parseInt(date1.split(':')[1]);
      const date2Minute = parseInt(date2.split(':')[1]);
      return date1Minute < date2Minute;
    }
    else { console.log('FALSE KOSA');
      return false;
    }
  }

}
