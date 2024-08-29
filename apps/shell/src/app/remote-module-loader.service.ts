import {
  ComponentFactory,
  ComponentFactoryResolver,
  Injectable,
  Type,
} from '@angular/core';
import { init, loadRemote } from '@module-federation/enhanced/runtime';

const environment: any = {
  microFrontends: {
    map_viewer_app: 'http://localhost:3000/mf-manifest.json',
    wirebreak_viewer_app: 'http://localhost:3001/mf-manifest.json',
  },
};

@Injectable({
  providedIn: 'root',
})
export class RemoteModuleLoaderService {
  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {}

  async loadRemoteModule(name: string) {
    const [scope, moduleName] = name.split('/');


    // Runtime init module federation
    // init({
    //   name: 'shell',
    //   remotes:[ {
    //     name: scope,
    //     entry: environment.microFrontends[scope],
    //   }],
    // });

    // Runtime load remote module
    if (!(window as any)[scope]) {
      try {
        await loadRemote(name);
      } catch (error) {
        console.error('Error loading remote', error);
      }
    }
    
    const moduleFactory = await (window as any)[scope]?.get('./' + moduleName);
    return moduleFactory?.();
  }

  getComponentFactory(component: Type<unknown>): ComponentFactory<unknown> {
    return this._componentFactoryResolver.resolveComponentFactory(component);
  }
}
