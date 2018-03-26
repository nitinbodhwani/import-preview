import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import {MainPanelComponent} from './components/mainPanel/mainPanel.component';
import {ImportSectionComponent} from './components/importSection/importSection.component';
import {XLSXDirective} from './directives/xlsx.directive';
import {SelectMonthYearPopUp} from './components/modalPopUps/selectMonthYearPopUp';


@NgModule({
  declarations: [
    AppComponent,
    MainPanelComponent,
    ImportSectionComponent,
    XLSXDirective,
    SelectMonthYearPopUp,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  entryComponents: [
    SelectMonthYearPopUp,
],
  providers: [],
  bootstrap: [AppComponent],
  exports:[
    SelectMonthYearPopUp
  ]
})
export class AppModule { }
