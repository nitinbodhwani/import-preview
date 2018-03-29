import { Component } from '@angular/core';
import { Http, Response } from '@angular/http'; 
import 'rxjs/add/operator/map';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
    selector:'report-preview-component',
    templateUrl:'./reportPreview.component.html'
})

export class ReportPreviewComponent implements OnInit {
    currentJustify = 'justified';
    selectedByDate: any;
    selectedByCard: any;
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

    constructor(private http:Http){

    }

    ngOnInit(){
        this.http.get('/assets/config.json')
        .map(data => data.json())
        .subscribe(data=>{
            this.minYear=data.startYear;
            this.maxYear=data.maxYear;
            console.log(this.minYear);
        })
    }

    SearchByCard(){
        console.log(this.selectedMonth);
    }
}