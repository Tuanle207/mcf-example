import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PostMessageBridgeService } from '../services/post-message-bridge.service';

@Component({
  selector: 'report-view',
  template: `
    <div class="map-container">
      <iframe #mapIframe src="http://localhost:3000" style="width:100%;height:100%;border:none;" allow="fullscreen"></iframe>
    </div>

    <div class="wirebreak-container">
      <iframe #wirebreakIframe src="http://localhost:3001" style="width:100%;height:100%;border:none;"></iframe>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      .map-container {
        display: block;
        width: calc(100% - 32px);
        height: calc(100% - 32px);
        border: 2px dashed skyblue;
        overflow: hidden;
        margin: 16px;
      }

      .wirebreak-container {
        display: block;
        position: absolute;
        z-index: 10000;
        width: 30%;
        height: 50%;
        padding: 8px;
        transform: translateY(-50%);
        top: 50%;
        left: 100px;
        background: white;
        border: 2px dashed slateblue;
      }
    `,
  ],
})
export class ReportViewComponent implements OnInit, OnDestroy {
  @ViewChild('mapIframe') mapIframe!: ElementRef<HTMLIFrameElement>;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly bridgeService: PostMessageBridgeService) {}

  ngOnInit(): void {
    // Relay messages from wirebreak iframe → map iframe
    this.bridgeService.message$.pipe(takeUntil(this.destroy$)).subscribe(message => {
      if (this.mapIframe?.nativeElement) {
        this.bridgeService.sendToIframe(this.mapIframe.nativeElement, message);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
