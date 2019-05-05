import { Component, OnInit } from '@angular/core';
import RoomModel from '../models/room.model';
import RoomService from '../services/room.service';

@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.css']
})
export class ListRoomComponent implements OnInit {

  listRooms: RoomModel[];
  isLoading: boolean = true;

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.subscribe();
    this.initList();
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

}
