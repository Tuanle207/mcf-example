import {
  ComponentFactory,
  ComponentFactoryResolver,
  Injectable,
  Type,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RemoteModuleLoaderService {
  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {}

  async loadRemoteModule(name: string) {
    const [scope, moduleName] = name.split('/');

    // init({
    //   name: 'consumer',
    //   remotes:[ {
    //     name: scope,
    //     entry: 'http://localhost:2000/remoteEntry.js',
    //   }]
    // });

    // registerRemotes([ {
    //   name: scope,
    //   entry: 'http://localhost:2000/remoteEntry.js',
    // }], {force: true});
    // const moduleFactory = await loadRemote(name) as any;

    const moduleFactory = await (window as any)[scope].get('./' + moduleName);
    return moduleFactory();

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
