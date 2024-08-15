import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss'
})
export class TooltipComponent implements OnInit {
  @Input('app-tooltip') tooltip: string | TemplateRef<any> | null = null;
  @Input() tooltipDisabled = false;
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' | 'auto' = 'auto';
  @Input() maxWidth?: string;

  isTextTooltip = false;

  ngOnInit(): void {
    this.isTextTooltip = typeof this.tooltip === 'string';
  }
}
