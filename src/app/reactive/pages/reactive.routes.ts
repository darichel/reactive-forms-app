import { Routes } from "@angular/router";
import { BasicPageComponent } from "./basic-page/basic-page.component";
import { DynamicPageComponent } from "./dynamic-page/dynamic-page.component";
import { SwitchesPagesComponent } from "./switches-pages/switches-pages.component";

export const reactiveRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        title: 'Básicos',
        component: BasicPageComponent
      },
      {
        path: 'dynamic',
        title: 'Dinámicos',
        component: DynamicPageComponent
      },
      {
        path: 'switches',
        title: 'Switches',
        component: SwitchesPagesComponent
      },
      {
        path: '**',
        redirectTo: 'basic'
      }
    ]
  }
];
