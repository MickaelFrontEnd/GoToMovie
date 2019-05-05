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
      movieLanguage: '',
      movieType: '',
      movieActor: '',
      movieDirector: '',
      movieTrailer: ['', Validators.required]
    });
  }

  onSubmitForm() {
    if(this.movieForm.valid) {
      const formValue = this.movieForm.value;
      const newMovie = new MovieModel(
        '',
        formValue['movieTitle'],
        formValue['movieDescription'],
        formValue['movieLanguage'],
        formValue['movieType'],
        formValue['movieActor'],
        formValue['movieDirector'],
        formValue['movieTrailer']
      );
      this.movieService.addMovie(newMovie);
    }
    else {
      Object.keys(this.movieForm.controls).forEach(field => {
        const control = this.movieForm.get(field);
        control.markAsDirty({ onlySelf: true });
      });
    }
  }

  onPostSuccess(data: ResponseModel) {
    if(data.status === SUCCESS) {
      this.router.navigate(['movies/list']);
    }
  }

  onPostError(err) {
    alert(err);
  }

}
