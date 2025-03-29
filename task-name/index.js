/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/app/components/base-component.ts
const ZERO_LENGTH = 0;
class BaseComponent {
    childComponents = [];
    parentComponent = undefined;
    element;
    constructor(properties, ...children) {
        const { elementTag, text, classes, ...rest } = properties;
        this.element = document.createElement(elementTag);
        if (children.length > ZERO_LENGTH) {
            this.appendChildren(...children);
        }
        if (text) {
            this.setText(text);
        }
        if (classes && classes.length > ZERO_LENGTH) {
            this.addClasses(...classes);
        }
        Object.assign(this.element, rest);
    }
    appendChildren(...children) {
        for (const child of children)
            this.appendSingle(child);
        return this;
    }
    appendSingle(child) {
        this.element.append(child.getElement());
        this.childComponents.push(child);
        child.parentComponent = this;
        return this;
    }
    getElement() {
        return this.element;
    }
    removeSelf() {
        this.removeChildren();
        this.element.remove();
        if (this.parentComponent) {
            this.parentComponent.childComponents =
                this.parentComponent.childComponents.filter((child) => child !== this);
        }
    }
    removeChildren() {
        for (const child of this.childComponents)
            child.removeSelf();
        this.childComponents.length = 0;
        return this;
    }
    addClasses(...classes) {
        this.element.classList.add(...classes);
        return this;
    }
    removeClasses(...classes) {
        this.element.classList.remove(...classes);
        return this;
    }
    toggleClasses(...classes) {
        for (const className of classes) {
            this.element.classList.toggle(className);
        }
        return this;
    }
    setText(text) {
        this.element.textContent = text;
        return this;
    }
    addListener(eventType, handler, options) {
        this.element.addEventListener(eventType, handler, options);
        return this;
    }
    removeListener(eventType, handler) {
        this.element.removeEventListener(eventType, handler);
        return this;
    }
}

;// ./src/app/components/utility-components.ts

const span = (properties, ...children) => new BaseComponent({ ...properties, elementTag: 'span' }, ...children);
const div = (properties, ...children) => new BaseComponent({ ...properties, elementTag: 'div' }, ...children);
const h1 = (properties, ...children) => new BaseComponent({ ...properties, elementTag: 'h1' }, ...children);
const input = (properties) => new BaseComponent({ ...properties, elementTag: 'input' });
const a = (properties, ...children) => new BaseComponent({ ...properties, elementTag: 'a' }, ...children);
const label = (properties, ...children) => new BaseComponent({ ...properties, elementTag: 'label' }, ...children);
const img = (properties) => new BaseComponent({ ...properties, elementTag: 'img' });
const utility_components_button = (properties, ...children) => new BaseComponent({ ...properties, elementTag: 'button' }, ...children);
const details = (properties, ...children) => new BaseComponent({ ...properties, elementTag: 'details' }, ...children);
const summary = (properties) => new BaseComponent({ ...properties, elementTag: 'summary' });
const ul = (properties, ...children) => new BaseComponent({ ...properties, elementTag: 'ul' }, ...children);
const li = (properties, ...children) => new BaseComponent({ ...properties, elementTag: 'li' }, ...children);
const utility_components_textarea = (properties) => new BaseComponent({ ...properties, elementTag: 'textarea' });
/* harmony default export */ const utility_components = ({
    span,
    div,
    h1,
    input,
    label,
    a,
    img,
    button: utility_components_button,
    details,
    summary,
    ul,
    li,
    textarea: utility_components_textarea,
});

;// ./src/app/components/error-page/error.module.scss
// extracted by mini-css-extract-plugin
var _1 = "zXeTI5z_";


;// ./src/app/components/error-page/error.ts



class ErrorPage extends BaseComponent {
    constructor() {
        super({ elementTag: 'div' });
        const linkWinners = utility_components.div({
            classes: [_1],
            text: "Oh, you're not supposed to be here",
        });
        const linkError = utility_components.a({
            classes: [_1],
            text: 'go to garage',
            href: '../',
        });
        const linkError2 = utility_components.a({
            classes: [_1],
            text: 'go to winners',
            href: '../winners',
        });
        this.appendChildren(linkWinners, linkError, linkError2);
    }
}

;// ./src/app/components/garage/garage.module.scss
// extracted by mini-css-extract-plugin
var garage_module_1 = "ni5_1qJv";


