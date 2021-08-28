import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackListComponent } from './track-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TrackListComponent],
  exports: [TrackListComponent]
})
export class TrackListModule { }
