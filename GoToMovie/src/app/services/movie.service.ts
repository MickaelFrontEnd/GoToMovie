import MovieModel from '../models/movie.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ADD_MOVIE } from './url.service';

@Injectable()
export default class MovieService {

  constructor(private httpClient: HttpClient) {}

  addMovie(movie: MovieModel, success: Function, error: Function){
    this.httpClient.post(ADD_MOVIE, movie, requestOptions)
      .subscribe(
        (data) => { success(); },
        (err) => { error(err); },
        () => { }
      );
  }
}
