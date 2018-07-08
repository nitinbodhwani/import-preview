import {Component, ViewChild, ElementRef, ViewContainerRef, Input, OnInit} from '@angular/core';
import { IReportColumnOptions, IReportDataModel, IReportModel } from '../../typings';
import { DataTableComponent } from '../data-table/data-table.component';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { RequestOptions} from '@angular/http';
import { ReportModel } from '../../models/ReportModel';
import { ReportDataModel } from '../../models/ReportDataModel';
import { ToastsManager } from 'ng2-toastr';

@Component({
    selector:'import-section-comp',
    templateUrl:'./importSection.component.html'
})

export class ImportSectionComponent implements OnInit
{

    @ViewChild('fileName') fnameCtrl:any;
    @ViewChild(DataTableComponent) dtChild : DataTableComponent;

    inputButtonSeen:boolean=false;
    FileName:string;
    recievedFileData:any=[];
    showGrid: boolean = false;
    allowReportSubmit: boolean = false;

    displayLoader:boolean=false;
    data: any;
    apihost: string;

    constructor(private http: HttpClient, public toastr: ToastsManager){
    }

    ngOnInit(){
        this.http.get('/AttendanceApp/assets/config.json')
        .subscribe((data : any)=>{
            this.apihost = data.apihost;
        })
    }
  
    reportColumnOptions:Array<IReportColumnOptions> = [
        {title: 'Node', name: 'Node'},
        {title: 'Panel', name: 'Panel', sort: ''},
        {title: 'Event', name: 'Event', sort: ''},
        {title: 'Event Date/Time', name: 'Event Date/Time'},
        // {title: 'Card No.', name: 'Card No', filtering: {filterString: '', placeholder: 'Filter by Card Number'}, sort: 'asc'},
        // {title: 'Card Name', name: 'Card Name', filtering: {filterString: '', placeholder: 'Filter by Card Name'}},
        {title: 'Card No.', name: 'Card No'},
        {title: 'Card Name', name: 'Card Name'},
        {title: 'Location', name: 'Location', sort: 'asc'},
        {title: 'Reader Id', name: 'Rdr'},
        {title: 'In', name: 'In'},
        {title: 'Out', name: 'Out'},
        {title: 'Affiliation', name: 'Affiliation'},
        {title: 'Alarm Text', name: 'Alarm Text'}        
      ];
    
    ImportDisplay(){
        console.log(this.recievedFileData.Sheet1[0]);
    }

    SelectFile(){
        document.getElementById('hideFileInputButton').click();
    }

    DataRecieved(event){

        if(event != undefined)
        {
            this.showGrid = true;
            this.FileName=this.fnameCtrl.nativeElement.files[0].name;
            this.recievedFileData=event;

            this.recievedFileData.Sheet1.forEach(element => {
                if(element["Card No."] != undefined){
                    element["Card No"] = element["Card No."];
                    delete element["Card No."];
                }

                if(element["In"] == undefined){
                    element["In"] = "";
                }

                if(element["Out"] == undefined){
                    element["Out"] = "";
                }

                if(element["Alarm Text"] == undefined){
                    element["Alarm Text"] = "";
                }

            });

            setTimeout(t => {
                this.dtChild.columns = this.reportColumnOptions;
                this.dtChild.rows = this.recievedFileData.Sheet1;
                this.dtChild.onDataChange();
                this.allowReportSubmit = true;
            }, 1000);
            
        }
    }

    onReportSubmit(){
        this.displayLoader=true;
        setTimeout(t=>{
            document.getElementById("overlay").style.display='block';
            var consolidatedReportData = this.consolidateReportData();
            var headers = new HttpHeaders();
            headers.append('Content-Type', 'application/json');

            // var splittedReportDataList = [];
            // var recordLimit = 5000;
            // var reportDataListCount = (consolidatedReportData.ReportDataList.length % recordLimit) > 0 ? (consolidatedReportData.ReportDataList.length / recordLimit) + 1 : (consolidatedReportData.ReportDataList.length / recordLimit);

            // for(let i = 0; i< reportDataListCount; i++){
            //     let sliceStartIndex = (i * recordLimit) > 0 ? (i * recordLimit) + 1 : (i * recordLimit);
            //     let sliceEndIndex = sliceStartIndex != 0 ? sliceStartIndex + 4999 : sliceStartIndex + 5000;

            //     splittedReportDataList.push(consolidatedReportData.ReportDataList.slice(sliceStartIndex, sliceEndIndex))
            // }

            // splittedReportDataList.forEach(element => {
            //     let postData = consolidatedReportData;
            //     postData.ReportDataList = element;
            //     this.http.post<ReportModel>('http://localhost/Attendance/api/report/submit', postData, {headers : headers}).toPromise().then(this.onSuccessfulReportSubmit.bind(null, this)).catch(this.onReportSubmitError.bind(null, this));
            // });
            // consolidatedReportData.ReportDataList = consolidatedReportData.ReportDataList.slice(0, 5000);

             this.http.post<ReportModel>('http://' + this.apihost +'/Attendance/api/report/submit', consolidatedReportData, {headers : headers}).toPromise().then(this.onSuccessfulReportSubmit.bind(null, this)).catch(this.onReportSubmitError.bind(null, this));
        },1000);
        
        
    }

    onSuccessfulReportSubmit(self, submitReponse){
        self.displayLoader=false;

        if(submitReponse){
            self.allowReportSubmit = false;
            self.toastr.success("Report saved Successfully", null,{titleClass:"SUCCESS"});
            console.log("Report Submitted Successfully");
        }else{
            self.toastr.error("Failed: Report submit");
            console.log("Report Submit Failed");
        }
    }

    onReportSubmitError(self, error){
        self.displayLoader=false;
        self.allowReportSubmit = true;
        self.toastr.error("Failed: Report submit");
        console.log(error);
    }

    parseDate(input) {
        var parts = input.match(/(\d+)/g);
        // note parts[1]-1
        return new Date(Date.UTC(parts[2], parts[1]-1, parts[0], parts[3], parts[4], parts[5]));
      }
      
     // parseDate('31.05.2010');
    consolidateReportData() : ReportModel{
        var consolidatedReportData : ReportModel = new ReportModel() ;

        consolidatedReportData.ReportId = 0;
        consolidatedReportData.Name = this.FileName;
        consolidatedReportData.ImportDate = new Date();
        consolidatedReportData.ReportDataList = new Array<ReportDataModel>();

        this.recievedFileData.Sheet1.forEach(element => {
            try {
            let reportDataItem : ReportDataModel = new ReportDataModel();
            reportDataItem.ReportDataId = 0;
            reportDataItem.ReportId = 0;
            reportDataItem.Node = element["Node"];
            reportDataItem.Panel = element["Panel"];
            reportDataItem.Event = element["Event"];
            //reportDataItem.EventDateTime = new Date(element["Event Date/Time"]).toDateString();
            reportDataItem.EventDateTime = this.parseDate(element["Event Date/Time"]);
            reportDataItem.CardNumber =  element["Card No"];
            reportDataItem.CardName =  element["Card Name"];
            reportDataItem.Location =  element["Location"];
            reportDataItem.ReaderId =  element["Rdr"];
            reportDataItem.In =  element["In"];
            reportDataItem.Out =  element["Out"];
            reportDataItem.Affiliation =  element["Affiliation"];
            reportDataItem.AlarmText =  element["Alarm Text"];
            consolidatedReportData.ReportDataList.push(reportDataItem);
            } catch (error) {
                console.log(element);
                throw error;
            }
        });

        return consolidatedReportData;
    }
}