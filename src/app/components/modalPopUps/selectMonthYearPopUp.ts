import {Component} from '@angular/core';
import {NgbActiveModal,NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector:'month-year-pop-up',
    templateUrl:'./selectMonthYearPopUp.html'
})

export class SelectMonthYearPopUp {

    model: NgbDateStruct;
    //model;

    constructor(public activeModal: NgbActiveModal) {

    }


    Submit(){
        console.log(this.model.month+" : "+this.model.year);
    }

}