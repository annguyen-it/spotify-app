import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveTagPipe } from './remove-tag.pipe';

@NgModule({
  declarations: [
    RemoveTagPipe
  ],
  imports: [CommonModule],
  exports: [
    RemoveTagPipe
  ]
})
export class PipesModule { }
