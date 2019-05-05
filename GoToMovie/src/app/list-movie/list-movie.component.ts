import { Component, OnInit } from '@angular/core';
import MovieModel from '../models/movie.model';
import MovieService from '../services/movie.service';

@Component({
  selector: 'app-list-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.css']
})
export class ListMovieComponent implements OnInit {

  listMovies: MovieModel[];
  isLoading: boolean = true;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.subscribe();
    this.initList();
  }

  subscribe() {
    this.movieService.getSubject.subscribe(
      (data: MovieModel[]) => {
        this.isLoading = false;
        this.listMovies = data;
      }
    );
  }

  initList() {
    this.movieService.getMovie();
  }

}
