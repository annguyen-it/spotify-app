import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayBarComponent } from './play-bar.component';


@NgModule({
  declarations: [PlayBarComponent],
  imports: [CommonModule],
  exports: [PlayBarComponent]
})

export class PlayBarModule { }
