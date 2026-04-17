import { Directive, ElementRef, HostListener, Renderer2, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appDisableAfterClick]',
  standalone: true
})
export class AppDisableAfterClickDirective implements OnInit, OnDestroy {
  private originalContent: string = '';
  private timeoutId: any = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.originalContent = this.el.nativeElement.innerHTML;
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const button = this.el.nativeElement as HTMLButtonElement;
    if (button.disabled || button.tagName !== 'BUTTON') return;

    this.renderer.setProperty(button, 'disabled', true);
    this.renderer.setProperty(button, 'innerHTML', 'Processing...');

    this.timeoutId = setTimeout(() => {
      this.renderer.setProperty(button, 'disabled', false);
      this.renderer.setProperty(button, 'innerHTML', this.originalContent);
      this.timeoutId = null;
    }, 3000);
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
