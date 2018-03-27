import {Component, ViewChild, ElementRef} from '@angular/core';
import { ReportColumnOptions } from '../../typings';
import { DataTableComponent } from '../data-table/data-table.component';

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
        // console.log(this.fnameCtrl.nativeElement.value);
        //document.getElementById('uploadBotton').attributes.removeNamedItem('disabled');
        console.log(this.recievedFileData);
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
            }, 1000);
            
        }
    }
}