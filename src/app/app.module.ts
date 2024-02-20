import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    DashboardModule,
    AuthModule,
    CoreModule,
    RouterModule.forRoot([]),
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync(), {provide: MAT_DATE_LOCALE, useValue: 'es-Ar'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
