import { Component, OnInit } from '@angular/core';
import MovieModel from '../models/movie.model';
import MovieService from '../services/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.css']
})
export class DetailMovieComponent implements OnInit {

  movie: MovieModel;

  constructor(private movieService: MovieService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscribe();
    this.getDetail();
  }

  getDetail() {
    this.movieService.getMovieDetail(this.activatedRoute.snapshot.params['id']);
  }

  subscribe() {
    this.movieService.getSubject.subscribe(
      (data) => {
        if(data.length > 0) {
          this.movie = data[0];
        }
      },
      (err) => {
        alert(err);
      }
    );
  }

}
