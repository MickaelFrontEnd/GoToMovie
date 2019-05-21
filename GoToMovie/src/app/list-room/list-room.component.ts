import { Component, OnInit } from '@angular/core';
import RoomModel from '../models/room.model';
import RoomService from '../services/room.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.css']
})
export class ListRoomComponent implements OnInit {

  listRooms: RoomModel[];
  isLoading: boolean = true;
  roomForm: FormGroup;

  constructor(private roomService: RoomService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.subscribe();
    this.initList();
    this.initForm();
  }

  initForm() {
    this.roomForm = this.formBuilder.group({
      roomName: [''],
    });
  }

  subscribe() {
    this.roomService.getSubject.subscribe(
      (data: RoomModel[]) => {
        this.isLoading = false;
        this.listRooms = data;
      }
    );
  }

  initList() {
    this.roomService.getRoom();
  }

  onSubmitForm() {
    const formValue = this.roomForm.value;
    const newRoom = new RoomModel(
      null,
      formValue['roomName'],
      null,
      null,
    );
    this.isLoading = true;
    this.listRooms = [];
    this.roomService.findRoom(newRoom);
  }

}
