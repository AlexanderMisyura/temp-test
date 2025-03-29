import type { WinnersOrderParameter, WinnersSortParameter } from '@ts-enums';
import type { Car, Winner } from '@ts-types';

export type Context = {
  cars: Car[];
  winners: Winner[];
  currentRoute: string;
  winnersPerPage: number;
  winnersPageNumber: number;
  winnersSortBy: WinnersSortParameter;
  winnersSortOrder: WinnersOrderParameter;
  carsPerPage: number;
  carsPageNumber: number;
  isSoundEnabled: boolean;
};
