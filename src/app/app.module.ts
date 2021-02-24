import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
// @ts-ignore
import {Chart} from 'node_modules/chart.js';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MyChartComponent} from './components/my-chart/my-chart.component';
import {DepartmentsComponent} from './components/departments/departments.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import {MatDatepickerModule,} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common'

@NgModule({
  declarations: [
    AppComponent,
    MyChartComponent,
    DepartmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
