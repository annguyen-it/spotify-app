import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistDetailsComponent } from './playlist-details.component';
import { CardModule } from '../card/card.module';

@NgModule({
  imports: [
    CommonModule,
    CardModule
  ],
  declarations: [PlaylistDetailsComponent],
  exports: [PlaylistDetailsComponent]
})
export class PlaylistDetailsModule { }
