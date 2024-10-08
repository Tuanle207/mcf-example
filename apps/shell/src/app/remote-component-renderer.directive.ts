import {
  AfterViewInit,
  Directive,
  Injector,
  Input,
  ViewContainerRef
} from '@angular/core';
import { RemoteModuleLoaderService } from './remote-module-loader.service';

@Directive({
  selector: '[remoteComponentRenderer]',
})
export class RemoteComponentRendererDirective implements AfterViewInit {
  private _componentName: string = '';
  private _moduleName: string = '';

  @Input() set remoteComponentRenderer(componentName: string) {
    this._componentName = componentName;
  }

  @Input() set remoteComponentRendererModule(moduleName: string) {
    this._moduleName = moduleName;
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    private remoteModuleLoaderService: RemoteModuleLoaderService
  ) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    this.renderComponent();
  }

  // TODO: update to new API
  private async renderComponent() {
    const module = await this.remoteModuleLoaderService.loadRemoteModule(
      this._moduleName
    );
    if (!module) {
      return;
    }

    const componentFactory = this.remoteModuleLoaderService.getComponentFactory(
      module[this._componentName]
    );
    if (!componentFactory) {
      return;
    }

    this.viewContainerRef.createComponent(
      componentFactory,
      undefined,
      this.injector
    );
  }
}
