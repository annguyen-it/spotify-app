import { Component, ElementRef, OnInit } from '@angular/core';
import { AccountService } from '@services/account.service';
import { AuthorizationService } from '@services/authorization.service';
import { ContextMenuBase } from '../context-menu-base.component';

@Component({
  selector: 'spotify-top-bar-context-menu',
  templateUrl: './top-bar-context-menu.component.html',
  styleUrls: ['./top-bar-context-menu.component.scss']
})
export class TopBarContextMenuComponent extends ContextMenuBase {
  constructor(
    ref: ElementRef,
    private accountService: AccountService,
    private authorizationService: AuthorizationService
  ) {
    super(ref);
  }

  ngOnInit(): void {
  }

  upgrade(): void {
    this.accountService.upgrade();
  }

  logOut(): void {
    this.authorizationService.logOut();
  }
}
