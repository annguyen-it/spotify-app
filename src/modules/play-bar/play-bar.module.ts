import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayBarComponent } from './play-bar.component';
import { PipesModule } from '@pipes/pipes.module';
import { DirectivesModule } from '@directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    DirectivesModule,
  ],
  declarations: [PlayBarComponent],
  exports: [PlayBarComponent]
})

export class PlayBarModule { }
