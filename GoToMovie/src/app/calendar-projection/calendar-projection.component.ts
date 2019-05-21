import { Component, OnInit, OnDestroy } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import ProjectionService from '../services/projection.service';
import ProjectionModel from '../models/projection.model';
import { ProjectionListModel } from '../models/projection.model';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar-projection',
  templateUrl: './calendar-projection.component.html',
  styleUrls: ['./calendar-projection.component.css']
})
export class CalendarProjectionComponent implements OnInit, OnDestroy {

  viewDate:Date = new Date();
  events: Array<CalendarEvent<{ incrementsBadgeTotal: boolean }>> = [];
  listProjections: ProjectionListModel[];
  refresh: Subject<any> = new Subject();
  activeDayIsOpen:boolean = false;
  subscription: Subscription;

  constructor(private projectionService: ProjectionService) { }

  ngOnInit() {
    this.subscribe();
    this.initList();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  subscribe() {
    this.subscription = this.projectionService.getSubject.subscribe(
      (data: ProjectionListModel[]) => {
        this.listProjections = data;
        this.appendDataOnCalendar();
      },
      () => {
        alert('Une erreur s\'est produite, veuillez contactez l\'administrateur');
      }
    );
  }

  unsubscribe() {
    this.subscription.unsubscribe();
  }

  initList() {
    this.projectionService.getProjection();
  }

  appendDataOnCalendar() {
    for(let i = 0; i < this.listProjections.length; i++) {
      this.events.push({
        title: this.listProjections[i].projectionMovie.movieTitle,
        start: new Date(this.listProjections[i].projectionDay),
        meta: {
          incrementsBadgeTotal: true
        }
      });
    }
    this.refresh.next();
  }

  onDayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.activeDayIsOpen = true;
  }

}