import {
  ComponentFactory,
  ComponentFactoryResolver,
  Injectable,
  Type,
} from '@angular/core';
import { init, loadRemote } from '@module-federation/enhanced/runtime';

const environment: any = {
  microFrontends: {
    map_viewer_app: 'http://localhost:3000/remoteEntry.js',
    wirebreak_viewer_app: 'http://localhost:3001/remoteEntry.js',
  },
};

@Injectable({
  providedIn: 'root',
})
export class RemoteModuleLoaderService {
  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {}

  async loadRemoteModule(name: string) {
    const [scope, moduleName] = name.split('/');

    init({
      name: 'shell',
      remotes:[ {
        name: scope,
        entry: environment.microFrontends[scope],
        //  'http://localhost:3000/remoteEntry.js',
      }]
    });

    await loadRemote(scope);

    // registerRemotes([ {
    //   name: scope,
    //   entry: 'http://localhost:2000/remoteEntry.js',
    // }], {force: true});
    // const moduleFactory = await loadRemote(name) as any;

    const moduleFactory = await (window as any)[scope]?.get('./' + moduleName);
    return moduleFactory && moduleFactory();

    // return loadRemoteModule({
    //   remoteEntry: 'http://localhost:2000/remoteEntry.js',
    //   remoteName: scope,
    //   exposedModule: moduleName,
    // });
  }

  getComponentFactory(component: Type<unknown>): ComponentFactory<unknown> {
    return this._componentFactoryResolver.resolveComponentFactory(component);
  }
}
