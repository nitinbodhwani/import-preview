import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import {MainPanelComponent} from './components/mainPanel/mainPanel.component';
import {ImportSectionComponent} from './components/importSection/importSection.component';
import {XLSXDirective} from './directives/xlsx.directive'


@NgModule({
  declarations: [
    AppComponent,
    MainPanelComponent,
    ImportSectionComponent,
    XLSXDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
