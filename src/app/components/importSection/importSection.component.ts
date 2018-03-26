import {Component, ViewChild, ElementRef} from '@angular/core';
import { ReportColumnOptions } from '../../typings';
import { DataTableComponent } from '../data-table/data-table.component';
//import * as XLSX from 'xlsx';
//import * as XLSX from 'ts-xlsx';

@Component({
    selector:'import-section-comp',
    templateUrl:'./importSection.component.html'
})

export class ImportSectionComponent{

    @ViewChild('fileName') fnameCtrl:any;
    @ViewChild(DataTableComponent) dtChild : DataTableComponent;

    inputButtonSeen:boolean=false;
    FileName:string;
    recievedFileData:any=[];

    reportColumnOptions:Array<ReportColumnOptions> = [
        {title: 'Node', name: 'Node'},
        {title: 'Panel', name: 'Panel', sort: ''},
        {title: 'Event.', name: 'Event', sort: ''},
        {title: 'Event Date/Time', name: 'Event Date/Time', sort: 'asc'},
        {title: 'Card No.', name: 'Card No', filtering: {filterString: '', placeholder: 'Filter by Card Number'}, sort: 'asc'},
        {title: 'Card Name', name: 'Card Name', filtering: {filterString: '', placeholder: 'Filter by Card Name'}, sort: 'asc'},
        {title: 'Location', name: 'Location', sort: 'asc'},
        {title: 'Reader Id', name: 'Rdr'},
        {title: 'In', name: 'In'},
        {title: 'Out', name: 'Out'},
        {title: 'Affiliation', name: 'Affiliation'},
        {title: 'Alarm Text', name: 'Alarm Text'}        
      ];

      reportData = [];
    
    ImportDisplay(){
        // console.log(this.fnameCtrl.nativeElement.value);
        //document.getElementById('uploadBotton').attributes.removeNamedItem('disabled');
        console.log(this.recievedFileData);
        console.log(this.recievedFileData.Sheet1[0]);


    }

    SelectFile(){
        document.getElementById('hideFileInputButton').click();
        //console.log(this.fnameCtrl);
        setTimeout(t=>{
            // console.log(this.fnameCtrl.nativeElement.files[0].name);
            this.FileName=this.fnameCtrl.nativeElement.files[0].name;
        },8000);        
    }

    DataRecieved(event){
        this.recievedFileData=event;

        // this.recievedFileData = this.recievedFileData.Sheet1.map(function(item){
        //     if(item["Card No."] != undefined){
        //         item["Card No"] = item["Card No."];
        //         delete item["Card No."];
        //     }
        //     return item;
        // });

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

        this.dtChild.columns = this.reportColumnOptions;
        this.dtChild.rows = this.recievedFileData.Sheet1;
        this.dtChild.onDataChange();
        console.log(this.recievedFileData);
    }
}