import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ImportSectionComponent } from './components/importSection/importSection.component';
import { ReportPreviewComponent } from './components/reportPreview/reportPreview.component';

const routes: Routes=[
  {path:'import', component:ImportSectionComponent},
  {path:'report', component:ReportPreviewComponent},
  {path:'', redirectTo:'/import', pathMatch:'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
