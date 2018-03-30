
import {Component, ViewChildren, QueryList, ViewChild, ElementRef, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastsManager } from 'ng2-toastr';
import { IReportColumnOptions } from '../../typings';
import { DataTableComponent } from '../data-table/data-table.component';
import { Http, Response } from '@angular/http'; 
import 'rxjs/add/operator/map';


@Component({
    selector:'report-preview-component',
    templateUrl:'./reportPreview.component.html'
})

export class ReportPreviewComponent implements OnInit {
    currentJustify = 'justified';
    selectedByDate: any;
    selectedMonthInReportByMonth: number;
    selectedYearInReportByMonth: number;
    filterValueInReportByMonth: string;

    showGridByCard: boolean = false;
    showGridByDate: boolean = false;
    @ViewChildren(DataTableComponent) dataTables: QueryList<DataTableComponent>;
    @ViewChild('btnSearchByDate') btnSearchByDateRef: ElementRef;
    @ViewChild('tab1') tab1Ref: ElementRef;
    @ViewChild('tab2') tab2Ref: ElementRef;
    
    reportColumnOptionsForByCardGrid:Array<IReportColumnOptions> = [
        {title: 'Event Date', name: 'EventDate', filtering: {filterString: '', placeholder: 'Filter by Date'}},
        {title: 'Card Number', name: 'CardNumber'},
        {title: 'Card Name', name: 'CardName'},
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
            self.showGridByCard = false;

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

    getReportByMonth(){
        if(this.selectedByDate)
        {
            
            var selectedDate = this.selectedByDate.day;
            var selectedMonth = this.selectedByDate.month;
            var selectedYear = this.selectedByDate.year;

            var url = 'http://localhost/Attendance/api/report/aggregate?month=' + this.selectedMonthInReportByMonth + '&year=' + this.selectedYearInReportByMonth + '&filterValue=' + this.filterValueInReportByMonth;

            var headers = new HttpHeaders();
            headers.append('Content-Type', 'application/json');
            //this.http.get('http://localhost/Attendance/api/report/date?day=1&month=12&year=2017', {headers : headers}).toPromise().then(this.onSuccessOfSearchByDate.bind(null, this)).catch(this.onReportGetFailure.bind(null, this));
            this.http.get(url, {headers : headers}).toPromise().then(this.onSuccessOfSearchByMonth.bind(null, this)).catch(this.onReportGetFailure.bind(null, this));
        }
    }

    onSuccessOfSearchByMonth(self, reportData){
        if(reportData){
            self.showGridByDate = true;
            self.showGridByCard = false;

            setTimeout(t => {

                var inProcessDataTable : DataTableComponent = self.dataTables.find(function(dt){
                    return dt.id == "gridByMonth"
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

    onReportGetFailure(self, error){
        self.showGridByDate = false;
        self.showGridByCard = false;
        self.toastr.error("Failed: Report Search");
    }

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
    selectedMonth:string="January"; 
    minYear:number;   
    maxYear:number;        


    ngOnInit(){
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
    }
}