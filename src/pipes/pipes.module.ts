import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveTagPipe } from './remove-tag.pipe';
import { DurationPipe } from './duration.pipe';

@NgModule({
  declarations: [
    RemoveTagPipe,
    DurationPipe
  ],
  imports: [CommonModule],
  exports: [
    RemoveTagPipe,
    DurationPipe
  ]
})
export class PipesModule { }
