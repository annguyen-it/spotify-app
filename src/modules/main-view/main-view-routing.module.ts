import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'library',
    loadChildren: async () => (await import('../library/library.module')).LibraryModule
  },
  {
    path: 'playlist/:playlist-id',
    loadChildren: async () => (await import('../playlist/playlist.module')).PlaylistModule
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: async () => (await import('../home/home.module')).HomeModule
  },
  {
    path: '**',
    redirectTo: 'playlist/:playlist-id'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainViewRoutingModule { }
