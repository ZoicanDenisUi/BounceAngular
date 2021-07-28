import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appExpandOnHover]'
})
export class ExpandOnHoverDirective {

  constructor(private el:ElementRef) { 
    this.el.nativeElement.style.transition="1.2s"
    this.el.nativeElement.style.color="#f2f2f2"
    this.el.nativeElement.style.fontWeight="400"
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.cursor = 'pointer'
    this.el.nativeElement.style.transform = 'scale(1.1)'
    this.el.nativeElement.style.color="#474747"
    this.el.nativeElement.style.fontWeight="900"
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.transform = 'scale(1)'
    this.el.nativeElement.style.color="#f2f2f2"
    this.el.nativeElement.style.fontWeight="400"
  }
  
}
