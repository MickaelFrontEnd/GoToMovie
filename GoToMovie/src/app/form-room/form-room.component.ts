import { Component, OnInit } from '@angular/core';
import RoomModel from '../models/room.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import RoomService from '../services/room.service';
import ResponseModel from '../models/response.model';
import { SUCCESS } from '../models/status.model';

@Component({
  selector: 'app-form-room',
  templateUrl: './form-room.component.html',
  styleUrls: ['./form-room.component.css']
})
export class FormRoomComponent implements OnInit {

  roomForm: FormGroup;
  room: RoomModel;

  constructor(private formBuilder: FormBuilder,
              private roomService: RoomService,
              private router:Router) { }

  ngOnInit() {
    this.subscribe();
    this.initForm();
  }

  initForm() {
    this.roomForm = this.formBuilder.group({
      roomName: ['', Validators.required],
      roomSeats: this.formBuilder.array([])
    });
    this.onAddSeat();
  }

  onSubmitForm() {
    const formValue = this.roomForm.value;
    const newRoom = new RoomModel(
      '',
      formValue['roomName'],
      formValue['roomSeats'] ? formValue['roomSeats'] : []
    );
    this.roomService.addRoom(newRoom);
  }

  getSeats() {
    return this.roomForm.get('roomSeats') as FormArray;
  }

  onAddSeat() {
    const newSeat = this.formBuilder.control('', Validators.required);
    this.getSeats().push(newSeat);
  }

  onRemoveSeat(index: number) {
    const seats = this.getSeats();
    seats.removeAt(index);
  }

  subscribe() {
    this.roomService.postSubject.subscribe(
      (data: ResponseModel) => {
        if(data.status === SUCCESS) {
          this.router.navigate(['rooms/list']);
        }
      },
      (err) => { alert(err); }
    );
  }

}
