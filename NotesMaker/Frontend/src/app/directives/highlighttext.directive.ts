import { AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlighttext]',
  standalone: true
})
export class HighlighttextDirective implements OnChanges, AfterViewInit {

  @Input() highLightText: string = '';

  private originalHtml: string = '';
  private viewReady = false;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.originalHtml = this.el.nativeElement.innerHTML;
    console.log(this.el.nativeElement.innerHTML);
    this.viewReady = true;

    // Apply highlight if input already has valuea
    if (this.highLightText) {
      this.applyHighlight();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.viewReady) return; 

    if (changes['highLightText']) {
      this.applyHighlight();
    }
  }

  private applyHighlight() {
  if (!this.originalHtml) this.originalHtml = this.el.nativeElement.innerHTML;

  console.log(this.el.nativeElement.innerHTML);
  const term = (this.highLightText || '').trim();
  if (!term) {
    this.el.nativeElement.innerHTML = this.originalHtml;
    return;
  }

  const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regexp = new RegExp('(' + escapeRegExp(term) + ')', 'gi');

  this.el.nativeElement.innerHTML = this.originalHtml.replace(
    regexp,
    '<span style="background-color: yellow;">$1</span>'
  );
}
}
