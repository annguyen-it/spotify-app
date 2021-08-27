import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistDetailsComponent } from './playlist-details.component';
import { CardModule } from '../card/card.module';
import { AngularResizedEventModule } from 'angular-resize-event';

@NgModule({
  imports: [
    CommonModule,
    AngularResizedEventModule,
    CardModule
  ],
  declarations: [PlaylistDetailsComponent],
  exports: [PlaylistDetailsComponent]
})
export class PlaylistDetailsModule { }
