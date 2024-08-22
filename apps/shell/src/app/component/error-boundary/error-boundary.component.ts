import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ErrorHandler,
  ContentChild,
  TemplateRef,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'error-boundary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngTemplateOutlet="!hasError ? currentTemplate! : fallbackTpl"></ng-container>
    <ng-template #fallbackTpl>
      <p>Error occurred</p>
    </ng-template>
  `,
})
export class ErrorBoundaryComponent implements OnInit {

  hasError = false;

  constructor(
    private readonly changeDetector: ChangeDetectorRef,
    private readonly errorHandler: ErrorHandler
  ) {
    this.changeDetector.detach();
  }

  @Input() content?: TemplateRef<any>;
  @Input() fallback?: TemplateRef<any>;

  currentTemplate?: TemplateRef<any>;

  ngOnInit() {
    this.currentTemplate = this.content;
  }

  ngDoCheck() {
    try {
      this.changeDetector.detectChanges();
    } catch (e) {
      this.hasError = true;
      console.log('Error occurred', e);
      // this.currentTemplate = this.fallback;
      this.errorHandler.handleError(e);
    }
  }
}
