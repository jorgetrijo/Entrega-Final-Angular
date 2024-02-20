import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MontosPipe } from './pipes/montos.pipe';



@NgModule({
  declarations: [ HomePageComponent, FooterComponent, MontosPipe],
  imports: [ CommonModule, MaterialModule, RouterModule],
  exports: [ MaterialModule, HomePageComponent, FooterComponent, MontosPipe]
})
export class SharedModule { }
