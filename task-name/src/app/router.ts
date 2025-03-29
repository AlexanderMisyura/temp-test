// import machine from '@state-machine/machine';
// import type { RouteObject } from '@ts-types/route-object';

// function getCurrentHref(): string {
//   return globalThis.location.href;
// }

// function getCurrentPathname(): string {
//   return globalThis.location.pathname;
// }

// export default class Router {
//   constructor(private routeObjects: RouteObject[]) {
//     globalThis.addEventListener('popstate', () => this.initialLoad());
//   }

//   public handleLink = (event: Event): void => {
//     event.preventDefault();
//     const { currentTarget } = event;
//     if (currentTarget instanceof HTMLAnchorElement) {
//       const currentHref = getCurrentHref();

//       if (currentHref !== currentTarget.href) {
//         this.navigate(currentTarget.href);
//       }
//     }
//   };

//   public initialLoad(): void {
//     const currentPathname = getCurrentPathname();
//     this.load(currentPathname);
//   }

//   public navigate(href: string): void {
//     const url = new URL(href, globalThis.location.origin);
//     globalThis.history.pushState({}, '', url);

//     const pathname = url.pathname;

//     this.load(pathname);
//   }

//   private load(pathname: string): void {
//     const currentRouteObject = this.getCurrentRouteObj(pathname);

//     if (currentRouteObject) {
//       currentRouteObject.callback();
//     } else {
//       // machine.makeTransition(machine.value, 'navigateError', { currentRoute: pathname });
//     }
//   }

//   private getCurrentRouteObj(pathname: string): RouteObject | undefined {
//     const currentRouteObject = this.routeObjects.find((route) => route.pathname === pathname);
//     if (!currentRouteObject) return;

//     return currentRouteObject;
//   }
// }
import machine from '@state-machine/machine';
import type { Route } from '@ts-types';

const ZERO_SEGMENTS_TO_KEEP = 0;

export default class Router {
  private pathSegmentsToKeep: number = Number(PATH_SEGMENTS_TO_KEEP);
  private routes: Route[];

  constructor(routes: Route[]) {
    this.routes = routes;

    document.addEventListener('DOMContentLoaded', () => {
      const indexOffset = 1;
      const currentPath = globalThis.location.pathname
        .split('/')
        .slice(this.pathSegmentsToKeep + indexOffset)
        .join('/');
      void this.navigate(currentPath);
    });
  }

  public navigate(url: string): void {
    const offset = 1;

    const pathnameApp = globalThis.location.pathname
      .split('/')
      .slice(offset, this.pathSegmentsToKeep + offset)
      .join('/');
    globalThis.history.pushState(
      {},
      '',
      this.pathSegmentsToKeep > ZERO_SEGMENTS_TO_KEEP
        ? `/${pathnameApp}/${url}`
        : ''
    );

    const pathParts = url.split('/');
    const zeroIndex = 0;
    console.log(this.routes);
    console.log(pathParts[zeroIndex]);
    const route = this.routes.find(
      (item) => item.pathname === pathParts[zeroIndex]
    );

    console.log('route :>>', route);

    if (route === undefined) {
      console.log('catch');
      // transition to error page
      void machine.makeTransition(machine.value, 'navigateError', {
        currentRoute: pathParts[zeroIndex],
      });
      console.log('no page');
      return;
    }

    const pathAfterRepoAndApp = url.split('/');

    void route.callback(pathAfterRepoAndApp[offset]);
  }
}
