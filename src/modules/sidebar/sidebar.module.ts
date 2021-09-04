import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '@directives/directives.module';

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DirectivesModule
  ],
  exports: [
    SidebarComponent,
  ]
})
export class SidebarModule { }
