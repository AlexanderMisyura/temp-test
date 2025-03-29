import type { MachineDefinition } from '@ts-types';

import config from '../config';
// import controller from '@controller/controller';
import { StateMachine } from './machine-class';

const stateMachineDefinition: MachineDefinition = {
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
        async onEnter() {},
        async onExit() {},
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

export default machine;
