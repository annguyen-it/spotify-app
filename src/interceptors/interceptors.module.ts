import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizeHeaderInterceptor } from './core/authorize-header.interceptor';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizeHeaderInterceptor,
      multi: true,
    }
  ]
})
export class InterceptorsModule { }
