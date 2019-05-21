import { Component, OnInit, OnDestroy } from '@angular/core';
import MovieModel from '../models/movie.model';
import MovieService from '../services/movie.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MOVIES_IMAGES_FOLDER } from '../services/url.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.css']
})
export class ListMovieComponent implements OnInit, OnDestroy {

  listMovies: MovieModel[];
  isLoading: boolean = true;
  movieForm: FormGroup;
  movieImageFolder: string;
  subscription: Subscription;

  constructor(private movieService: MovieService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.movieImageFolder = MOVIES_IMAGES_FOLDER;
    this.subscribe();
    this.initList();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
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
    this.subscription = this.movieService.getSubject.subscribe(
      (data: MovieModel[]) => {
        this.isLoading = false;
        this.listMovies = data;
      }
    );
  }

  unsubscribe() {
    this.subscription.unsubscribe();
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
