import { MainViewComponent } from './main-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MainViewComponent,
    children: [
      {
        path: '',
        loadChildren: async() => (await import('./home/home.module')).HomeModule
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainViewRoutingModule { }
