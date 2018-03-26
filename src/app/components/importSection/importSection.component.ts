import {Component, ViewChild, ElementRef} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { SelectMonthYearPopUp } from '../modalPopUps/selectMonthYearPopUp';
//import * as XLSX from 'xlsx';
//import * as XLSX from 'ts-xlsx';

@Component({
    selector:'import-section-comp',
    templateUrl:'./importSection.component.html'
})

export class ImportSectionComponent{

    @ViewChild('fileName') fnameCtrl:any;

    inputButtonSeen:boolean=false;
    FileName:string;
    recievedFileData:any=[];

    constructor(public modalService:NgbModal){

    }
  
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
        console.log(this.recievedFileData);
    }

    OpenModal(){
        const modRef= this.modalService.open(SelectMonthYearPopUp);
    }
}