;// ./src/app/components/garage/garage.ts



class Garage extends BaseComponent {
    constructor() {
        super({ elementTag: 'div' });
        const linkWinners = utility_components.a({
            classes: [garage_module_1],
            text: 'link to winners',
            href: './winners',
        });
        const linkError = utility_components.a({
            classes: [garage_module_1],
            text: 'link to error page',
            href: '../hello-error',
        });
        const linkError2 = utility_components.a({
            classes: [garage_module_1],
            text: 'link 2 to error page',
            href: './hello-error-2',
        });
        this.appendChildren(linkWinners, linkError, linkError2);
    }
}

;// ./src/app/components/winners/winners.module.scss
// extracted by mini-css-extract-plugin
var winners_module_1 = "RFlbXUvE";


;// ./src/app/components/winners/winners.ts



class Winners extends BaseComponent {
    constructor() {
        super({ elementTag: 'div' });
        const linkWinners = utility_components.a({
            classes: [winners_module_1],
            text: 'link to garage',
            href: '../',
        });
        const linkError = utility_components.a({
            classes: [winners_module_1],
            text: 'link to error page',
            href: '../hello-error',
        });
        const linkError2 = utility_components.a({
            classes: [winners_module_1],
            text: 'link 2 to error page',
            href: './hello-error-2',
        });
        this.appendChildren(linkWinners, linkError, linkError2);
    }
}

;// ./src/app/models/enums/car-status.ts
var CarStatus;
(function (CarStatus) {
    CarStatus["STARTED"] = "started";
    CarStatus["STOPPED"] = "stopped";
    CarStatus["DRIVE"] = "drive";
})(CarStatus || (CarStatus = {}));

;// ./src/app/models/enums/endpoint-type.ts
var EndpointType;
(function (EndpointType) {
    EndpointType["GARAGE"] = "garage";
    EndpointType["WINNERS"] = "winners";
    EndpointType["ENGINE"] = "engine";
})(EndpointType || (EndpointType = {}));

;// ./src/app/models/enums/method.ts
var Method;
(function (Method) {
    Method["GET"] = "GET";
    Method["POST"] = "POST";
    Method["PUT"] = "PUT";
    Method["DELETE"] = "DELETE";
    Method["PATCH"] = "PATCH";
})(Method || (Method = {}));

;// ./src/app/models/enums/winners-order-parameter.ts
var WinnersOrderParameter;
(function (WinnersOrderParameter) {
    WinnersOrderParameter["ASC"] = "ASC";
    WinnersOrderParameter["DESC"] = "DESC";
})(WinnersOrderParameter || (WinnersOrderParameter = {}));

;// ./src/app/models/enums/winners-sort-parameter.ts
var WinnersSortParameter;
(function (WinnersSortParameter) {
    WinnersSortParameter["ID"] = "id";
    WinnersSortParameter["WINS"] = "wins";
    WinnersSortParameter["TIME"] = "time";
})(WinnersSortParameter || (WinnersSortParameter = {}));

;// ./src/app/models/enums/index.ts






;// ./src/app/config.ts

/* harmony default export */ const config = ({
    API_URL: 'http://localhost:3000/',
    DEFAULT_WINNERS_PER_PAGE: 7,
    DEFAULT_WINNERS_PAGE_NUMBER: 1,
    DEFAULT_WINNERS_SORT_BY: WinnersSortParameter.TIME,
    DEFAULT_WINNERS_SORT_ORDER: WinnersOrderParameter.ASC,
    DEFAULT_CARS_PER_PAGE: 7,
    DEFAULT_CARS_PAGE_NUMBER: 1,
});

;// ./src/app/utils/event-emitter-generic.ts
class Emitter {
    events = {};
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }
    emit(event, ...arguments_) {
        if (this.events[event]) {
            for (const listener of this.events[event]) {
                listener(...arguments_);
            }
        }
    }
}
/* harmony default export */ const event_emitter_generic = (Emitter);

;// ./src/app/state-machine/event-emitter-machine.ts

class EmitterMachine extends event_emitter_generic {
}
/* harmony default export */ const event_emitter_machine = (EmitterMachine);

;// ./src/app/state-machine/machine-class.ts

