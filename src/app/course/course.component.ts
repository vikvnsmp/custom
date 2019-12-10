import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {Course} from "../model/course";
import {CoursesService} from "../services/courses.service";
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge, fromEvent} from "rxjs";
import {LessonsDataSource} from "../services/lessons.datasource";


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    course:Course;

    dataSource: LessonsDataSource;

    //displayedColumns= ["seqNo", "description", "duration"];
    displayedColumns = [];

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    //@ViewChild(MatSort, { static: false }) sort: MatSort;

    @ViewChild('input', { static: false }) input: ElementRef;

    constructor(private route: ActivatedRoute,
                private coursesService: CoursesService) {

    }

    ngOnInit() {

        this.course = this.route.snapshot.data["course"];

        this.dataSource = new LessonsDataSource(this.coursesService);
        debugger;
        this.dataSource.loadLessons(this.course.id, '', 'asc', 0, 3);
        debugger;
        
        //this.displayedColumns = this.dataSource.cols;
        //console.log(this.displayedColumns);
        //this.displayedColumns = Object.keys(this.dataSource[0]);
    }

    ngAfterViewInit() {

        this.paginator.page
        .pipe(
            tap(() => this.loadLessonsPage())
        )
        .subscribe();

       /*this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;

                    this.loadLessonsPage();
                })
            )
            .subscribe();

        merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            tap(() => this.loadLessonsPage())
        )
        .subscribe();*/

    }

    loadLessonsPage() {
        this.dataSource.loadLessons(
            this.course.id,
            this.input.nativeElement.value,
            'asc',
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }
   // manualPage:number;

    // setPage(index: number) {
    //     this.paginator.pageIndex = index-1;
    //     this.loadLessonsPage();
    //   }

   /* updateManualPage(index: number): void {
        this.manualPage = index;
        this.paginator.pageIndex = index;
        this.paginator.page.next({
          pageIndex: this.paginator.pageIndex,
          pageSize: this.paginator.pageSize,
          length: this.paginator.length
        });
      }
    clearManualPage(): void {
        this.manualPage = 0;
      }*/


}
