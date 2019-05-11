import { Component, OnInit } from '@angular/core';
import ProjectionModel from '../models/projection.model';
import ProjectionService from '../services/projection.service';

@Component({
  selector: 'app-list-projection',
  templateUrl: './list-projection.component.html',
  styleUrls: ['./list-projection.component.css']
})
export class ListProjectionComponent implements OnInit {

  listProjections: ProjectionModel[];
  isLoading: boolean = true;

  constructor(private projectionService: ProjectionService) { }

  ngOnInit() {
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