class StateMachine {
    value;
    context;
    events = {
        machineStateChanged: 'machineStateChanged',
    };
    emitter = new event_emitter_machine();
    definition;
    constructor(stateMachineDefinition) {
        this.definition = stateMachineDefinition;
        this.value = stateMachineDefinition.initialState;
        this.context = stateMachineDefinition.context;
    }
    async makeTransition(currentState, trigger, contextData) {
        const currentStateDefinition = this.definition.states[currentState];
        const destinationTransition = currentStateDefinition.transitions[trigger];
        if (!destinationTransition)
            return;
        const destinationState = destinationTransition.target;
        const destinationStateDefinition = this.definition.states[destinationState];
        const payload = {
            updateContext: this.updateContext.bind(this),
            getFullContext: this.getFullContext.bind(this),
            contextData,
            trigger,
        };
        await destinationTransition.action?.(payload);
        await currentStateDefinition.actions.onExit?.(payload);
        await destinationStateDefinition.actions.onEnter?.(payload);
        this.value = destinationState;
        this.emit(this.events.machineStateChanged, payload);
        return this.value;
    }
    updateContext(contextData) {
        this.context = { ...this.context, ...contextData };
    }
    getFullContext() {
        return this.context;
    }
    on(event, callback) {
        this.emitter.on(event, callback);
    }
    emit(event, payload, ...other) {
        this.emitter.emit(event, payload, ...other);
    }
}

;// ./src/app/state-machine/machine.ts

// import controller from '@controller/controller';

const stateMachineDefinition = {
    initialState: 'state:initial',
    context: {
        cars: [],
        winners: [],
        currentRoute: '',
        winnersPerPage: config.DEFAULT_WINNERS_PER_PAGE,
        winnersPageNumber: config.DEFAULT_WINNERS_PAGE_NUMBER,
        winnersSortBy: config.DEFAULT_WINNERS_SORT_BY,
        winnersSortOrder: config.DEFAULT_WINNERS_SORT_ORDER,
        carsPerPage: config.DEFAULT_CARS_PER_PAGE,
        carsPageNumber: config.DEFAULT_CARS_PAGE_NUMBER,
        isSoundEnabled: false,
    },
    states: {
        'state:initial': {
            actions: {
                async onEnter() {
                    await Promise.resolve();
                    console.log('initial: onEnter');
                },
                async onExit() {
                    await Promise.resolve();
                    console.log('initial: onExit');
                    // update context with cars, winners
                },
            },
            transitions: {
                navigateGarage: {
                    target: 'state:garage',
                    async action(payload) {
                        await Promise.resolve();
                        if (payload.contextData?.currentRoute) {
                            const { contextData, updateContext } = payload;
                            updateContext(contextData);
                        }
                    },
                },
                navigateWinners: {
                    target: 'state:winners',
                    async action(payload) {
                        await Promise.resolve();
                        if (payload.contextData?.currentRoute) {
                            const { contextData, updateContext } = payload;
                            updateContext(contextData);
                        }
                    },
                },
                navigateError: {
                    target: 'state:404',
                    async action(payload) {
                        await Promise.resolve();
                        if (payload.contextData?.currentRoute) {
                            const { contextData, updateContext } = payload;
                            updateContext(contextData);
                        }
                    },
                },
            },
        },
        'state:garage': {
            actions: {
                async onEnter() { },
                async onExit() { },
            },
            transitions: {
                navigateWinners: {
                    target: 'state:winners',
                    async action(payload) {
                        await Promise.resolve();
                        if (payload.contextData?.currentRoute) {
                            const { contextData, updateContext } = payload;
                            updateContext(contextData);
                        }
                    },
                },
                navigateError: {
                    target: 'state:404',
                    async action(payload) {
                        await Promise.resolve();
                        if (payload.contextData?.currentRoute) {
                            const { contextData, updateContext } = payload;
                            updateContext(contextData);
                        }
                    },
                },
            },
        },
        'state:winners': {
            actions: {
                async onEnter() {
                    await Promise.resolve();
                    console.log('winners: onEnter');
                },
                async onExit() {
                    await Promise.resolve();
                    console.log('winners: onExit');
                },
            },
            transitions: {
                navigateGarage: {
                    target: 'state:garage',
                    async action(payload) {
                        await Promise.resolve();
                        if (payload.contextData?.currentRoute) {
                            const { contextData, updateContext } = payload;
                            updateContext(contextData);
                        }
                    },
                },
                navigateError: {
                    target: 'state:404',
                    async action(payload) {
                        await Promise.resolve();
                        if (payload.contextData?.currentRoute) {
                            const { contextData, updateContext } = payload;
                            updateContext(contextData);
                        }
                    },
                },
            },
        },
        'state:404': {
            actions: {
                async onEnter() {
                    await Promise.resolve();
                    console.log('404: onEnter');
                },
                async onExit() {
                    await Promise.resolve();
                    console.log('404: onExit');
                },
            },
            transitions: {
                navigateGarage: {
                    target: 'state:garage',
                    async action(payload) {
                        await Promise.resolve();
                        if (payload.contextData?.currentRoute) {
                            const { contextData, updateContext } = payload;
                            updateContext(contextData);
                        }
                    },
                },
                navigateWinners: {
                    target: 'state:winners',
                    async action(payload) {
                        await Promise.resolve();
                        if (payload.contextData?.currentRoute) {
                            const { contextData, updateContext } = payload;
                            updateContext(contextData);
                        }
                    },
                },
            },
        },
    },
};
const machine = new StateMachine(stateMachineDefinition);
/* harmony default export */ const state_machine_machine = (machine);

