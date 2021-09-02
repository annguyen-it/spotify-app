import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthorizationService } from '@services/authorization.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[spotifyAuthCheck]'
})
export class AuthCheckDirective implements OnInit, OnDestroy {
  private sub!: Subscription;
  @Input() display: string = 'block';
  @Input() displayIfAuth: boolean = true;

  constructor(
    private ref: ElementRef,
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.sub = this.authorizationService
      .isAuthorized()
      .subscribe((isAuthorized) => {
        if (this.displayIfAuth) {
          this.ref.nativeElement.style.display = isAuthorized
            ? this.display
            : 'none';

        } else {
          this.ref.nativeElement.style.display = isAuthorized
            ? 'none'
            : this.display;
        }
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
