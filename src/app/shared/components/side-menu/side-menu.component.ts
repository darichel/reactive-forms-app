import { ChangeDetectionStrategy, Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/pages/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  route: string;
  title: string;
}

const reactiveItems = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  activeMenu: MenuItem[] = reactiveItems
  .filter(item => item.title !== undefined)
  .map((item) => ({
    route: `reactive/${item.path}`,
    title: `${item.title}`,
  }));
}
