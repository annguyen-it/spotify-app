import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeachComponent } from './seach.component';
import { SeachRoutingModule } from './seach-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SeachRoutingModule,
  ],
  declarations: [SeachComponent],
  exports: [SeachComponent],
})
export class SeachModule { }
