import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { FormComponent } from './form/form.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { TablaComponent } from './tabla/tabla.component';
import { ChartComponent } from './chart/chart.component';
import { PersonasService } from './personas.service';

const appRoutes: Routes = [
  { path: '', component: TablaComponent },
  { path: 'agregar', component: FormComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'editar/:id', component: FormComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HeaderComponent,
    TablaComponent,
    ChartComponent,
  ],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)],
  providers: [PersonasService],
  bootstrap: [AppComponent],
})
export class AppModule {}
