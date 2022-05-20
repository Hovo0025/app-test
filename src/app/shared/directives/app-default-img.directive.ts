import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDefaultImg]'
})
export class AppDefaultImgDirective implements OnInit {
  @Input() firstName: string = '';
  @Input() lastName: string = ''

  constructor(private elRef: ElementRef,
              private renderer: Renderer2) {}
  ngOnInit() {
    const content = `${this.firstName[0]}${this.lastName[0]}`;
    this.renderer.setProperty(this.elRef.nativeElement, 'innerHTML', content);
  }
}
