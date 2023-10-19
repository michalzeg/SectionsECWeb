import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './store/reducer';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppEffects } from './store/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelModule } from 'primeng/panel';
import { ControlPanelComponent } from './home/control-panel/control-panel.component';
import { InputComponent } from './home/input/input.component';
import { ResultsComponent } from './home/results/results.component';
import { SectionComponent } from './home/section/section.component';
import { DetailedResultsComponent } from './home/detailed-results/detailed-results.component';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { ConcreteComponent } from './home/modals/concrete/concrete.component';
import { SteelComponent } from './home/modals/steel/steel.component';
import { LoadsComponent } from './home/modals/loads/loads.component';
import { SectionsComponent } from './home/modals/sections/sections.component';
import { ModalBaseComponent } from './home/modals/modal-base.component';
import { StressChartComponent } from './shared/components/stress-chart/stress-chart.component';
import { DrawingBaseComponent } from './shared/components/drawing-base/drawing-base.component';
import { RectangularInputComponent } from './home/modals/sections/rectangular-input/rectangular-input.component';
import { CircularInputComponent } from './home/modals/sections/circular-input/circular-input.component';
import { CustomInputComponent } from './home/modals/sections/custom-input/custom-input.component';
import { MultiplyBy100Pipe } from './shared/pipes/multiply-by100.pipe';
import { CustomFormatPipe } from './shared/pipes/custom-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ControlPanelComponent,
    InputComponent,
    ResultsComponent,
    SectionComponent,
    DetailedResultsComponent,
    ConcreteComponent,
    SteelComponent,
    LoadsComponent,
    SectionsComponent,
    ModalBaseComponent,
    StressChartComponent,
    DrawingBaseComponent,
    RectangularInputComponent,
    CircularInputComponent,
    CustomInputComponent,
    MultiplyBy100Pipe,
    CustomFormatPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ app: appReducer }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !environment.production
    }),
    PanelModule,
    MessagesModule,
    ButtonModule,
    DialogModule,
    ChartModule,
    DropdownModule,
    InputNumberModule,
    TooltipModule,
    TableModule,
    TabViewModule,
    InputTextModule,
    ProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
