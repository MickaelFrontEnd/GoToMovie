import { Component, OnInit } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import ProjectionService from '../services/projection.service';
import ProjectionModel from '../models/projection.model';
import { ProjectionListModel } from '../models/projection.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-calendar-projection',
  templateUrl: './calendar-projection.component.html',
  styleUrls: ['./calendar-projection.component.css']
})
export class CalendarProjectionComponent implements OnInit {

  viewDate:Date = new Date();
  events: Array<CalendarEvent<{ incrementsBadgeTotal: boolean }>> = [];
  //events: Observable<Array<CalendarEvent<{ incrementsBadgeTotal: boolean }>>>;
  listProjections: ProjectionListModel[];
  refresh: Subject<any> = new Subject();
  activeDayIsOpen:boolean = false;

  constructor(private projectionService: ProjectionService) { }

  ngOnInit() {
    this.subscribe();
    this.initList();
  }

  subscribe() {
    this.projectionService.getSubject.subscribe(
      (data: ProjectionListModel[]) => {
        //this.isLoading = false;
        this.listProjections = data;
        this.appendDataOnCalendar();
      },
      () => {
        //this.isLoading = false;
      }
    );
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
    //events.next()
    this.refresh.next();
  }

  onDayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.activeDayIsOpen = true;
  }

}
