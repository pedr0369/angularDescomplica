import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazzyRoutingModule } from './lazzy-routing.module';
import { LazzyComponent } from './lazzy.component';


@NgModule({
  declarations: [
    LazzyComponent
  ],
  imports: [
    CommonModule,
    LazzyRoutingModule
  ]
})
export class LazzyModule { }
