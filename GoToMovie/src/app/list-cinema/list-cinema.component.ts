import { Component, OnInit } from '@angular/core';
import ProjectionModel from '../models/projection.model';
import ProjectionService from '../services/projection.service';
import { MOVIES_IMAGES_FOLDER } from '../services/url.service';

@Component({
  selector: 'app-list-cinema',
  templateUrl: './list-cinema.component.html',
  styleUrls: ['./list-cinema.component.css']
})
export class ListCinemaComponent implements OnInit {

  listProjections: ProjectionModel[];
  movieImageFolder: string;
  isLoading: boolean;

  constructor(private projectionService: ProjectionService) { }

  ngOnInit() {
    this.movieImageFolder = MOVIES_IMAGES_FOLDER;
    this.subscribe();
    this.initList();
  }

  subscribe() {
    this.projectionService.getSubject.subscribe(
      (data: ProjectionModel[]) => {
        this.isLoading = false;
        this.listProjections = data;
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  initList() {
    this.projectionService.getProjection();
  }

}
