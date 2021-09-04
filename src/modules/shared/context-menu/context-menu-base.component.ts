import { Directive, ElementRef } from '@angular/core';

@Directive()
export abstract class ContextMenuBase {
  subRight = true;
  subBottom = true;
  protected ref: ElementRef;
  private _openMenu = false;

  get openMenu() {
    return this._openMenu;
  }

  constructor(ref: ElementRef) {
    this.ref = ref;
    this.close();
  }

  private setPosition(x: number, y: number): void {
    setTimeout(() => {
      const ele = this.ref.nativeElement;

      if (x + 2 * ele.offsetWidth > window.innerWidth) {
        this.subRight = false;
        if (x + ele.offsetWidth > window.innerWidth) {
          x -= ele.offsetWidth;
        }
      } else {
        this.subRight = true;
      }

      if (y + 2 * ele.offsetHeight > window.innerHeight) {
        this.subBottom = false;
        if (y + ele.offsetHeight > window.innerHeight) {
          y -= ele.offsetHeight;
        }
      } else {
        this.subBottom = true;
      }

      ele.setAttribute('style', `left: ${x}px; top: ${y}px; opacity: 1`);
    });
  }

  open(x?: number, y?: number): void {
    this.ref.nativeElement.setAttribute('style', `opacity: 0; display: flex`);
    if (x && y) {
      this.setPosition(x, y);
    } else {
      this.ref.nativeElement.setAttribute('style', 'opacity: 1');
    }

    this._openMenu = true;
  }

  close(): void {
    this.ref.nativeElement.setAttribute('style', `opacity: 0; display: none`);
    this._openMenu = false;
  }

  toggle(x?: number, y?: number): void {
    if (this._openMenu) {
      this.close();
    } else {
      this.open(x, y);
    }
  }
}
