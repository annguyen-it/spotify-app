import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthCheckDirective } from './auth-check.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AuthCheckDirective
  ],
  exports: [
    AuthCheckDirective
  ]
})
export class DirectivesModule { }