;// ./src/app/components/page/page.module.scss
// extracted by mini-css-extract-plugin
var page_module_1 = "teSzgQ6N";
var _2 = "dQDdLIr8";
var _3 = "C8Dn1lrC";


;// ./src/app/components/page/page.ts







class Page extends BaseComponent {
    garage = new Garage();
    winners = new Winners();
    error = new ErrorPage();
    pageContainer;
    constructor() {
        super({ elementTag: 'main' });
        const heading = utility_components.h1({
            classes: [page_module_1],
            text: 'Welcome to Async Tractor Race',
        });
        this.pageContainer = utility_components.div({ classes: [_3] });
        this.appendChildren(heading, this.pageContainer);
    }
    mount() {
        this.handleRouteChange();
        document.body.append(this.getElement());
    }
    handleRouteChange() {
        const { currentRoute } = state_machine_machine.getFullContext();
        if (currentRoute === '')
            this.changeContent(this.garage);
        else if (currentRoute === 'winners')
            this.changeContent(this.winners);
        else
            this.changeContent(this.error);
    }
    changeContent(newContent) {
        this.pageContainer.getElement().replaceChildren(newContent.getElement());
    }
}

;// ./src/app/router.ts
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

const ZERO_SEGMENTS_TO_KEEP = 0;
class Router {
    pathSegmentsToKeep = Number(2);
    routes;
    constructor(routes) {
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
    navigate(url) {
        const offset = 1;
        const pathnameApp = globalThis.location.pathname
            .split('/')
            .slice(offset, this.pathSegmentsToKeep + offset)
            .join('/');
        globalThis.history.pushState({}, '', this.pathSegmentsToKeep > ZERO_SEGMENTS_TO_KEEP
            ? `/${pathnameApp}/${url}`
            : '');
        const pathParts = url.split('/');
        const zeroIndex = 0;
        console.log(this.routes);
        console.log(pathParts[zeroIndex]);
        const route = this.routes.find((item) => item.pathname === pathParts[zeroIndex]);
        console.log('route :>>', route);
        if (route === undefined) {
            console.log('catch');
            // transition to error page
            void state_machine_machine.makeTransition(state_machine_machine.value, 'navigateError', {
                currentRoute: pathParts[zeroIndex],
            });
            console.log('no page');
            return;
        }
        const pathAfterRepoAndApp = url.split('/');
        void route.callback(pathAfterRepoAndApp[offset]);
    }
}

;// ./src/app/app.ts




class App {
    router;
    page = new Page();
    constructor() {
        this.router = new Router(this.getRouteObjects());
        // this.page = new Page(machine, this.router.handleLink);
    }
    init() {
        this.page.mount();
        // this.router.initialLoad();
    }
    getRouteObjects() {
        return [
            {
                pathname: '',
                callback: async () => {
                    await state_machine_machine.makeTransition(state_machine_machine.value, 'navigateGarage', {
                        currentRoute: '',
                    });
                },
            },
            {
                pathname: 'winners',
                callback: async () => {
                    await state_machine_machine.makeTransition(state_machine_machine.value, 'navigatePicker', {
                        currentRoute: 'winners',
                    });
                },
            },
        ];
    }
}

;// ./src/index.ts

const app = new App();
app.init();

/******/ })()
;
//# sourceMappingURL=index.js.map