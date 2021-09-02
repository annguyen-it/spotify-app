import { Injectable } from '@angular/core';
import { ContextMenuBase } from '@modules/shared/context-menu/context-menu-base.component';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {
  onControlContextMenu?: ContextMenuBase;

  constructor() { }

  setControl(context: ContextMenuBase): void {
    this.onControlContextMenu = context;
  }

  isControllingContext(context: ContextMenuBase): boolean {
    return this.onControlContextMenu === context;
  }

  toggle(x?: number, y?: number): void {
    if (this.onControlContextMenu) {
      this.onControlContextMenu.toggle(x, y);
    }
  }

  close(): void {
    if (this.onControlContextMenu) {
      this.onControlContextMenu.close();
    }
  }
}
