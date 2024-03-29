import {Routes} from '@angular/router';
import {
  CanActivateComponentSidenav
} from './pages/component-sidenav/component-sidenav-can-load-guard';

export const MATERIAL_DOCS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/homepage').then(m => m.Homepage)
  },
  {path: 'categories', redirectTo: '/components/categories'},
  {path: 'cdk', pathMatch: 'full', redirectTo: '/cdk/categories'},
  {path: 'components', pathMatch: 'full', redirectTo: '/components/categories'},
  {
    path: 'guides',
    loadComponent: () => import('./pages/guide-list').then(m => m.GuideList)
  },
  // Since https://github.com/angular/components/pull/9574, the cdk-table guide became the overview
  // document for the cdk table. To avoid any dead / broken links, we redirect to the new location.
  {path: 'guide/cdk-table', redirectTo: '/cdk/table/overview'},
  {
    path: 'guide/:id',
    loadChildren: () => import('./pages/guide-viewer').then(m => m.GuideViewerModule)
  },
  // Needs to be defined before `:section` so it gets picked first when redirecting a missing page.
  {
    path: '404',
    loadComponent: () => import('./pages/not-found').then(m => m.NotFound)
  },
  {
    path: ':section',
    canActivate: [CanActivateComponentSidenav],
    loadChildren: () =>
      import('./pages/component-sidenav/component-sidenav').then(m => m.ComponentSidenavModule)
  },
  {path: '**', redirectTo: '/404'},
];
