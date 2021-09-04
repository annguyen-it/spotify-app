import { Directive, HostListener, Input } from '@angular/core';
import { ContextMenuBase } from '@modules/shared/context-menu/context-menu-base.component';
import { ContextMenuService } from '@services/context-menu.service';

@Directive({
  selector: '[contextMenu]'
})
export class ContextMenuDirective {
  @Input() popup!: ContextMenuBase;
  @Input() event!: ('contextmenu' | 'click')[];

  constructor(private contextMenuService: ContextMenuService) { }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent): void {
    event.preventDefault();
    this.contextMenuService.close();

    if (this.event.includes('contextmenu')){
      event.stopPropagation();
      this.contextMenuService.setControl(this.popup);
      this.contextMenuService.toggle(event.pageX, event.pageY);
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.contextMenuService.isControllingContext(this.popup)){
      this.contextMenuService.close();
    }
    
    if (this.event.includes('click')){
      event.stopPropagation();
      this.contextMenuService.setControl(this.popup);
      this.contextMenuService.toggle();
    }
  }
}
