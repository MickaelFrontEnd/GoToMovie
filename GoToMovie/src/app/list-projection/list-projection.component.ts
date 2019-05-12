import { Component, OnInit } from '@angular/core';
import ProjectionModel from '../models/projection.model';
import RoomModel from '../models/room.model';
import ProjectionService from '../services/projection.service';
import RoomService from '../services/room.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-list-projection',
  templateUrl: './list-projection.component.html',
  styleUrls: ['./list-projection.component.css']
})
export class ListProjectionComponent implements OnInit {

  listProjections: ProjectionModel[];
  listRooms: RoomModel[];
  isLoading: boolean = true;
  projectionForm: FormGroup;

  constructor(private projectionService: ProjectionService,
              private roomService: RoomService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.subscribe();
    this.initList();
    this.initForm();
  }

  initForm() {
    this.projectionForm = this.formBuilder.group({
      projectionMovie: [''],
      projectionRoom: [''],
      projectionDay: ['']
    });
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

    this.roomService.getSubject.subscribe(
      (data: RoomModel[]) => {
        this.listRooms = data;
      },
      (err) => {
        alert(err);
      }
    );
  }

  initList() {
    this.projectionService.getProjection();
    this.roomService.getRoom();
  }

  formatDate(text: string) {
    let d = text.split('T');
    d = d[0].split('-');
    return d[2] + '-' + d[1] + '-' + d[0];
  }

  onSubmitForm() {
    const formValue = this.projectionForm.value;
    const newProjection = new ProjectionModel(
      null,
      formValue['projectionRoom'],
      '',
      formValue['projectionDay'],
      '',
      ''
    );
    this.isLoading = true;
    this.listProjections = [];
    this.projectionService.findProjection(newProjection);
  }

}
