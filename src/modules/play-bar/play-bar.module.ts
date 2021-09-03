import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayBarComponent } from './play-bar.component';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
  ],
  declarations: [PlayBarComponent],
  exports: [PlayBarComponent]
})

export class PlayBarModule { }
