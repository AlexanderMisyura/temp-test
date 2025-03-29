import './styles/global.scss';

import Page from '@components/page/page';
import machine from '@state-machine/machine';
import type { Route } from '@ts-types';

import Router from './router';

export default class App {
  private router: Router;
  private page = new Page();

  constructor() {
    this.router = new Router(this.getRouteObjects());
    // this.page = new Page(machine, this.router.handleLink);
  }

  public init(): void {
    this.page.mount();
    // this.router.initialLoad();
  }

  private getRouteObjects(): Route[] {
    return [
      {
        pathname: '',
        callback: async (): Promise<void> => {
          await machine.makeTransition(machine.value, 'navigateGarage', {
            currentRoute: '',
          });
        },
      },
      {
        pathname: 'winners',
        callback: async (): Promise<void> => {
          await machine.makeTransition(machine.value, 'navigatePicker', {
            currentRoute: 'winners',
          });
        },
      },
    ];
  }
}
