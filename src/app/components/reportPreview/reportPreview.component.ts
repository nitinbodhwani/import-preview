import {Component} from '@angular/core';

import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
 


@Component({
    selector:'report-preview-component',
    templateUrl:'./reportPreview.component.html'
})

export class ReportPreviewComponent{
    currentJustify = 'justified';
    model;

    options: DatepickerOptions = {
        minYear: 1970,
        maxYear: 2030,
        displayFormat: 'MMM YYYY',
        barTitleFormat: 'MMMM YYYY',
        dayNamesFormat: 'dd',
        firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
        locale: frLocale,
        minDate: new Date(Date.now()), // Minimal selectable date
        maxDate: new Date(Date.now()),  // Maximal selectable date
        barTitleIfEmpty: 'Click to select a date'
      };
}