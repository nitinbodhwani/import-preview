import {Component, ViewChild, ElementRef} from '@angular/core';
import { ReportColumnOptions, IReportDataModel, IReportModel } from '../../typings';
import { DataTableComponent } from '../data-table/data-table.component';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { RequestOptions} from '@angular/http';
import { ReportModel } from '../../models/ReportModel';
import { ReportDataModel } from '../../models/ReportDataModel';

@Component({
    selector:'import-section-comp',
    templateUrl:'./importSection.component.html'
})

export class ImportSectionComponent
{

    @ViewChild('fileName') fnameCtrl:any;
    @ViewChild(DataTableComponent) dtChild : DataTableComponent;

    inputButtonSeen:boolean=false;
    FileName:string;
    recievedFileData:any=[];
    showGrid: boolean = false;
    allowReportSubmit: boolean = false;

    constructor(private http: HttpClient){

    }
  
    reportColumnOptions:Array<ReportColumnOptions> = [
        {title: 'Node', name: 'Node'},
        {title: 'Panel', name: 'Panel', sort: ''},
        {title: 'Event.', name: 'Event', sort: ''},
        {title: 'Event Date/Time', name: 'Event Date/Time'},
        {title: 'Card No.', name: 'Card No', filtering: {filterString: '', placeholder: 'Filter by Card Number'}, sort: 'asc'},
        {title: 'Card Name', name: 'Card Name', filtering: {filterString: '', placeholder: 'Filter by Card Name'}},
        {title: 'Location', name: 'Location', sort: 'asc'},
        {title: 'Reader Id', name: 'Rdr'},
        {title: 'In', name: 'In'},
        {title: 'Out', name: 'Out'},
        {title: 'Affiliation', name: 'Affiliation'},
        {title: 'Alarm Text', name: 'Alarm Text'}        
      ];

      reportData = [];
    
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
        var consolidatedReportData = this.consolidateReportData();
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        this.http.post<ReportModel>('http://localhost/Attendance/api/report/submit', consolidatedReportData, {headers : headers}).toPromise().then(this.onSuccessfulReportSubmit).catch(this.onReportSubmitError);
    }

    onSuccessfulReportSubmit(submitReponse){
        if(submitReponse){
            this.allowReportSubmit = false;
            console.log("Report Submitted Successfully");
        }else{
            console.log("Report Submit Failed");
        }
    }

    onReportSubmitError(error){
        this.allowReportSubmit = true;
        console.log(error);
    }

    consolidateReportData() : ReportModel{
        var consolidatedReportData : ReportModel = new ReportModel() ;

        consolidatedReportData.ReportId = 0;
        consolidatedReportData.Name = this.FileName;
        consolidatedReportData.Month = 0;
        consolidatedReportData.Year = 0;
        consolidatedReportData.ImportDate = new Date();
        consolidatedReportData.ReportDataList = new Array<ReportDataModel>();

        this.recievedFileData.Sheet1.forEach(element => {
            let reportDataItem : ReportDataModel = new ReportDataModel();
            reportDataItem.ReportDataId = 0;
            reportDataItem.ReportId = 0;
            reportDataItem.Node = element["Node"];
            reportDataItem.Panel = element["Panel"];
            reportDataItem.Event = element["Event"];
            reportDataItem.EventDateTime =  element["Event Date/Time"];
            reportDataItem.CardNumber =  element["Card No"];
            reportDataItem.CardName =  element["Card Name"];
            reportDataItem.Location =  element["Location"];
            reportDataItem.ReaderId =  element["Rdr"];
            reportDataItem.In =  element["In"];
            reportDataItem.Out =  element["Out"];
            reportDataItem.Affiliation =  element["Affiliation"];
            reportDataItem.AlarmText =  element["Alarm Text"];
            
            consolidatedReportData.ReportDataList.push(reportDataItem);

        });

        return consolidatedReportData;
    }
}

export class Test{
    number: number;
}