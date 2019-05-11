import MovieModel from '../models/movie.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MOVIES } from './url.service';
import ServerService from './server.service';
import ResponseModel from '../models/response.model';

@Injectable()
export default class MovieService extends ServerService {

  constructor(private httpClient: HttpClient) { super(); }

  addMovie(movie: FormData) {
    this.httpClient.post(MOVIES, movie)
      .subscribe(
        (data: ResponseModel) => {
          this.emitPostSuccess(data);
        },
        (err) => { this.emitPostError(err)  },
        () => { }
      );
  }

  getMovie() {
    this.httpClient.get(MOVIES)
      .subscribe(
        (data: MovieModel[]) => {
          this.emitGetSuccess(data);
        },
        (err) => { this.emitPostError(err)  },
        () => { }
      );
  }

  getMovieDetail(id: string) {
    this.httpClient.get(MOVIES + '/' + id)
      .subscribe(
        (data: MovieModel[]) => {
          this.emitGetSuccess(data);
        },
        (err) => { this.emitPostError(err)  },
        () => { }
      );
  }
}
