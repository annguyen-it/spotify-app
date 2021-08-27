import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './main-view.component';
import { MainViewRoutingModule } from './main-view-routing.module';
import { TopBarModule } from '@modules/top-bar/top-bar.module';

@NgModule({
  imports: [
    CommonModule,
    MainViewRoutingModule,
    TopBarModule,
  ],
  declarations: [
    MainViewComponent,
  ],
  exports: [
    MainViewComponent
  ]
})
export class MainViewModule { }
