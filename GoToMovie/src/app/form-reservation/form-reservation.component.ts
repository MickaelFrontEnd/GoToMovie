import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';

import ProjectionModel from '../models/projection.model';
import ReservationModel from '../models/reservation.model';

import ProjectionService from '../services/projection.service';
import UserService from '../services/user.service';
import ReservationService from '../services/reservation.service';

import { SUCCESS} from '../models/status.model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-reservation',
  templateUrl: './form-reservation.component.html',
  styleUrls: ['./form-reservation.component.css']
})
export class FormReservationComponent implements OnInit, OnDestroy {

  projection: ProjectionModel;
  freeSeats: string[] = [];
  reservedSeats: string[] = [];
  projectionSubscription: Subscription;
  reservationSubscription: Subscription;

  constructor(private projectionService: ProjectionService,
              private userService: UserService,
              private reservationService: ReservationService,
              private activatedRoute: ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    this.subscribe();
    this.getProjection();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  getProjection() {
    this.projectionService.getProjectionDetail(this.activatedRoute.snapshot.params['id']);
  }

  subscribe() {
    this.projectionSubscription = this.projectionService.getSubject.subscribe(
      (data) => {
        this.projection = data;
        this.freeSeats = data.projectionFreeSeats;
      },
      (err) => {
        alert(err);
      }
    );

    this.reservationSubscription = this.reservationService.postSubject.subscribe(
      (data) => {
        if(data.status === SUCCESS) {
          this.router.navigate(['/resevations/list']);
        }
        else {
          alert(data.message);
        }
      },
      (err) => {
        alert('Une erreur s\'est produite, veuillez contactez l\'administrateur');
      }
    );
  }

  unsubscribe() {
    this.projectionSubscription.unsubscribe();
    this.reservationSubscription.unsubscribe();
  }

  submitReservation() {
    let text;
    if(this.reservedSeats.length <= 0) {
      alert('Vous devez au mois resérver une place');
      return;
    }
    else if(this.reservedSeats.length === 1) {
      text = 'Confimer la resérvation de cette place?';
    }
    else {
      text = 'Confimer la resérvation de ces ' + this.reservedSeats.length + 'place?';
    }

    let hasConfirmed = confirm(text);
    if(hasConfirmed) {
      let newReservation = new ReservationModel(
        null,
        this.userService.getUser(),
        this.projection,
        this.reservedSeats
      );
      this.reservationService.addReservation(newReservation);
    }

  }

  onDrop(event: CdkDragDrop<string[]>) {
    if(event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

}
