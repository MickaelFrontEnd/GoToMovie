import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import MovieService from '../services/movie.service';
import MovieModel from '../models/movie.model';
import ResponseModel from '../models/response.model';
import { SUCCESS } from '../models/status.model';

@Component({
  selector: 'app-form-movie',
  templateUrl: './form-movie.component.html',
  styleUrls: ['./form-movie.component.css']
})
export class FormMovieComponent implements OnInit {

  movieForm: FormGroup;
  private moviePic: File;
  disableBtn: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private movieService: MovieService,
              private router:Router) {
  }

  ngOnInit() {
    this.initForm();
    this.subscribeToService();
  }

  subscribeToService() {
    this.movieService.postSubject.subscribe(
      (data) => { this.onPostSuccess (data); },
      (err) => { this.onPostError (err); }
    );
  }

  initForm() {
    this.movieForm = this.formBuilder.group({
      movieTitle: ['', Validators.required],
      movieDescription: ['', Validators.required],
      movieLanguage: 'VF',
      movieType: 'Action',
      movieActor: ['', Validators.required],
      movieDirector: ['', Validators.required],
      movieTrailer: ['', [ Validators.required, Validators.pattern('^(https:\/\/www\.youtube\.com\/embed\/)([a-zA-Z0-9_-]*)$') ] ],
      moviePic: [null, [Validators.required]]
    });
  }

  onSubmitForm() {
    if(this.movieForm.valid) {
      const formValue = this.movieForm.value;
      const newMovie = new MovieModel(
        null,
        formValue['movieTitle'],
        formValue['movieDescription'],
        formValue['movieLanguage'],
        formValue['movieType'],
        formValue['movieActor'],
        formValue['movieDirector'],
        formValue['movieTrailer'],
        ''
      );
      this.disableBtn = true;
      this.movieService.addMovie(this.buildFormData(formValue));
    }
    else {
      Object.keys(this.movieForm.controls).forEach(field => {
        const control = this.movieForm.get(field);
        control.markAsDirty({ onlySelf: true });
      });
    }
  }

  onPostSuccess(data: ResponseModel) {
    this.disableBtn = false;
    if(data.status === SUCCESS) {
      this.router.navigate(['movies/list']);
    }
  }

  onPostError(err) {
    this.disableBtn = false;
    alert(err);
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.moviePic = event.target.files[0];
    }
  }

  buildFormData(formValue): FormData {
    let data:FormData = new FormData();
    data.append('movieTitle', formValue['movieTitle']);
    data.append('movieDescription', formValue['movieDescription']);
    data.append('movieLanguage', formValue['movieLanguage']);
    data.append('movieType', formValue['movieType']);
    data.append('movieActor', formValue['movieActor']);
    data.append('movieDirector', formValue['movieDirector']);
    data.append('movieTrailer', formValue['movieTrailer']);
    data.append('moviePic', this.moviePic);
    return data;
  }

}
