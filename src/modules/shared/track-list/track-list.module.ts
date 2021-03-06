import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackListComponent } from './track-list.component';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
  ],
  declarations: [TrackListComponent],
  exports: [TrackListComponent]
})
export class TrackListModule { }
