import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './components/router/app.component';
import { TestModelComponent } from './components/testModel/test-model.component';
import { ModelCreateComponent } from './components/modelCreate/model-create.component';
import { PredictionsComponent } from './components/predictions/predictions.component';
import { TrainModelComponent } from './components/trainModel/train-model.component';

import { MenuLinks } from './constants';

export const routes: Routes = [
  { path: MenuLinks.MODEL_CREATE_LINK, component: ModelCreateComponent },
  { path: MenuLinks.PREDICTIONS_LINK, component: PredictionsComponent },
  { path: MenuLinks.TEST_MODEL_LINK, component: TestModelComponent },
  { path: MenuLinks.TRAIN_MODEL_LINK, component: TrainModelComponent },
  { path: '', component: ModelCreateComponent },

]

@NgModule({
  declarations: [
    AppComponent,
    ModelCreateComponent,
    TestModelComponent,
    PredictionsComponent,
    TrainModelComponent,
  ],
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true
    }),
    FormsModule,
    BrowserModule,
    HttpClientModule   
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    ModelCreateComponent,
    TestModelComponent,
    //PredictionsComponent,
    //TrainModelComponent
  ]
})
export class AppModule { }
