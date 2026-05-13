import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-iframe-view',
  template: `<iframe [src]="safeSrc" style="width:100%;height:100%;border:none;" allow="fullscreen"></iframe>`,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class IframeViewComponent implements OnInit {
  safeSrc!: SafeResourceUrl;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const src: string = this.route.snapshot.data['src'];
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(src);
  }
}
