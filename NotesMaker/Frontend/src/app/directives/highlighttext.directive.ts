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
    this.viewReady = true;

    // Apply highlight if input already has value
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
    let html = this.originalHtml;

    if (!this.highLightText || this.highLightText.trim() === '') {
      this.el.nativeElement.innerHTML = html;
      return;
    }

    const regexp = new RegExp(`${this.highLightText}`, 'gi');
    html = html.replace(
      regexp,
      `<span style="background-color: yellow;">${this.highLightText}</span>`
    );

    this.el.nativeElement.innerHTML = html;
  }
}
