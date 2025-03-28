import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'mfe1',
        loadComponent: () =>
          loadRemoteModule({
            remoteName: 'mfe1',
            exposedModule: './Mfe1Component',
          }).then((m) => m.AppComponent),
        children: [
          {
            path: '',
            loadChildren: () =>
              loadRemoteModule({
                remoteName: 'mfe1',
                exposedModule: './routes',
              }).then((m) => m.routes),
          },
        ],
      },
      {
        path: 'mfe2',
        loadComponent: () =>
          loadRemoteModule({
            remoteName: 'mfe2',
            exposedModule: './Mfe2Component',
          }).then((m) => m.AppComponent),
        children: [
          {
            path: '',
            loadChildren: () =>
              loadRemoteModule({
                remoteName: 'mfe2',
                exposedModule: './routes',
              }).then((m) => m.routes),
          },
        ],
      },
];
