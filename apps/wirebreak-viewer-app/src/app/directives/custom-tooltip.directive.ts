import { ComponentRef, Directive, ElementRef, HostListener, Input, TemplateRef } from '@angular/core';
import { TooltipComponent } from '../components/tooltip/tooltip.component';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

// https://stackblitz.com/edit/angular-tooltip-with-arrow?file=src%2Fapp%2Ftooltip%2Ftooltip.directive.ts
@Directive({
  selector: '[appCustomTooltip]',
  standalone: true,
})
export class CustomTooltipDirective {
  @Input('appCustomTooltip') tooltip: string | TemplateRef<any> | null = null;
  @Input() tooltipDisabled = false;
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' | 'auto' = 'auto';
  @Input() tooltipMaxWidth?: string;

  overlayRef: OverlayRef | null = null;

  constructor(private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef,
    private overlay: Overlay) {}

  ngOnInit() {
    let positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef);

    switch (this.tooltipPosition) {
      case 'top':
        positionStrategy = positionStrategy.withPositions([
          {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom',
            panelClass: 'tooltip-top',
          },
        ]);
        break;
      case 'bottom':
        positionStrategy = positionStrategy.withPositions([
          {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          panelClass: 'tooltip-bottom',
          },
        ]);
        break;
      case 'left':
        positionStrategy = positionStrategy.withPositions([
          {
            originX: 'start',
            originY: 'center',
            overlayX: 'end',
            overlayY: 'center',
            panelClass: 'tooltip-left',
          },
        ]);
        break;
      case 'right':
        positionStrategy = positionStrategy.withPositions([
          {
            originX: 'end',
            originY: 'center',
            overlayX: 'start',
            overlayY: 'center',
            panelClass: 'tooltip-right',
          },
        ]);
        break;
      case 'auto':
        positionStrategy = positionStrategy.withPositions([
          {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom',
            panelClass: 'tooltip-top',
          },
          {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top',
            panelClass: 'tooltip-bottom',
          },
          {
            originX: 'start',
            originY: 'center',
            overlayX: 'end',
            overlayY: 'center',
            panelClass: 'tooltip-left',
          },
          {
            originX: 'end',
            originY: 'center',
            overlayX: 'start',
            overlayY: 'center',
            panelClass: 'tooltip-right',
          },
        ]);
        break;
      }

    this.overlayRef = this.overlay.create({ positionStrategy });
  }

  @HostListener('mouseenter')
  show() {
    const tooltipRef: ComponentRef<TooltipComponent> = this.overlayRef!.attach(new ComponentPortal(TooltipComponent));
    tooltipRef.instance.tooltip = this.tooltip;
    tooltipRef.instance.tooltipPosition = this.tooltipPosition;
    tooltipRef.instance.tooltipDisabled = this.tooltipDisabled;
    tooltipRef.instance.maxWidth = this.tooltipMaxWidth;
  }

  @HostListener('mouseout')
  hide() {
    this.overlayRef!.detach();
  }
}
