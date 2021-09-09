import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthCheckDirective } from './auth-check.directive';
import { ContextMenuDirective } from './context-menu.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AuthCheckDirective,
    ContextMenuDirective
  ],
  exports: [
    AuthCheckDirective,
    ContextMenuDirective
  ]
})
export class DirectivesModule { }
