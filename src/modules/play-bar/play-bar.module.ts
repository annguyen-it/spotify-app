import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayBarComponent } from './play-bar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [PlayBarComponent],
  exports: [PlayBarComponent]
})

export class PlayBarModule { }
