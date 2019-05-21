import { Component, OnInit } from '@angular/core';
import RoomModel from '../models/room.model';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import RoomService from '../services/room.service';
import ResponseModel from '../models/response.model';
import { SUCCESS, ERROR } from '../models/status.model';

@Component({
  selector: 'app-form-room',
  templateUrl: './form-room.component.html',
  styleUrls: ['./form-room.component.css']
})
export class FormRoomComponent implements OnInit {

  roomForm: FormGroup = null;
  room: RoomModel;
  disableBtn: boolean = false;

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
      roomLocation: ['', Validators.required],
      roomSeats: this.formBuilder.array([['', [ Validators.required, Validators.pattern('^[a-zA-z]*[0-9]*$') , this.validateSeat ] ]])
    });
  }

  onSubmitForm() {
    if(this.roomForm.valid) {
      const formValue = this.roomForm.value;
      const newRoom = new RoomModel(
        null,
        formValue['roomName'],
        formValue['roomLocation'],
        formValue['roomSeats'] ? formValue['roomSeats'] : []
      );
      this.disableBtn = true;
      this.roomService.addRoom(newRoom);
    }
    else {
      Object.keys(this.roomForm.controls).forEach(field => {
        const control = this.roomForm.get(field);
        if(control instanceof FormControl) {
          control.markAsDirty({ onlySelf: true });
        }
        else if(control instanceof FormArray) {
          for(let i = 0; i < control.controls.length; i++) {
            control.controls[i].markAsDirty({ onlySelf: true });
          }
        }
      });
    }
  }

  getSeats() {
    return this.roomForm.get('roomSeats') as FormArray;
  }

  onAddSeat() {
    const newSeat = this.formBuilder.control('', [ Validators.required, Validators.pattern('^[a-zA-z]*[0-9]*$'), this.validateSeat ]);
    this.getSeats().push(newSeat);
  }

  onRemoveSeat(index: number) {
    const seats = this.getSeats();
    seats.removeAt(index);
    for(let i = 0; i < seats.controls.length; i++) {
      seats.controls[i].setValue(seats.controls[i].value);
    }

  }

  subscribe() {
    this.roomService.postSubject.subscribe(
      (data: ResponseModel) => {
        if(data.status === SUCCESS) {
          this.router.navigate(['rooms/list']);
        }
        else {
          this.disableBtn = false;
          alert(data.message);
        }
      },
      (err) => {
        this.disableBtn = false;
        alert(err);
      }
    );
  }

  validateSeat = (control: AbstractControl): ValidationErrors | null => {
    if(this.roomForm) {
      let controls = (this.roomForm.get('roomSeats') as FormArray).controls;
      let count = 0;
      for(let i = 0; i < controls.length; i++) {
        if(control.value !== '' && controls[i].value === control.value) {
          count ++;
        }
      }
      return count >= 2 ? { 'duplicate': 'Cette place existe déjà' } : null;
    }
    return null;
  }

}
