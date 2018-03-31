
import {Component, ViewChildren, QueryList, ViewChild, ElementRef, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastsManager } from 'ng2-toastr';
import { IReportColumnOptions, IEmployeeAttendance } from '../../typings';
import { DataTableComponent } from '../data-table/data-table.component';
import { Http, Response } from '@angular/http'; 
import 'rxjs/add/operator/map';
import { EmployeeAttendance } from '../../models/EmployeeAttendance';


@Component({
    selector:'report-preview-component',
    templateUrl:'./reportPreview.component.html'
})

export class ReportPreviewComponent implements OnInit {
    currentJustify = 'justified';
    selectedByDate: any;
    isCollapsed = false;

    selectedMonthInReportByMonth: number;
    selectedYearInReportByMonth: number;
    filterValueInReportByMonth: string;
    employeeAttendanceByMonth: Array<EmployeeAttendance> = new Array<EmployeeAttendance>();

    monthArray:string[]=[
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    selectedMonth:string="--Month--"; 
    selectedYear:any="--Year--";
    minYear:number;   
    maxYear:number;   
    years:number[];  

    showGridByMonth: boolean = false;
    showGridByDate: boolean = false;
    @ViewChildren(DataTableComponent) dataTables: QueryList<DataTableComponent>;
    @ViewChild('btnSearchByDate') btnSearchByDateRef: ElementRef;
    @ViewChild('tab1') tab1Ref: ElementRef;
    @ViewChild('tab2') tab2Ref: ElementRef;
    
    reportColumnOptionsForByMonthGrid:Array<IReportColumnOptions> = [
        {title: 'Event Date', name: 'EventDate', filtering: {filterString: '', placeholder: 'Filter by Date'}},
        {title: 'Location', name: 'Location'},
        {title: 'In Time', name: 'InTime'},
        {title: 'Out Time', name: 'OutTime'},
        {title: 'Total Hours', name: 'TotalHours'}    
      ];

      reportColumnOptionsForByDateGrid:Array<IReportColumnOptions> = [
        {title: 'Event Date', name: 'EventDate'},
        {title: 'Employee Name', name: 'EmployeeName', filtering: {filterString: '', placeholder: 'Filter by Employee Name'}},
        {title: 'Employee Code', name: 'EmployeeCode', filtering: {filterString: '', placeholder: 'Filter by Employee Code'}},
        {title: 'Location', name: 'Location'},
        {title: 'In Time', name: 'InTime'},
        {title: 'Out Time', name: 'OutTime'},
        {title: 'Total Hours', name: 'TotalHours'}    
      ];

    constructor(private http: HttpClient, public toastr: ToastsManager){
    }

    getReportByDate(){
        if(this.selectedByDate)
        {            
            var selectedDate = this.selectedByDate.day;
            var selectedMonth = this.selectedByDate.month;
            var selectedYear = this.selectedByDate.year;

            var url = 'http://localhost/Attendance/api/report/date?day=' + selectedDate + '&month=' + selectedMonth + '&year=' + selectedYear;

            var headers = new HttpHeaders();
            headers.append('Content-Type', 'application/json');
            //this.http.get('http://localhost/Attendance/api/report/date?day=1&month=12&year=2017', {headers : headers}).toPromise().then(this.onSuccessOfSearchByDate.bind(null, this)).catch(this.onReportGetFailure.bind(null, this));
            this.http.get(url, {headers : headers}).toPromise().then(this.onSuccessOfSearchByDate.bind(null, this)).catch(this.onReportGetFailure.bind(null, this));
        }
    }

    onSuccessOfSearchByDate(self, reportData){
        if(reportData){
            self.showGridByDate = true;
            self.showGridByMonth = false;

            setTimeout(t => {

                var inProcessDataTable : DataTableComponent = self.dataTables.find(function(dt){
                    return dt.id == "gridByDate"
                });

                reportData.forEach(element => {

                    if(element["EventDate"]){
                        // Conversion to exclude time portion from the field value
                        element["EventDate"] = new Date(element["EventDate"]).toDateString();
                    }

                    // if(element["CardNumber"]){
                    //     // Converting Card Number field value into string as filtering in "ng2-table" works only for string values not the number
                    //     element["CardNumber"] = element["CardNumber"].toString();
                    // }
                });

                inProcessDataTable.columns = self.reportColumnOptionsForByDateGrid;
                inProcessDataTable.rows = reportData;
                inProcessDataTable.onDataChange();
            }, 1000);
        }else{
            self.showGridByDate = false;
            self.toastr.error("Failed: Report Search by date");
        }
    }

    getMonthInNumbers(monthInString: string) : number{
        var monthInNumber: number = 0;
        switch(monthInString){
            case "January":
                monthInNumber = 1;
                break;
            case "February":
                monthInNumber = 2;
                break;
            case "March":
                monthInNumber = 3;
                break;
            case "April":
                monthInNumber = 4;
                break;
            case "May":
                monthInNumber = 5;
                break;
            case "June":
                monthInNumber = 6;
                break;
            case "July":
                monthInNumber = 7;
                break;
            case "August":
                monthInNumber = 8;
                break;
            case "September":
                monthInNumber = 9;
                break;
            case "October":
                monthInNumber = 10;
                break;
            case "November":
                monthInNumber = 11;
                break;
            case "December":
                monthInNumber = 12;
                break;
        }

        return monthInNumber;
    }

    getReportByMonth(){

        if(this.selectedMonth != "--Month--" && this.selectedYear != "--Year--")
        {
            this.selectedMonthInReportByMonth = this.getMonthInNumbers(this.selectedMonth);
            this.selectedYearInReportByMonth = Number(this.selectedYear);

            var url : string = "";

            if(this.filterValueInReportByMonth){
                url = 'http://localhost/Attendance/api/report/aggregate?month=' + this.selectedMonthInReportByMonth + '&year=' + this.selectedYearInReportByMonth + '&filterValue=' + this.filterValueInReportByMonth;
            }
            else{
                url = 'http://localhost/Attendance/api/report/aggregate?month=' + this.selectedMonthInReportByMonth + '&year=' + this.selectedYearInReportByMonth;
            }
            
            var headers = new HttpHeaders();
            headers.append('Content-Type', 'application/json');
            //this.http.get('http://localhost/Attendance/api/report/date?day=1&month=12&year=2017', {headers : headers}).toPromise().then(this.onSuccessOfSearchByDate.bind(null, this)).catch(this.onReportGetFailure.bind(null, this));
            this.http.get(url, {headers : headers}).toPromise().then(this.onSuccessOfSearchByMonth.bind(null, this)).catch(this.onReportGetFailure.bind(null, this));
        }         
    }

    onSuccessOfSearchByMonth(self : ReportPreviewComponent, reportData: Array<IEmployeeAttendance>){
        if(reportData){
            self.showGridByDate = false;
            self.consolidateEmployeeAttendanceByMonth(self, reportData);
            self.showGridByMonth = true;

            setTimeout(t => {

                self.employeeAttendanceByMonth.forEach(function(attendanceItem, index){

                    var inProcessDataTable : DataTableComponent = self.dataTables.find(function(dt){
                        return dt.id == "DG" + (index + 1);
                    });

                    attendanceItem.SwipeInfoCollection.forEach(swipeInfoItem => {
                        if(swipeInfoItem["EventDate"]){
                            // Conversion to exclude time portion from the field value
                            swipeInfoItem["EventDate"] = new Date(swipeInfoItem["EventDate"]).toDateString();
                        }
                    });

                    inProcessDataTable.columns = self.reportColumnOptionsForByMonthGrid;
                    inProcessDataTable.rows = attendanceItem.SwipeInfoCollection;
                    inProcessDataTable.onDataChange();
                });
            }, 2000);
        }else{
            self.showGridByMonth = false;
            self.toastr.error("Failed: Report Search by month");
        }
    }

    consolidateEmployeeAttendanceByMonth(self:ReportPreviewComponent, employeeAttendanceData: Array<IEmployeeAttendance>){
        // To re-initialize the employee attendance data before consolidating
        self.employeeAttendanceByMonth = new Array<EmployeeAttendance>();

        employeeAttendanceData.forEach(function(employeeAttendance, index) {
            var attendanceItem = new EmployeeAttendance();

            attendanceItem.EmployeeName = employeeAttendance.EmployeeName;
            attendanceItem.EmployeeCode = employeeAttendance.EmployeeCode;
            attendanceItem.AggregatedHours = employeeAttendance.AggregatedHours;
            attendanceItem.IsCollapsed = true;
            attendanceItem.PanelId = "AP" + (index + 1);
            attendanceItem.DataGridId = "DG" + (index + 1);
            attendanceItem.SwipeInfoCollection = employeeAttendance.SwipeInfoCollection;
            self.employeeAttendanceByMonth.push(attendanceItem);
        });
    }

    onReportGetFailure(self, error){
        self.showGridByDate = false;
        self.showGridByCard = false;
        self.toastr.error("Failed: Report Search");
    }

    ngOnInit(){

        this.years=[];
        this.http.get('/assets/config.json')
        .subscribe((data : any)=>{
            this.minYear=data.startYear;
            this.maxYear=data.maxYear;
            console.log(this.minYear+"  "+this.maxYear);
            for(let i = this.minYear; i<=this.maxYear;i++){
                this.years.push(i);
            }
        })

        // this.http.get('/assets/config.json')
        // .map(data => data.json())
        // .subscribe(data=>{
        //     this.minYear=data.startYear;
        //     this.maxYear=data.maxYear;
        //     console.log(this.minYear);
        // })
    }

    SearchByCard(){
        console.log(this.selectedMonth);
        console.log(this.selectedYear);
    }
    SearchByDate(){
        console.log(this.selectedByDate);
    }
}