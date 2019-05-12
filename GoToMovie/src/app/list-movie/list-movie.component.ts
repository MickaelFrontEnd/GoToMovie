import { Component, OnInit } from '@angular/core';
import MovieModel from '../models/movie.model';
import MovieService from '../services/movie.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-list-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.css']
})
export class ListMovieComponent implements OnInit {

  listMovies: MovieModel[];
  isLoading: boolean = true;
  movieForm: FormGroup;

  constructor(private movieService: MovieService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.subscribe();
    this.initList();
    this.initForm();
  }

  initForm() {
    this.movieForm = this.formBuilder.group({
      movieTitle: '',
      movieLanguage: '',
      movieType: '',
      movieActor: '',
      movieDirector: ''
    });
  }

  subscribe() {
    this.movieService.getSubject.subscribe(
      (data: MovieModel[]) => {
        this.isLoading = false;
        this.listMovies = data;
      }
    );
  }

  onSubmitForm() {
    const formValue = this.movieForm.value;
    const newMovie = new MovieModel(
      '',
      formValue['movieTitle'],
      '',
      formValue['movieLanguage'],
      formValue['movieType'],
      formValue['movieActor'],
      formValue['movieDirector'],
      '',
      ''
    );
    this.isLoading = true;
    this.listMovies = [];
    this.movieService.findMovie(newMovie);
  }

  initList() {
    this.movieService.getMovie();
  }

}
