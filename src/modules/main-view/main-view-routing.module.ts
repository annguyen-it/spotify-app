import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'library',
    loadChildren: async () => (await import('../library/library.module')).LibraryModule

  },
  {
    path: 'search',
    loadChildren: async () => (await import('../search/search.module')).SearchModule

  },
  {
    path: 'playlist/:playlist-id',
    loadChildren: async () => (await import('../playlist/playlist.module')).PlaylistModule
  },
  {
    path: '',
    loadChildren: async () => (await import('../home/home.module')).HomeModule
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainViewRoutingModule { }
