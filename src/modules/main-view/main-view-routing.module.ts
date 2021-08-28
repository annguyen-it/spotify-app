import { MainViewComponent } from './main-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // loadChildren: async () => (await import('../home/home.module')).HomeModule
    loadChildren: () => import('../home/home.module').then(m => m.HomeModule)

  },
  {
    path: 'library',
    loadChildren: async () => (await import('../library/library.module')).LibraryModule
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainViewRoutingModule { }
