import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// import { SimplemdeModule, SIMPLEMDE_CONFIG } from '../../projects/simplemde-ng-lib/src/public_api';
import { SimplemdeModule, SIMPLEMDE_CONFIG } from 'simplemde-ng-lib';

var simpleMdeOptions: any = {};

var moduleImports = [
  BrowserModule,
  SimplemdeModule.forRoot({
      provide: SIMPLEMDE_CONFIG,
      // config options 1
      useValue: simpleMdeOptions
  })
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: moduleImports,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
