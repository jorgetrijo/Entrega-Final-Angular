import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ HomePageComponent, FooterComponent],
  imports: [ CommonModule, MaterialModule, RouterModule],
  exports: [ MaterialModule, HomePageComponent, FooterComponent]
})
export class SharedModule { }
