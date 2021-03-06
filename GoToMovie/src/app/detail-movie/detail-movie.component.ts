import { Component, OnInit } from '@angular/core';
import MovieModel from '../models/movie.model';
import MovieService from '../services/movie.service';
import UserService from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { MOVIES_IMAGES_FOLDER } from '../services/url.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.css']
})
export class DetailMovieComponent implements OnInit {

  movie: MovieModel;
  movieImageFolder: string;
  isUserBackOffice: boolean = false;
  projection: string;

  constructor(private movieService: MovieService,
              private activatedRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private userService: UserService) { }

  ngOnInit() {
    this.initData();
    this.subscribe();
    this.getDetail();
  }

  initData() {
    this.movieImageFolder = MOVIES_IMAGES_FOLDER;
    this.isUserBackOffice = this.userService.isUserBackOffice();
    this.projection = this.activatedRoute.snapshot.params['di'];
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
