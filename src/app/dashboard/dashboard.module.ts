import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { MontosPipe } from '../shared/pipes/montos.pipe';



@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, SharedModule],
  exports: [DashboardComponent]
})
export class DashboardModule { }
