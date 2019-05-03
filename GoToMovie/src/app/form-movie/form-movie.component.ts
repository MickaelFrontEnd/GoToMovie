import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import MovieService from '../services/movie.service';
import MovieModel from '../models/movie.model';

@Component({
  selector: 'app-form-movie',
  templateUrl: './form-movie.component.html',
  styleUrls: ['./form-movie.component.css']
})
export class FormMovieComponent implements OnInit {

  movieForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private movieService:MovieService,
              private router:Router) {
  }

  ngOnInit() {
    this.initForm();
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
    const formValue = this.movieForm.value;
    const newMovie = new MovieModel(
      formValue['movieTitle'],
      formValue['movieDescription'],
      formValue['movieLanguage'],
      formValue['movieType'],
      formValue['movieActor'],
      formValue['movieDirector'],
      formValue['movieTrailer']
    );
    this.movieService.addMovie(newMovie, this.onSubmitSuccess, this.onSubmitError);
  }

  onSubmitSuccess() {
    this.router.navigate(['/']);
  }

  onSubmitError(err) {
    console.log(err);
  }

}
